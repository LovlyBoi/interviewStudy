# promise

promise是一套专门处理异步场景的规范, 他能有效的避免回调地狱的产生, 使异步代码更加清晰, 简洁和统一

### Promise A+ 规范

这套规范最早诞生于前端社区, 规范名称为```Promise A+```

该规范推出以后, 立即得到了许多开发者的响应

Promise A+规范规定:

1. 所有的异步场景, 都可以看做是一个异步任务, 每个异步任务, 在JS中应该看做是一个对象, 该对象称之为Promise对象, 也叫做任务对象
2. 每个任务对象, 都应该有两个阶段 三个状态
    - 未决阶段(unsettled) / pending状态
    - 已决阶段(settled) / fullFilled(成功) 或者 rejected(失败)状态
    根据常理, 他们之间存在以下逻辑:
    - 任务总是从未决阶段走向已决阶段, 无法逆行
    - 任务总是从挂起的状态转向成功或者失败状态, 无法逆行
    - 时间无法倒流, 历史不可改写, 任务一旦完成或者失败, 状态就固定下来, 永远无法改变
3. 挂起走向完成, 称之为resolve, 挂起走向失败, 称之为reject, 任务完成时可能有一个相关数据, 任务失败时可能有一个失败原因
4. 可以针对任务进行后续处理, 针对完成以后的后续处理叫做onFullFilled, 针对失败以后的后续处理叫做onRejected

## Promise API

ES6提供了一套API, 实现了Promise A+ 规范

```js
// 创建一个Promise实例等于在创造一个Promise任务, 同时该任务直接进入已决阶段的pending状态
const promiseTask = new Promise((resolve, reject) => {
    // 任务的具体流程会被立即执行
    // 在执行过程中调用resolve会将任务推向已决阶段的fullFilled状态
    // 调用reject会将任务推向已决阶段的rejected状态
})

// 通过promise任务实例, 我们可以注册针对完成后的后续处理, 也可以注册失败以后的后续处理
promiseTask.then((result) => {
    // onFullFilled
})

promiseTask.catch((error)) => {
    // onRejected
}
```