# promise的链式调用

- promise的then方法必定会返回一个新的Promise, 可以理解为后续处理也是一个任务
- 新任务的状态取决于后续处理:
    - 如果没有相关的后续处理, 新任务的状态和前任务保持一致, 数据为前任务的数据
        ```js
        // 比如说一开始的任务是fullfilled, 但是一开始的任务并没有注册onFullFilled的回调, 这个时候then返回的Promise状态也是fullfilled
        // 数据为第一个任务fullfilled的数据
        const pro1 = new Promise((resolve, reject) => {
            resolve(1);  
        })

        // 注意我这个pro1并没有注册onFullFilled的回调, 但是这个pro1明显进入已决以后
        // 会是fullfilled状态
        const pro2 = pro1.catch(err => {
            console.log("err", err);
        })

        // 那么上面的pro2的状态也会是fullfilled
        pro2.then(res => {
            console.log("res", res); // res输出1
        })

        // 同理如果第一个任务进入已决阶段的状态为rejected, 但是你又没有给这个任务注册onRejected回调, 那么第二个任务会直接进入rejected状态
        // 并且error为第一个任务的失败原因
        ```
    - 若有后续处理但是还未执行, 新任务会挂起
        ```js
        // 就是比如说第一个任务进入已决状态需要一段时间, 那么第一个任务在一开始会是未决阶段的挂起状态, 则第二个任务也是未决阶段的挂起状态
        const pro1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(2);
            }, 2000)
        })

        const pro2 = pro1.catch(err => { // 这个pro2他也是未决阶段的pending状态
            console.log("err", err);
        })
        
        ```
    - 若后续处理执行了, 则根据后续处理的情况确定新任务的状态
        - 后续处理无错, 新任务的状态为完成, 数据为后续处理的返回值
            ```js
            // 这是什么意思呢？ 就是说你给第一个任务他如果是进入fullfilled状态了, 
            // 而且给第一个任务注册了onFullFilled回调, 那么第二个任务的成功与否全看第一个任务onFullFilled回调里有没有出错, 如果没有出错, 
            // 则第二个任务也是fullfilled状态, 且数据为第一个任务onFullFilled回调的返回值
            const pro1 = new Promise((resolve, reject) => {
                resolve(1);
            })

            const pro2 = pro1.then(r => {
                return 2;
            })

            pro2.then(r => {
                console.log("r", r); // 输出2
            })
            ```
        - 如果第一个任务进入了rejected状态, 且给第一个任务注册了onRejected回调, 则第二个任务进入fullFilled状态, 且数据为第一个任务onRejected回调的返回值
            ```js
            const pro1 = new Promise((resolve, reject) => {
                reject(1);
            })
            const pro2 = pro1.catch(err => {
                console.log("err", err);
                return 2;
            })
            pro2.then(r => {
                cosnole.log("r", r); // 输出2
            })
            ```
        - 后续处理执行有错, 新任务的状态为失败, 数据为异常对象
            ```js
            // 这个肯定是毋庸置疑的, 你第一个任务的回调处理都出错了, 那后续也没法进行了
            const pro1 = new Promise((resolve, reject) => {
                resolve(1);
            })

            const pro2 = pro1.then(r => {
                throw new Error("err3");
            })

            pro2.catch(err => {
                console.log("err", err); // 输出err3
            })
            ```
        - 后续执行后返回的是一个任务对象, 新任务的状态和数据与该任务对象返回一致
            ```js
            // 意思就是如果你在处理过程中返回了一个新的Promise, 那就完全按照新的来了
            const pro1 = new Promise((resolve, reject) => {
                resolve(1);
            })
            const pro2 = pro1.then(r => {
                console.log("r", r);
                // 实际上pro2的的状态就完全取决于下面这个新的Promise的状态和阶段了, 但是注意pro2 !== 下面这个Promise实例哦
                return new Promise((resolve, reject) => {
                    
                })
            })
            ```

我们来看一道题:

```js
// 下面代码的输出结果是什么
const pro1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
})

const pro2 = pro1.then((data) => {
    console.log("data", data);
    return data + 1;
})

const pro3 = pro2.then(data => {
    console.log("data", data);
})

console.log(pro1, pro2, pro3);

setTimeout(() => {
    console.log(pro1, pro2, pro3);
}, 2000)

// Promise { <pending> } Promise { <pending> } Promise { <pending> }

// data 1
// Promise { 1 } rejected { 3 } rejected { 3 }


// Promise { <pending> } Promise { <pending> } Promise { <pending> }
// data 1
// data 2
// Promise { 1 } Promise { 2 } Promise { undefined }
```

再来看一个题目

```js
new Promise((resolve, reject) => {
    resolve(1);
}).then(res => {
    console.log("res", res);
    return 2;
}).catch(err => {
    return 3;
}).then(res => {
    console.log("res", res);
})

// 输出1 2 
```

再来看一个题

```js
new Promise((resolve, reject) => {
    throw new Error(1);
}).then(res => {
    console.log("res", res);
    return new Error(2);
}).catch(err => {
    throw err;
}).then(res => {
    console.log("res2", res);
})

// 一句话都不会打印 还会直接报个错
```

再来看一个题

```js
new Promise((resolve, reject) => {
    resolve(1);
}).then(res => {
    console.log("res", res);
    return new Error(2); // 这里是返回一个错误对象, 并没有抛出错误, new Error就是得到一个正常的对象
}).catch(err => {
    throw err;    
}).then(res => {
    console.log("res", res);
})

// res 1
// res Error: 2
```

由于链式调用的存在, 异步代码有了更强的表达能力。