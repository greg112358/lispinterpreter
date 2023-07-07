const READ = require("./read");
const PRINT = require("./print");
env = {};
process.stdin.on('data', data => {
    //we call substr cuz we want to ignore new line char for repl
    var read = READ(data.toString().substring(0, data.toString().length - 1));

    for(var i = 0;i<read.errors.length;i++){
        console.log(read.errors[i]);
    }
    if(read.errors.length>0){
        return;
    }
    PRINT(read.ast);
});

setInterval(() => { }, 10000);