# promise的静态方法

- Promise.resolve(data): 直接返回一个完成状态的任务
- Promise.reject(error): 直接返回一个失败状态的任务
- Promise.all(taskArray): 返回一个任务, 任务数组全部成功则成功, 有一个失败则失败, 成功后会将任务数组中每一个任务的结果收集起来作为数据返回, 失败后会将第一个失败的原因直接返回
- Promise.any(taskArray): 返回一个任务, 任务数组任一一项成功则成功, 任务全部失败则失败, 成功后返回的是第一个成功任务的结果, 失败以后返回的是第一个失败的任务的原因
- Promise.allSettled(任务数组): 返回一个任务, 任务数组全部已决则成功, 该任务不会失败, 即使你的任务数组里有失败的, 他也不管
    ```js
    Promise.allSettled([Promise.reject("error"), Promise.resolve("data")]).then(r => {
        console.log("result", r); // 会输出 [{ status: rejected", reason: "error" }, { status: "fullfilled", value: "data" }]
    })
    ```
- Promise.race(任务数组): 返回一个任务, 任务数组中最先一个进入已决状态(不管是rejected还是fullfilled)则该任务进入已决, 任务状态和数据同最先进入已决状态的数据完全一致