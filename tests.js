const assert = require('assert');
const READ = require("./read");

var result = READ("(+ 1 2)");
assert(result.error.exists === false);

result = READ("(+ 1 2");
assert(result.error.exists === true);

result = READ("+ 3 4 5 (* 3 4)");
assert(result.error.exists === false);
assert(result.tree.length === 5);
assert(result.tree[0] === "+");
assert(result.tree[4].constructor === Array);

console.log("All tests passed");