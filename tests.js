const assert = require('assert');
const READ = require("./read");
const PRINT = require("./print");
const EVAL = require("./eval");

var result = READ("+ 3 (* 3 44 4)")
PRINT(result.list);
assert(result.errors.length==0)

var result = READ("+ 1 (* 2 3)");
assert(result.errors.length==0)

var result = READ("-3")
assert(result.errors.length == 0);

var result = READ("2.43")
assert(result.errors.length == 0);

var result = READ("+ 1 4 2");
assert(result.errors.length == 0);

var result = READ("(+ 1 2)");
PRINT(result.ast);
assert(result.errors.length == 0);

result = READ("(+ 1 2");
assert(result.errors.length > 0);

result = READ("(+ 1 2))");
assert(result.errors.length > 0);

result = READ("+ 3 4 5 (* 3 4)");
assert(result.errors.length == 0);

result =READ("\"hello\"");
assert(result.errors.length == 0);

result = EVAL(READ("(+ 1 2)").list);
PRINT(result);
console.log("All tests passed");