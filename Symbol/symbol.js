const symbol1 =  Symbol.for("abc");
const symbol2 = Symbol.for("abc");

console.log("symbol1", symbol1 === symbol2);

console.log("Symbol.keyFor(symbol2)", Symbol.keyFor(symbol2));


class Test {
    [symbol1]() {
        console.log("helloWorld");
    }

    constructor() {
        this[symbol1]();
    }
}

const test = new Test();