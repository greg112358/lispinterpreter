const assert = require('assert');
const READ = require("./read");
const PRIMITIVES = require("./primitives");
const Leaf = require("./leaf");

var result = READ("+ 1 4 2");
assert(result.errors.length == 0);

var result = READ("(+ 1 2)");
assert(result.errors.length == 0);

result = READ("(+ 1 2");
assert(result.errors.length > 0);

result = READ("(+ 1 2))");
assert(result.errors.length > 0);

result = READ("+ 3 4 5 (* 3 4)");
assert(result.errors.length == 0);
assert(result.tree.length === 5);
assert(result.tree[0].value === "+");
assert(result.tree[0].type === PRIMITIVES.FUNCTION);
assert(result.tree[1].value === "3");
assert(result.tree[1].type === PRIMITIVES.NUMBER);
assert(result.tree[4].type === PRIMITIVES.LIST);

console.log("All tests passed");