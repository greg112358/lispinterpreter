const PRIMITIVES = require("./primitives");
const Leaf = require("./leaf");

function READ(str,env,lineNo=0, col=0) {
    var result = {
        tree: [],
        error:{
            exists: false,
            message:null,
            line:null,
            column:null
        }
    }

    function lookup(symbol,env){
        if(env[symbol]){
            return env[symbol];
        }else{
            throwErr(lineNo,col,"Symbol "+symbol+" not found");
        }
    }

    function addTreeNode(leaf){
        result.tree.push(leaf);
    }

    function throwErr(line,col,message){
        result.error.exists = true;
        result.error.message = message;
        result.error.line = line;
        result.error.column = col;
        return result;
    }
    for (let i = 0; i < str.length; i++) {
        col = i + col;
        if(str[i]== "\n"){
            lineNo++;
            col = 0;
        }else if (str[i] === '(') {
            let subList = '';
            if (++i >= str.length){
                throwErr(lineNo,col,"Syntax error: expected ')'");
            }
            cnt = 1;
            while ( i < str.length) {
                if(str[i] === "(") cnt+=1
                if(str[i] === ")") cnt-=1
                if(cnt <= 0) break;
                subList += str[i];
                i+=1;
            }
            if(cnt > 0) throwErr(lineNo,i+col,"Syntax error: expected ')'");
            var subResult = READ(subList,env);
            if(subResult.error.exists){
                throwErr(lineNo,i+col,subResult.error.message);
            }else {
                addTreeNode(new Leaf(PRIMITIVES.LIST, subResult.tree));
            }

        } else if (str[i] === ')') {
            throwErr(lineNo,i,"Syntax error: unexpected ')'");
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
            addTreeNode(lookup(symbol,env));
        }else if(["*","/","+","-", "=", ">", "<"].includes(str[i])){
            operator = str[i];
            if(i<str.length-1 && str[i+1] === "="){
                operator += "=";
                i+=1;
            }
            addTreeNode(new Leaf(PRIMITIVES.FUNCTION, operator));
        }else if (str[i].match(/\s/)) {
            // Do nothing and continue to the next character
        } else {
            throwErr(lineNo,i+col,"Syntax error: unexpected character: "+str[i]);
        }
    }
    return result;
}

module.exports = READ;