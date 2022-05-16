Function.prototype.myBind = function (self, ...args) {
    return () => {
        return this.apply(self, args);
    }
}

function bar() {
    console.log(this.a);
}

const newBar = bar.myBind({ a: 10 });

newBar();

// 圣杯模式的继承
function inherit(Origin, Target) {
    function F() {}
    F.prototype = Origin.prototype;
    Target.prototype = new F();
    Target.prototype.constructor = Target;
    Target.prototype.superFather = Origin;
}

