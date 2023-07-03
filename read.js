const PRIMITIVES = require("./primitives");
const Leaf = require("./leaf");

function READ(str,env,lineNo=0, col=0) {
    var result = {
        tree: [],
        errors:[]
    }

    function addTreeNode(leaf){
        result.tree.push(leaf);
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

            addTreeNode(new Leaf(PRIMITIVES.LIST, subResult.tree));
            
        } else if (str[i] === ')') {
            err(lineNo,i,"Syntax error: unexpected ')'");
        } else if (str[i].match(/[0-9]/)) {
            let num = str[i];
            while (++i < str.length && str[i].match(/[0-9]/)) {
                num += str[i];
            }
            addTreeNode(new Leaf(PRIMITIVES.NUMBER, num));
        } else if (str[i].match(/[a-zA-Z_]/)) {
            let symbol = str[i];
            while (++i < str.length && !str[i].match(/\s/)) {
                symbol += str[i];
            }
            addTreeNode(new Leaf(PRIMITIVES.SYMBOL, symbol));
        }else if(["*","/","+","-", "=", ">", "<"].includes(str[i])){
            operator = str[i];
            if(i<str.length-1 && str[i+1] === "="){
                operator += "=";
                i+=1;
            }
            addTreeNode(new Leaf(PRIMITIVES.FUNCTION, operator));
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
            addTreeNode(new Leaf(PRIMITIVES.STRING, string));
        }else if (str[i].match(/\s/)) {
            // Do nothing and continue to the next character
        } else {
            err(lineNo,i+col,"Syntax error: unexpected character: "+str[i]);
        }
    }
    return result;
}

module.exports = READ;