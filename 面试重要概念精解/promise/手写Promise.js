const PENDING = "pending";
const REJECTED = "rejected";
const FULFILLED = "fulfilled";

function  pushToMicroTask(callback) {
    if (process && process.nextTick) {
        // 代表是node环境
        process.nextTick(callback);
    } else if(window && document) {
        // 代表是浏览器环境
        if (MutationObserver) {
            // 看看支不支持MutationObserver
            const div = document.createElement("div");
            const observer = new MutationObserver(callback);
            observer.observe(div, {
                childList: true
            })
            div.innerHTML = 1;
        } else {
            setTimeout(callback);
        }
    } else {
        setTimeout(callback);
    }
}

function isPromise(obj) {
    return !!(obj && typeof obj === "object" && typeof obj.then === "function");
}

class MyPromise {
    constructor(executor) {
        this.__status = PENDING;
        this.__data = null;
        this.__reason = null;
        this.__dispatchers = [];
        try {
            executor(this.__resolve.bind(this), this.__reject.bind(this));
        } catch(error) {
            this.__reject(error);
        }
    }

    __updatePromiseStatus(newStatus, data) {
        if (this.__status !== PENDING) {
            // 如果他当前已经不是pending状态了, 根据PromiseA+规范的规则: 任务对象的状态一旦从pending转变为fulfilled或者rejected, 则不可逆转
            return;
        }
        this.__status = newStatus;
        if (newStatus === FULFILLED) this.__data = data;
        else this.__reason = data;
    }

    __resolve(value) {
        // resolve做的事情如下:
        // 1. 将当前Promise的状态变动为fulfilled
        this.__updatePromiseStatus(FULFILLED, value);
        // 2. 调用用户绑定在then方法中的onFulFilled回调
        this.__executeDispatchers();
    }
    __reject(reason) {
        this.__updatePromiseStatus(REJECTED, reason);
        this.__executeDispatchers();
    }

    __pushToDispatchers(dispatcherConf) {
        this.__dispatchers.push(dispatcherConf);
    }

    __executeDispatcher({ dispatcher, status, resolve, reject }) {
        this.__dispatchers.shift();
        if (this.__status !== status) {
            // 代表这个dispatcher状态不符合要求
            // 直接剔除就完事了
            return;
        }
        if (typeof dispatcher !== "function") {
            // 代表需要进行状态穿透
            this.__status === FULFILLED ? resolve(this.__data) : reject(this.__reason);
            return;
        }

        // 能够走到这来, 代表是可以进行正常执行的dispatcher, 但是我们知道then绑定的回调是会进入微队列的, 所以我们处理一下
        pushToMicroTask(() => {
            try {
                const result = this.__status === FULFILLED ?  dispatcher(this.__data) : dispatcher(this.__reason);
                // 如果返回的是一个新的Promise, 则我们需要将resolve的状态保持一致
                if (isPromise(result)) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch(err) {
                reject(err);
            }
        })
    }

    __executeDispatchers() {
        if (this.__status === PENDING) return; // 如果当前还是pending状态就别管了
;        while(this.__dispatchers[0]) {
            // 只要有值, 你就给我一直走
            this.__executeDispatcher(this.__dispatchers[0]);
        }
    }

    then(onFulFilled, onRejected) {
        // 这个onFulFilled是在resolve的时候才会运行, onRejected是在reject的时候才会运行, 所以我们要做的仅仅是留存一下状态
        // 同时我们知道then 会直接返回一个Promise
        return new MyPromise((resolve, reject) => {
            this.__pushToDispatchers({
                status: FULFILLED,
                dispatcher: onFulFilled,
                resolve, // 这个resolve 和reject传递过去的主要原因是, 我们知道then 返回的Promise的状态决定于当前Promise的状态
                reject
            })

            this.__pushToDispatchers({
                status: REJECTED,
                dispatcher: onRejected,
                resolve,
                reject
            })

            // 这里我们最好还要直接运行一次所有绑定的dispatcher, 主要原因是因为有可能当我们去调用then方法的时候, 该Promise的状态已经成为fulfilled或者rejected了
            this.__executeDispatchers();
        })
    }

    catch(onRejected) {
        // 直接注册一个rejected回调就好了
        // return new MyPromise((resolve, reject) => {
        //     this.__pushToDispatchers({
        //         status: REJECTED,
        //         dispatcher: onRejected,
        //         resolve,
        //         reject
        //     })
        //     this.__executeDispatchers();
        // })
        return this.then(null, onRejected);
    }

    finally(onSettled) {
        return this.then((data) => {
            onSettled();
            return data;
        }, reason => {
            onSettled();
            throw reason;
        })
    }
    
    static resolve(data) {
        if (isPromise(data)) return data;
        return new MyPromise((resolve, reject) => resolve(data));
    }

    static reject(reason) {
        return new MyPromise((resolve, reject) => reject(reason));
    }

    // Promise.all方法是可以传迭代器的, 不仅仅是可以数组
    static all(promiseTasks) {  
        return new MyPromise((resolve, reject) => {
           try {
            let finishedCount = 0;
            let count = 0;
            const finishedResults = [];
            for (let promiseTask of promiseTasks) {
                let index = count;
                count ++;
                MyPromise.resolve(promiseTask).then(r => {
                    finishedResults[index] = r;
                    finishedCount ++;
                    if (finishedCount >= count) {
                        resolve(finishedResults);
                    }         
                }, reason => {
                    reject(reason);
                })
            }
            if (count === 0) resolve(finishedResults); // 防止传递空数组
           } catch(err) {
               reject(err);
           }
            
        })
    }

    // allSettled
    static allSettled(promiseTasks) {
        let pts = [];
        for (let promiseTask of promiseTasks) {
            pts.push(promiseTask.then(r => ({
                status: FULFILLED,
                data: r
            }), reason => ({
                status: REJECTED,
                reason: reason
            })))
        }
        console.log(pts);
        return MyPromise.all(pts);
    }

    // race
    static race(promiseTasks) {
        return new Promise((resolve, reject) => {
            for (let promiseTask in promiseTasks) {
                MyPromise.resolve(promiseTask).then(resolve, reject);
            }
        })
    }
}

const pro1 = new MyPromise((resolve, reject) => {
   setTimeout(() => {
     resolve(1);
   }, 2000)
})

const pro2 = new MyPromise((resolve, reject) => {
    resolve(2);
})

MyPromise.allSettled([pro1, pro2, MyPromise.reject("error")]).then(r => {
    console.log("rs", r);
})

// console.log("pro1", pro1);

// pro1.then(r => {
//     console.log("result", r);
//     return 2;
// }, (err) => {
//     console.log("err", err);
// }).then(r => {
//     console.log("result2", r);
//     return new Promise((res, rej) => {
//         rej("error2");
//     })
// }).catch(err => {
//     console.log("Err3", err)
// })