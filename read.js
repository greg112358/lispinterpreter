const {TYPES, Node, CONS} = require("./primitives");

function READ(str){
    var result = PARSE(str);
    if(result.errors.length > 0){
        return {ast: null, errors: result.errors};
    }
    if(result.ast.length === 0){
        return {ast: null, errors: result.errors};
    }
    ast = AST_TO_LINKED_LIST(result.ast);
    return {ast: ast, errors: result.errors };
}

function AST_TO_LINKED_LIST(tokens){
    if(tokens.length === 0){
        return null;
    }
    return CONS(tokens[0],AST_TO_LINKED_LIST(tokens.slice(1)));
}

function PARSE(str,lineNo=0, col=0,errors) {
    errors = errors || [];
    function err(lineNo,col,msg){
        result.errors.concat({lineNo,col,msg});
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
            var subResult = PARSE(subList,lineNo,col);
            result.errors.concat(subResult.errors);
            return CONS(new Node(TYPES.LIST, subResult), PARSE(str.slice(i+1),lineNo,i+col,errors));
            
        } else if (str[i] === ')') {
            err(lineNo,i,"Syntax error: unexpected ')'");
        } else if (str[i].match(/[0-9-]/)) {
            let num = str[i];
            while (++i < str.length && str[i].match(/[0-9.]/)) {
                num += str[i];
            }
            return CONS(new Node(TYPES.NUMBER, num), PARSE(str.slice(i),lineNo,i+col,errors));
        } else if (str[i].match(/[a-zA-Z_]/)) {
            let symbol = str[i];
            while (++i < str.length && !str[i].match(/\s/)) {
                symbol += str[i];
            }
            return CONS(new Node(TYPES.SYMBOL, symbol), PARSE(str.slice(i),lineNo,i+col,errors));
        }else if(["*","/","+","-", "=", ">", "<"].includes(str[i])){
            operator = str[i];
            if(i<str.length-1 && str[i+1] === "="){
                operator += "=";
                i+=1;
            }
            return CONS(new Node(TYPES.SYMBOL, operator), PARSE(str.slice(i+1),lineNo,i+col,errors))
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
            return CONS(new Node(TYPES.STRING, string), PARSE(str.slice(i+1),lineNo,i+col,errors));
        }else if (str[i].match(/\s/)) {
            // Do nothing and continue to the next character
        } else {
            err(lineNo,i+col,"Syntax error: unexpected character: "+str[i]);
        }
    }
    return null;
}

module.exports = READ;