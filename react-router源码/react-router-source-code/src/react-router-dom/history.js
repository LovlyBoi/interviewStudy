// 构建一个react-router的history对象以及location对象
// 这里会使用到一个第三方库history
// 

// history.action: 当前地址栈最后一次操作的类型
//     - 如果是通过createxxxHistory创建的history对象, action固定为POP
//     - 调用history.push会将action变更为PUSH
//     - 调用history.replace会将action变更为REPLACE
// history.push: 向浏览器地址栈入栈一个地址
// history.go: 控制当前地址栈进行指针偏移, 如果参数为0则地址不变, 如果是在浏览器里则会刷新页面, 如果是负数则后退指定的步数, 如果是正数则前进指定的步数
// history.length: 当前浏览器地址栈的长度
// history.goBack: 相当于go(-1)
// history.goForward: 相当于go(1),
// history.replace: 替换当前指针指向的地址为参数地址
// history.listen: 用于监听地址栈指针的变化, 该函数接受一个函数作为参数, 表示当地址变更以后要做的回调, listen会往该回调里注入两个参数, 一个是location(新地址的各项参数), 一个叫做action(进入新地址的方式: POP, PUSH, REPLACE), 该函数有一个返回值, 是一个函数, 用于取消监听 
// history.block: 用于设置一个阻塞器, 在页面发生跳转时将指定的消息传递给getUserConfirmation, 并调用getUserConfirmation函数
import { createBrowserHistory } from "history";

const history = createBrowserHistory()

const unblock = history.block((location) => {
    console.log("location", location)
    // 在这里我们可以通过判断是否有权限, 再选择是否进入对应路由页面
    // if (token有效可以进入) {
    //     unblock(); // 先解锁阻塞
    //     location.retry(); // 在进行重试
    //     // 然后最好是再重新上锁
    // }
})

window.h = history;