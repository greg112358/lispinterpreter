const { TYPES, CAR, CDR, CONS, PRIMITIVE_FUNCTIONS } = require("./primitives");

function EVAL(exp, env) {
    var car = CAR(exp);
    var cdr = CDR(exp);
    if (car == null) {
        return null;
    }
    if (car.type === TYPES.NUMBER || car.type === TYPES.STRING) {
        return CONS(car, EVAL(cdr, env));
    } else {
        APPLY(car, cdr, env)
    }
}



function APPLY(fn, args, env) {
    if (PRIMITIVE_FUNCTIONS.includes(fn.value)) {
        return APPLY_PRIMITIVE(fn, EVAL_LIST(args), env);
    }
}

function APPLY_PRIMITIVE(fn, args, env) {
    var car = CAR(args);
    var cdr = CDR(args);
    if(car==null || cdr==null){
        throw new Error("Invalid number of arguments");
    }
    if (fn.value === "*") {
        var result = 1;
        while(car!=null){
            if(car.type!=TYPES.NUMBER){
                throw new Error("Invalid argument type");
            }
            result *= car.value;
            car = CDR(car);
        }
        return CONS(new Node(TYPES.NUMBER, result));

    } else if ((fn.value === "+")) {
        var result = 0;
        while(car!=null){
            if(car.type!=TYPES.NUMBER){
                throw new Error("Invalid argument type");
            }
            result += car.value;
            car = CDR(car);
        }
        return CONS(new Node(TYPES.NUMBER, result));
    }else {
        throw new Error("Unknown function");
    }
}



function EVAL_LIST(list, env) {
    if (list == null) {
        return null;
    }
    return CONS(EVAL(CAR(list), env), EVAL_LIST(CDR(list), env));
}


module.exports = EVAL;