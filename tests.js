const assert = require('assert');
const READ = require("./read");
const PRINT = require("./print");
const PRIMITIVES = require("./primitives");

var result = READ("+ 1 (* 2 3)");
PRINT(result)

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

console.log("All tests passed");