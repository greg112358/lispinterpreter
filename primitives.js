const TYPES = {
    LAMBDA: 1,
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
    if(cons==null)return null;
    return cons.car;
}

function CDR(cons){
    if(cons==null)return null;
    return cons.cdr;
}

function CAAR(cons){
    return CAR(CAR(cons));
}

function CADR(cons){
    return CAR(CDR(cons));
}

function CDAR(cons){
    return CDR(CAR(cons));
}

module.exports = {
    TYPES,
    CONS,
    CAR,
    CDR,
    CAAR,
    CADR,
    CDAR,
    Node
};