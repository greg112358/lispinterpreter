const READ = require("./read")
env = {};
process.stdin.on('data', data => {
    //we call substr cuz we want to ignore new line char for repl
    var read = READ(data.toString().substring(0, data.toString().length - 1));
    var curr= read.ast;
    while(curr!=null){
        console.log(curr.car.value);
        curr = curr.cdr;
    }
    for(var i = 0;i<read.errors.length;i++){
        console.log(read.errors[i]);
    }
    if(read.errors.length>0){
        return;
    }
});

setInterval(() => { }, 10000);