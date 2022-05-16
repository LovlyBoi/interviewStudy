# WeakSet, WeakMap

来看个例子

```js
const obj = {
    a: 10
}

const set = new Set();

set.add(obj);

obj = null;

console.log("set", set); // set里的{ a: 10 } 还在, 因为当我们把obj设置为null以后, obj这个变量不指向{ a: 10 }了， 但是别忘了, 塞进set的时候, 是把这个地址{a: 10} 塞进去了, 那set可就还攥着哪
```

而WeakSet就是给了你一个骚操作, 他的api和Set完全一致, 就是在上面这样的场景中, 他的表现不太一致, **他内部存储的变量地址不会影响垃圾回收**

```js
const obj = {
    a: 10
}

const set = new WeakSet();

set.add(obj);

obj = null;

console.log("set", set); // set里的{ a: 10 } 也没有了
```