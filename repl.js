const READ = require("./read");
const PRINT = require("./print");
env = {};
process.stdin.on('data', data => {
    //we call substr cuz we want to ignore new line char for repl
    var read = READ(data.toString().substring(0, data.toString().length - 1));
    PRINT(read.list);
});

setInterval(() => { }, 10000);