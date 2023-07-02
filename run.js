const debug = false;
if(debug) {
    READ('+ 3 3')
}else {
    process.stdin.on('data', data => {
        //we call substr cuz we want to ignore new line char for repl
        console.log(JSON.stringify(READ(data.toString().substring(0,data.toString().length-1))));
    });
    
    setInterval(() => { }, 10000);    
}

function READ(str,lineNo=0, col=0) {
    console.log('read: ' + str+"\n");
    var result = {
        tree: [],
        error:{
            exists: false,
            message:null,
            line:null,
            column:null
        }
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
            var subResult = READ(subList);
            if(subResult.error.exists){
                throwErr(lineNo,i+col,subResult.error.message);
            }else {
                result.tree.push(subResult.tree);
            }

        } else if (str[i] === ')') {
            throwErr(lineNo,i,"Syntax error: unexpected ')'");
        } else if (str[i].match(/[0-9]/)) {
            let num = str[i];
            while (str[i].match(/[0-9]/) && ++i < str.length) {
                num += str[i];
            }
            result.tree.push(parseInt(num));
        } else if (str[i].match(/[a-zA-Z_]/)) {
            let symbol = str[i];
            while (!str[i].match(/\s/) && ++i < str.length) {
                symbol += str[i];
            }
            result.tree.push(symbol);
        }else if(["*","/","+","-"].includes(str[i])){
            result.tree.push(str[i]);
        }else if (str[i].match(/\s/)) {
            // Do nothing and continue to the next character
        } else {
            throwErr(lineNo,i+col,"Syntax error: unexpected character: "+str[i]);
        }
    }
    return result;
}

