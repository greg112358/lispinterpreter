const {TYPES,CAR,CDR,CONS} = require("./primitives");

function EVAL(exp, env) {
    var car = CAR(exp);
    var cdr = CDR(exp);
    if(car == null){
        return null;
    }
    if (car.type === TYPES.NUMBER || car.type === TYPES.STRING) {
        if(cdr!=null){
            return "error, expressions should start with a function";
        }
        return car.value;
    }else if (exp.type === PRIMITIVES.TYPES.SYMBOL) {
        lookup = env[car.value];
        if(lookup==null){
            return `error, ${car.value} is not defined`;
        }
        return lookup;
    } else if (exp.type === TYPES.FUNCTION) {
        return APPLY(car, cdr,env);
    }

}

function APPLY(fn, args,env) {

}


module.exports = EVAL;