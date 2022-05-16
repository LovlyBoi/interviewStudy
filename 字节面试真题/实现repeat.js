function repeat(fn, times, wait) {
    return function (...args) {
        const self = this;
        let count = 0;
        const timer = setInterval(() => {
            fn.apply(self, args);
            count += 1;
            if (count >= times) {
                clearInterval(timer);
            }
        }, wait)
    }
}

const repeatFn = repeat(function(str) { console.log(str); }, 4, 1000);

repeatFn("HELLO");