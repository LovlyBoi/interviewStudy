let obj = {
    a: 10
}

const set = new WeakSet([obj]);

// const arr = [obj];

// obj = null;

console.log("set", set, set.has(obj));


const weakMap = new WeakMap([[obj, 3]]);

console.log("weakMap", weakMap);