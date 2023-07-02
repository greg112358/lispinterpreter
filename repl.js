const READ = require("./read")
process.stdin.on('data', data => {
    //we call substr cuz we want to ignore new line char for repl
    var read = JSON.stringify(READ(data.toString().substring(0, data.toString().length - 1)));
    console.log(read);
});

setInterval(() => { }, 10000);