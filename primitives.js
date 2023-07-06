const TYPES = {
    FUNCTION: 1,
    NUMBER: 2,
    STRING: 3,
    LIST: 4,
    SYMBOL: 5
}

class Node {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class ConsCell{
    constructor(car, cdr){
        this.car = car;
        this.cdr = cdr;
    }
}

function CONS(car,cdr){
    return new ConsCell(car,cdr);
}

function CAR(cons){
    return cons.car;
}

function CDR(cons){
    return cons.cdr;
}

module.exports = {
    TYPES,
    CONS,
    CAR,
    CDR,
    Node,
    ConsCell
};