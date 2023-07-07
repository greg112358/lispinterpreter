const { TYPES, CDR, CAR } = require("./primitives");
function PRINT(exp) {
    var str = TOSTRING(exp)
    console.log(str);
}

function TOSTRING(exp) {
    if (CAR(exp) == null) {
        return "";
    }
    if (CAR(exp).type === TYPES.LIST) {
        return "(" + TOSTRING(CAR(exp).value) + ")" + TOSTRING(CDR(exp));
    }
    return CAR(exp).value + " " + TOSTRING(CDR(exp));
}

module.exports = PRINT;