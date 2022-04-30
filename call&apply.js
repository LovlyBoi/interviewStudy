

Function.prototype.fakeCall = function(_this, ...args) {
    const fn = this; // 这个时候的fn其实就是这个函数

    _this.fn = fn;

    const result = _this.fn(...args);

    delete _this.fn;

    return result;
}

function bar() {
    console.log("this.a", this.a);
}

window.a = 123;

bar(); // 输出123

bar.fakeCall({
    a: 234
}); // 输出234