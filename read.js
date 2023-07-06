const {CONS, CAR, CDR, TYPES,Node,ConsCell} = require("./primitives");

function READ(str,env,lineNo=0, col=0) {
    var result = {
        ast: null,
        errors:[]
    }

    var tail = null;
    function addTreeNode(node){
        var cell = new ConsCell(node);
        if(result.ast == null){
            result.ast = cell;
            tail = cell;
        }else{
            tail.cdr = cell;
            tail = cell;
        }
    }

    function err(line,col,message){
        error = {};
        error.message = message;
        error.line = line;
        error.column = col;
        result.errors.push(error);
    }
    for (let i = 0; i < str.length; i++) {
        col = i + col;
        if(str[i]== "\n"){
            lineNo++;
            col = 0;
        }else if (str[i] === '(') {
            let subList = '';
            if (++i >= str.length){
                err(lineNo,col,"Syntax error: expected ')'");
            }
            cnt = 1;
            while ( i < str.length) {
                if(str[i] === "(") cnt+=1
                if(str[i] === ")") cnt-=1
                if(cnt <= 0) break;
                subList += str[i];
                i+=1;
            }
            if(cnt > 0) err(lineNo,i+col,"Syntax error: expected ')'");
            var subResult = READ(subList,env,lineNo,col);

            addTreeNode(new Node(TYPES.LIST, subResult.ast));
            
        } else if (str[i] === ')') {
            err(lineNo,i,"Syntax error: unexpected ')'");
        } else if (str[i].match(/[0-9-]/)) {
            let num = str[i];
            while (++i < str.length && str[i].match(/[0-9.]/)) {
                num += str[i];
            }
            addTreeNode(new Node(TYPES.NUMBER, num));
        } else if (str[i].match(/[a-zA-Z_]/)) {
            let symbol = str[i];
            while (++i < str.length && !str[i].match(/\s/)) {
                symbol += str[i];
            }
            addTreeNode(new Node(TYPES.SYMBOL, symbol));
        }else if(["*","/","+","-", "=", ">", "<"].includes(str[i])){
            operator = str[i];
            if(i<str.length-1 && str[i+1] === "="){
                operator += "=";
                i+=1;
            }
            addTreeNode(new Node(TYPES.FUNCTION, operator));
        }
        else if("\"" === str[i]){
            let string = '';
            if (++i >= str.length){
                err(lineNo,col,"Syntax error: expected '\"'");
            }
            while ( i < str.length) {
                if(str[i]==="\"") break;
                string += str[i];
                i+=1;
            }
            addTreeNode(new Node(TYPES.STRING, string));
        }else if (str[i].match(/\s/)) {
            // Do nothing and continue to the next character
        } else {
            err(lineNo,i+col,"Syntax error: unexpected character: "+str[i]);
        }
    }
    return result;
}

module.exports = READ;