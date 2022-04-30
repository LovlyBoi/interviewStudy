function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            fn.apply(this, args);
        } else {
            return function(...anotherArgs) {
                return curried.apply(this, args.concat(anotherArgs));
            }
        }
    }
}

export default curry;