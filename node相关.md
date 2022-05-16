# node

1. 谈谈node的事件循环
    > 每一次node的事件循环会经过大概6个阶段
    > 1. timers
    > 2. pending callback
    > 3. idle prepare
    > 4. poll
    > 5. check
    > 6. close callbacks 
    
    > 其中在我们日常开发中timers poll check队列尤为重要
    > - timers队列: setInterval, setTimeout的回调会在计时器线程处理完毕以后放入该队列
    > - poll队列: 除了进入timers和check队列的绝大多数回调都会进入该队列, 比如文件读取, 监听用户请求的回调
    > - check队列: 使用setImmediate注册的回调会进入该队列
    > 另外还有一个微队列: 使用process.nextTick注册的回调和Promise会进入微队列
    
    > 同时每一次node的事件循环会走以下流程
    > 1. 主线程执行栈中没有任何任务以后会直接去查看微队列中有没有任务待执行, 如果微队列有, 则拿出来执行, 如果没有则进入下一个阶段
    > 1. 下一个阶段timers, 主线程会查看timers队列是否有需要执行的任务, 如果有则拿出来执行, 否则进入poll阶段
    > 2. 主线程执行栈会查看poll队列中是否有需要执行的回调, 如果有, 拿出来执行, 如果没有, 则会查看是否还有其他调度线程在工作, 如果有, 则停留在poll阶段, 并等待其他线程处理完将回调扔入其他队列, 扔入其他队列以后, 主线程会结束poll阶段的观测, 进入下一个队列, 如果都没有其他调度线程在工作了, 主线程会直接结束poll阶段的观测, 进入下一个队列
    > 3. 进入check阶段, 有任务则执行, 没任务则往后续走
    
    > 如此往复的操作, 就叫做node事件循环


2. 聊聊jwt
    > jwt全称json web token, 他要解决的问题就是为多种终端设备提供统一的, 安全的**令牌格式**, 一般来说我们会用消息头来交互jwt, 当客户端登陆成功以后, 服务器会响应给客户端一个jwt, 可以用两个字段来配置jwt, 一个是set-cookie, 这个是在浏览器环境会非常的舒服, 另一个就是单独开一个authorization字段, 这个字段主要用于其他终端的jwt交互, 因为其他终端没有cookie, 后续客户端每次请求都会在请求头中携带上jwt令牌了, 服务端就可以对令牌进行校验, jwt格式的令牌主要由三部分组成:
    > - header: 令牌头部, 记录了整个令牌的类型和签名算法
    > - payload: 令牌的负荷, 记录了保存的主体信息,比如用户信息就是存放在这里的
    > - signature: 令牌签名, 按照头部固定的签名算法对整个令牌进行签名, 该签名的作用也是保证令牌不被伪造和篡改 

3. 了解过mongodb吗？
    > mongodb是文档型数据库, 也可以说是nosql型的数据库, 和mysql的库, 表, 记录不同, mongodb使用库, 集合, 文档来表示数据, mongodb擅长于于表示松散量大的简单数据, 比如日志流水(像我们对标飞书的整个socket原子事件的流水就是用mongo去存储的), mongodb在JS里的驱动有官方的mongodb, 但是我们一般会使用mongoose, mongoose内部使用Schema + model的形式去定义数据模型, 具体的api的话我不太记得了, 因为不会刻意去记api, api要用的时候去文档里找就行了, 记得一些, 什么insertMany, insertOne, 定义结构的话直接new Schema就好了, 然后定义模型的话mongoose.model好像是这样