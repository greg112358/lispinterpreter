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
        return car;
    } else if(car.type===TYPES.LIST){
        return EVAL(car,env);
    } else {
        APPLY(car, cdr, env)
    }
}



function APPLY(fn, args,env) {

}

function EVAL_LIST(list,env){
    list = list.car;
    list = EVAL()
}


module.exports = EVAL;