// new Promise((resolve, reject) => {
//     throw new Error("reject");
// }).then((result) => {

// }).finally(response => {
//     console.log("response", response);
// })

// const pro1 = new Promise((resolve, reject) => {
//    setTimeout(() => {
//     resolve(1); 
//    }, 2000); 
// })

// // 注意我这个pro1并没有注册onFullFilled的回调, 但是这个pro1明显进入已决以后
// // 会是fullfilled状态
// const pro2 = pro1.catch(err => {
//     console.log("err", err);
// })

// // 那么上面的pro2的状态也会是fullfilled
// pro2.then(res => {
//     console.log("res", res); // res输出1
// // })

// const pro1 = new Promise((resolve, reject) => {
//     reject(1);
// })

// let p;

// const pro2 = pro1.catch(err => {
//     console.log("err", err);
//     p = new Promise((resolve, reject) => {
//         resolve(3);
//     })
//     p.then(r => {
//         console.log("r", r);
//         return 4;
//     })
//     return p;
// })

// console.log("pro2 === p", pro2 === p);

// pro2.then(r => {
//     console.log("r", r);
// }).catch(err => {
//     console.log("err3", err);
//     return 2;
// })

// const pro1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(1);
//     }, 1000)
// })

// const pro2 = pro1.then((data) => {
//     console.log("data", data);
//     throw 3;
//     return data + 1;
// })

// const pro3 = pro2.then(data => {
//     console.log("data", data);
// })

// console.log(pro1, pro2, pro3);

// setTimeout(() => {
//     console.log(pro1, pro2, pro3);
// }, 2000)

// 先输出 pro1 pending  pro2 pending pro3 pending
// 然后输出 data 1
// 然后输出 data 2
// 然后输出 pro1 fullfilled 1  fullfilled2  fullfilled undefined


// 下面情况的输出结果是什么
// new Promise((resolve, reject) => {
//     resolve(1);
// }).then(res => {
//     console.log("res", res);
//     return 2;
// }).catch(err => {
//     return 3;
// }).then(res => {
//     console.log("res", res);
// })

// const promiseTask = new Promise((resolve, reject) => {
//     resolve(1);
// })

// promiseTask.then(r => {
//     console.log("res", r);
// })

// // promiseTask.catch()

// // res 1 2

// // new Promise((resolve, reject) => {
// //     throw new Error(1);
// // }).then(res => {
// //     console.log("res", res);
// //     return new Error(2);
// // }).catch(err => {
// //     throw err;
// // }).then(res => {
// //     console.log("res2", res);
// // })

// // new Promise((resolve, reject) => {
// //     resolve(1);
// // }).then(res => {
// //     console.log("res", res);
// //     return new Error(2); // 这里是返回一个错误对象, 并没有抛出错误, new Error就是得到一个正常的对象
// // }).catch(err => {
// //     throw err;    
// // }).then(res => {
// //     console.log("res", res);
// // })





// new Promise((resolve, reject) => {
//     // 通过new Promise一定会返回一个promise实例, 这个实例又被称之为Promise任务
//     // 如果我想让这个任务走向已决阶段的 fullfilled状态(处理成功状态), 则需要调用resolve方法
//     // 如果我想让这个任务走向已决阶段的 rejected状态(出错), 则需要调用reject方法
//     reject("error triggered");

//     // 当我调用了reject以后, 该promise任务立即进入出错状态, 我们可以通过给该promise任务
//     // 注册onRejected（错误捕获处理）回调函数来捕获这个错误
// }).catch(err => {
//     console.log("err", err); // 这里会输出error triggered
// })


// // 在下面这个场景下, new Promise生成的promise任务并没有注册catch回调, 那就意味着
// // 这个promise的任务是失败了, 但是没人管这个失败, 没人管这个失败 他就直接摆烂了
// new Promise((resolve, reject) => {
//     reject("error triggered");
// }).then(res => {}).catch(err => {
//     // then会返回一个新的Promise任务, 他发现第一个Promise任务是失败的, 而且没人处理那个失败
//     // 这个新的Promise任务就说 那好吧, 那我也就摆烂了, 于是这个新的Promise任务也直接进入rejected(失败)状态
//     // 然后这个时候如果我们给这个新的Promise任务注册catch, 他就会得到之前那个摆烂的promise任务的错误信息, 这就是传染
//     console.log("err", err); // 输出error triggered
// })

// // 我们可以拆解一下上面的写法, 实际上上面的写法new Promise().then().catch() 拆开就是下面的写法
// const pro1 = new Promise((resolve, reject) => {
//     reject("error triggered");
// })

// const pro2 = pro1.then(res => {})

// // 所以实际上是pro2在替pro1收拾烂摊子, 因为pro1没有注册catch函数, 但是他的错误必须要有人管, 就传染给pro2了
// pro2.catch(err => {
//     console.log("err", err);
// })




new Promise((res, rej) => {
    rej("error");
}).then(() => {}, () => {})
  .catch((err => {console.log("Error", err)}))
  .then(res => console.log("res333", res));