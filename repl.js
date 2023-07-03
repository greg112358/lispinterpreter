const READ = require("./read")
process.stdin.on('data', data => {
    //we call substr cuz we want to ignore new line char for repl
    var read = JSON.stringify(READ(data.toString().substring(0, data.toString().length - 1)));
    read.errors.foreach(error => {
        console.log(`Error on line ${line}, column ${column}: ${message}`,error.line,error.column, error.message);
    });
    if(read.errors.length > 0){
        return;
    }
});

setInterval(() => { }, 10000);