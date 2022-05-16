# 原生JavaScript

1. undefined和null有什么区别?
    > undefined属于7大基本类型之一(number, string, object, undefined, symbol, boolean 以及es2020推出的bigInt```bigInt主要是为了解决number类型精度丢失的问题```), undefined指未指定值的变量的默认值, 而null在很久以前是给object占位用的, 所以```typeof null```依旧会获得object类型, 也正是因为这一点, 所以JavaScript引擎会给对象没有指定值的key分配默认值为undefined而不会分配null, 不过两个值都是会被转换为false的非值, 所以undefined可以等于null, 但是由于类型不一致, 不能绝对等于null
 
    ```js
    console.log(undefined === null); // false
    console.log(undefined == null); // true
    ```
2. dom是什么？
    > dom全称document object module, 意为文档对象模型, 这个对象中提供了很多的实用方法, 用于交互和修改指定元素或者节点, dom对象会在浏览器第一次解析html文档的时候由浏览器内部自动创建

3. 说一下事件冒泡和事件捕获
    > 当事件发生在dom元素身上时, 如果不做特殊处理, 他会由该dom元素将事件依次传播到父级, 直到到达document, 我们可以通过```e.stopPropagation```来阻止事件冒泡, 和事件冒泡相反的, 如果开启了事件捕获, 当事件发生在dom元素上时, 会最先触发document的对应事件, 然后一层一层的传播到该dom事件, 这叫做事件捕获, 事件捕获需要我们将```addEventListener```的第三个参数设置为true开启（为false的话则是开启事件冒泡, 默认值也是false）, 事件捕获我们一般不太会使用(兼容性也有部分问题), 但是事件冒泡我们一般会用来做事件委托, 以达到动态监听dom元素和提高性能的目的
   ```js
     const wrapperElement = document.getElementsByClassName("wrapper")[0];
     const contentElement = document.getElementsByClassName("content")[0];

     wrapperElement.addEventListener("click", () => {
         console.log("wrapper click");
     }, false);

     contentElement.addEventListener("click", () => {
         console.log("content click");
     }, false);

     document.addEventListener("click", () => {
         console.log("document click");
     }, true)
   
   // 上述例子, 当点击了content以后 会依次触发 document, content, wrapper, 因为document注册了捕获, 所以他肯定先触发, 而content和wrapper注册的都是冒泡, 所以content 先于wrapper触发
   ```

4. 如何知道是否在元素中使用了```e.preventDefault```方法
    ```js
    documnent.addEventListener("click", (e) => {
        // e.defaultPrevented返回一个布尔值, 该布尔值可以确定当前是否有阻止默认事件
        console.log("当前元素是否阻止了默认事件", e.defaultPrevented);
    })
    ```

5. event.target和event.currentTarget的区别是什么
    > event.target是你点击的dom, 而event.currentTarget是你点击了该dom以后触发的回调事件绑定的dom
    ```js
    // 举个例子: 现在有一个button在div中间, 我给div注册了click事件
    // 给button没有注册任何事件, 则当我点击button的时候
    // currentTarget 指向div
    // target 指向button
    ```
6. 什么是作用域
   > 每个JavaScript函数都是一个对象, 对象上有些属性我们可以访问, 但有些不可以, 这些不可以的属性仅供JavaScript引擎存取, ```[[scope]]```就是其中一个, ```[[scope]]```指的就是我们所说的作用域, 其中存储了执行期上下文的集合, ```[[scope]]```中所存储的执行期上下文对象的集合, 这个集合呈链式连接, 我们把这种链式连接叫做作用域链, 然后民间有一种比较通俗的说法, 就是作用域就是我们可以有效访问变量的区域, 目前的作用域分为三种, 全局作用域 函数作用域和块级作用域
   
7. 什么是原型
   > 原型是function对象的一个属性, 它定义了构造函数制造出来的对象的公共祖先, 通过该构造函数产生的对象, 可以继承该原型的方法, 原型也是对象, 利用原型的特点, 可以提取共有属性

8. 说说预编译
   > 预编译发生在函数执行的前一刻, 预编译四部曲如下
   - 创建AO对象
   - 找形参和变量声明, 将形参和变量声明的名作为AO的属性名, 值为undefined
   - 将实参值和形参相统一
   - 找函数声明, 将函数声明的名作为AO的属性名, 值赋予函数体

9. 手写```call```和```apply```
   ```js
   Function.prototype.fakeCall = function(_this, ...args) {
   const fn = this; // 这个时候的fn其实就是这个函数
   
       _this.fn = fn;
   
       const result = _this.fn(...args);
   
       delete _this.fn;
   
       return result;
   }
   
   function bar() {
   console.log("this.a", this.a);
   }
   
   window.a = 123;
   
   bar(); // 输出123
   
   bar.fakeCall({
   a: 234
   }); // 输出234
   ```
   apply的实现方式同理, 只是参数结构不一样

10. 实现一个圣杯模式的继承
   ```js
   function inherit(Origin, Target) {
        function F() {}
        F.prototype = Origin.prototype;
        Target.prototype = new F(); 
        Target.prototype.constructor = Target;
        Target.prototype.superFather = Origin.prototype;
   }
   ```

11. 什么是闭包
   > 有一种通俗的说法就是内部函数保存到了外部, 就会产生闭包, 不过我有去看mdn的官方文档以及es标准的书, 他们对闭包的解释是: 只要内部函数访问了外部函数的变量, 就会产生闭包, 闭包会导致原有作用域不被释放, 造成内存泄露, https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Closures, 合理运用闭包可以实现变量状态的留存

12. 箭头函数和普通函数的区别
      1. 箭头函数没有自己的this, arguments, super 和 new.target, 因为这一点, 箭头函数不能被当做构造函数使用
      2. 箭头函数的this只会从自己作用域链的上一层继承this, 说通俗点就是箭头函数会继承自己父级环境的this, 直到window为止, 同时call/apply/bind都没有办法去改变箭头函数的this指向
      3. 箭头函数没有自己this的根本原因是因为没有自己的原型
      4. 箭头函数不能用作Generator函数, 不能使用yield关键字

13. let/const 和var的区别是什么
    1. var在全局声明的变量会直接挂载在window下, 而let和const不会, 这两个声明的变量会挂载在```[[scope]]``中
    2. var声明的变量会参与预编译环节进行变量提升, let和const声明的并不会, 由于这一点, let和const声明的变量会生成暂时性死区
      ```js
      {
        a = 100; // 直接报错
        let a;
      }
      ```
    3. const声明常量, 且声明后不允许用null占位


14. 实现一个函数防抖与节流

    - 防抖: n秒后执行该事件, 如果n秒内被重新触发则重新计时, 防抖的主要应用场景有搜索框用户最后一次输入完毕以后再进行发送请求或者校验啥的, 或者窗口resize

        ```js
        function debounce(callback, duration) {
            let timer = null;
            let result;
            return (...args) => {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    result = callback.apply(this, args);
                }, duration)
                return result;
            }
        }
        ```
        
    - 节流: n秒内只触发一次事件, 如果在n秒内重复触发, 只有一次生效, 滚动加载
        ```js
        function throttle(callback, duration) {
            const tickTime = null;
            return (...args) => {
                const now = new Date().getTime();
                if (tickTime && tickTime > now) return;
                const result = callback.apply(this, args);
                tickTime = new Date().getTime() + duration;
                return result;
            }
        }
        ```

15. 实现一个函数柯里化
    ```js
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
    ```

16. 平时是怎么做性能优化的？
    > 前端常见的性能指标有3个:
    1. FCP: first content paint, 页面开始加载到页面中第一个元素被渲染之间的时间, 这个指标可以通过```web_vitals```这个库, 或者使用lighthouse这种Chrome的devtools, 再或者使用paint timing api 来进行测量
    2. LCP: largest content paint, 视口内可见的最大内容元素的渲染时间, 元素包括img, video, div以及其他块级元素, 根据google建议, 为了给用户更好的体验, lcp应该低语2.5s, 同样通过```web_vitals```或者paint timing api 以及web vitals chrome extensions这类的devtools可以测量
    3. FID: first input delay, 用户第一次与页面交互的时间到浏览器能够实际响应这种交互的时间, 交互包括用户点击一个链接或者一个按钮等, google建议FID最好低于100ms, 测量方式和上面一致, 不过他不是paint timing api, 他是every timing api
    4. TTI: time to interactive, 测量页面所有资源加载成功并能够可靠的响应用户输入的时间, 测量该指标最简单的方式就是通过Performance api
    5. TBI: total blocking time, 从FCP 到TTI之间主线程被阻塞时长的总和

    <!-- 做性能优化的策略:
    - 减少cookie的传输: 过多的cookie会造成带宽的浪费, 我们可以减少在cookie中存储的东西以及单独配置静态资源的域名以移除cookie
    - 避免过多的重排和重绘: 减少过多的dom操作
    - webpack进行分包优化
    - 开启缓存: 服务端在响应头中开启静态资源的缓存, 设置expires和cache-control等字段, 可以强缓存的开启强缓存, 不能强缓存的开启协商缓存
    - 开启预加载和懒加载
    - 有些库打包如果体积过大可以使用cdn的加载策略
    - 优化图片, 比如使用精灵图或者webp格式的图片, 避免图片src地址为空 -->
    做好性能优化应该从3个层面出发:
    1. 网络层面: 网络层面的性能优化, 无疑是如何让资源的**体积更小, 加载更快**
        - 构建策略: 基于构建工具(如webpack)
            - 减少打包体积: 
                - 缩减范围:
                    缩减范围即配置```include/exclude```来缩小loader对文件的缩小范围, 好处是避免不必要的transform, 尽量避免loader去转换```node_modules```目录, 因为非特殊情况下, ```node_modules```目录的代码是不需要进行编译和转换的
                    ```js
                    export default {
                        module: {
                            rules: [
                                {
                                    exclude: /node_modules/,
                                    include: /src/,
                                    test: /.ts$/,
                                    use: "ts-loader"
                                }
                            ]
                        }
                    }
                    ```
                - 缓存副本: 
                    配置cache缓存loader对文件的编译副本, 好处是再次编译时只编译修改过的文件, 提升开发体验, 目前大部分loader都提供cache的配置选项, 如果没有提供, 我们可以手动追加cache-loader, 不过cache-loader放置的位置要放到最前(具体原因可以https://
                - 提前构建: 
                    配置DllPlugin将第三方依赖提前打好包, 好处将DLL与业务代码分离且每次只构建业务代码, 这是一个比较古老的配置, 目前webpack已经不推荐这玩意, Dll意为动态链接库, 指一个包含可由多个程序同时使用的代码库, 在前端领域里可以理解为另类的缓存模式, 他把公共代码打包为dll文件并存到硬盘里, 再次打包时就无需再次打包那些被打包成dll文件的公共代码了, 从而提升构建速度, 减少打包时间, 配置dll总体来说相比其他配置更加复杂, 配置流程大概可以分为3步
                    1. 首先需要告知脚本哪些依赖需要做成dll并生成dll文件以及dll映射表文件
                        ```js
                        import { DefinePlugin, DllPlugin } from "webpack";
                        
                        export default {
                            entry: {
                                vendor: ["react", "react-dom", "react-router-dom"]
                            },
                            mode: "production",
                            optimization: {
                                splitChunks: {
                                    cacheGroups: {
                                        vendor: {
                                            chunks: "all",
                                            name: "vendor",
                                            test: /node_modules/
                                        }
                                    }
                                }
                            },
                            output: {
                                filename: "[name].dll.js", 
                                library: "[name]", // 全局变量名称, 其他模块会从此变量上获取里面的模块
                                path: AbsPath("dist/static"), // 输出目录路径
                            },
                            plugins: [
                                new DefinePlugin({
                                    "process.env.NODE_ENV": JSON.stringify("development")
                                }),
                                  new DllPlugin({
                                    name: "[name]", // 全局变量名称：减小搜索范围，与output.library结合使用
                                    path: AbsPath("dist/static/[name]-manifest.json") // 输出目录路径
                                })
                            ]
                        }
                        ```
                    2. 然后在```package.json```里配置脚本且每次构建前首先执行该脚本打包出dll文件
                        ```json
                        {
                            "scripts": {
                                "dll": "webpack --config webpack.dll.js"
                            }
                        }
                        ```
                    3. 最后链接dll文件并告知webpack可命中的dll文件让其自行读取, 使用html-webpack-tags-plugin在打包时自动插入dll文件
                        ```js
                        import { DllReferencePlugin } from "webpack";
                        import HtmlTagsPlugin from "html-webpack-tags-plugin";

                        export default {
                            // ...
                            plugins: [
                                // ...
                                new DllReferencePlugin({
                                    manifest: AbsPath("dist/static/vendor-manifest.json") // manifest文件路径
                                }),
                                new HtmlTagsPlugin({
                                    append: false, // 在生成资源后插入
                                    publicPath: "/", // 使用公共路径
                                    tags: ["static/vendor.dll.js"] // 资源路径
                                })
                            ]
                        };
                        ```
                - 并行构建: 
                    配置Thread将loader单进程转换为多进程, 好处是释放CPU多核并发的优势, 在webpack构建项目时会有大量文件需要解析和处理, 构建过程是计算密集型的操作, 随着文件增多会使得构建过程变慢
                    运行在node里的webpack是单线程模型, 简单来说就是webpack待处理的任务需要一件件处理, 不能同一时刻处理多件任务
                    文件读写和计算操作无法避免, thread-loader可以帮助我们开启webpack的多线程操作, 发挥多核cpu的性能以提升构建速度, **注意: 如果文件数量不够多, 则没必要开启多线程, 否则可能会导致得不偿失**
                    ```js
                    import OS from "os";
                    export default {
                        module: {
                            rules: [
                                {
                                    test: /\.js$/,
                                    use: [{
                                        loader: "thread-loader",
                                        options: { workers: OS.cpus().length }
                                    }]
                                }
                            ]
                        }
                    }
                    ```  
                - 可视结构:
                    配置BundleAnalyzer分析打包文件的结构, 这个虽然不能直接提升性能, 但是可以帮我们找出导致体积过大的原因, 从而通过分析原因得出优化方案减少构建时间, BundleAnalyzer是webpack的官方插件, 可直观分析打包文件的模块组成部分, 模块体积占比, 模块包含关系, 文件是否重复, 压缩体积对比等可视化数据
                    ```js
                    import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
                    export default [
                        plugins: [
                            BundleAnalyzerPlugin()
                        ]
                    ]
                    ```
            - 减少打包体积: 分割代码, 摇树优化, 动态垫片, 按需加载, 作用提升, 压缩资源
                - 分割代码:
                    分割各个模块的代码, 提取相同部分的代码, 好处是减少重复代码的出现率, webpack4以后使用splitChunks替代过去的CommonsChunksPlugin实现代码分割, splitChunks配置较多, 具体可以参考官网, 但是常用配置大致如下:
                    ```js
                    export default {
                    // ...
                        optimization: {
                            runtimeChunk: { name: "manifest" }, // 抽离WebpackRuntime函数
                            splitChunks: {
                                cacheGroups: {
                                    common: {
                                        minChunks: 2,
                                        name: "common",
                                        priority: 5,
                                        reuseExistingChunk: true, // 重用已存在代码块
                                        test: AbsPath("src")
                                    },
                                    vendor: {
                                        chunks: "initial", // 代码分割类型
                                        name: "vendor", // 代码块名称
                                        priority: 10, // 优先级
                                        test: /node_modules/ // 校验文件正则表达式
                                    }
                                }, // 缓存组
                                chunks: "all" // 代码分割类型：all全部模块，async异步模块，initial入口模块
                            } // 代码块分割
                        }
                    };
                    ```
                - 摇树优化: treeshaking在webpack4已经默认开启了, 不过我们必须使用ESM规范才可以让treeshaking去移除重复代码和未使用代码, 不过目前webpack5好像也支持commonJS的treeshaking了
                - 按需加载: 将页面/路由/触发性功能单独打包成一个文件, 使用时才加载, 这样可以减轻首屏渲染的负担, 因为项目功能越多, 其打包体积就越大, 导致首屏渲染速度就越慢, webpack v4提供```import()```来支持按需加载
                - 压缩资源: 使用html-webpack-plugin/OptimizeCss/Uglifyjs去压缩文件代码, 可以有效的减少打包体积
                
        - 图像策略: 基于图像类型(JPG/PNG/SVF/Webp/Base64), 根据自己的实际需求选择合适的图片资源格式, 尽量使用webp格式的图片
        - 分发策略: 基于内容分发网络(CDN)
        - 缓存策略: 基于浏览器缓存(强缓存/协商缓存)
            - 开启强缓存或者协商缓存, 能强缓存的后端就追加expires以及cache-control字段, 需要协商缓存的后端就追加一下last-modified或者etag字段
    2. 渲染层面: 渲染层面的性能优化, 无疑是如何让代码解析更好, 执行更快
        - css策略
            - 避免出现超过3层的css嵌套规则
            - 避免为id选择器添加多余选择器
            - 避免使用标签选择器代替类选择器
            - 避免使用通配符选择器
            - 避免重复匹配重复定义, 关注可继承属性
        - dom策略(实际上目前的第三方框架都帮我们已经做好了)
            - 缓存dom计算属性
            - 避免过多操作dom
            - 使用dom fragment缓存批量化dom
        - 首屏渲染策略
            - 预解析: 预先解析dns获取域名对应ip
            - 预加载: 延后加载无须立即用到的资源, 在快要用到时提前加载好
            - 懒加载: 延后加载无须立即用到的资源, 在快要用到时才加载
            - 懒执行: 延后执行无须立即处理的逻辑, 等到要使用时才执行
    3. 脚本层面: 
        - 优化高频策略: 
            - 合理使用节流防抖
            - 合理使用requestIdleCallback以及requestAnimationFrame（可以用来替代setTimeout）
            - 尽量使用lodash这类工具库来提升工具方法的性能

17. 能简单说一下Promise A+规范吗
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

18. 说说下面代码的执行结果

    ```js
    const arr = [1, 2, 3, 4, 5];
    for (const item in arr) {
        console.log("item", item);
        arr.shift();
    }

    console.log("arr", arr);
    ```

19. 请介绍一下JavaScript中的内存泄露和垃圾回收机制

    - 内存泄露: 程序的运行需要内存, 只要程序提出要求, 操作系统或者运行时(runtime)环境就必须提供内存。对于持续运行的服务器进程, 必须及时释放不被用到的内存, 否则, 内存占用越来越高, 轻则影响性能, 重则造成崩溃, 也就是说如果不及时清理没有用到的内存, 则会造成内存泄露, 内存泄露其实是一种抽象的表达, 就是你可用的内存越来越少了, 但是又不是你主观控制的, 就像内存都泄露跑掉了一样, 所以叫做内存泄露
    - 垃圾回收: 浏览器的javascript具有自动回收机制(GC), 也就是说, 执行环境会负责管理代码执行过程中使用的内存, 垃圾收集器会周期性找出那些不再继续使用的变量, 然后释放其占用的内存

20. 聊聊web worker
    > web worker可以允许我们在后台单独创建一个线程去做一些任务, 单独跑的线程不会对主线程进行阻塞, 主要的使用方式是:
    1. 单独创建一个JS文件来跑一些复杂计算, 从而不阻塞主线程, 可以通过postMessage和onmessage进行通信
    2. 可以在worker中使用importScripts这个方法来加载javascript脚本
    3. 在worker中可以使用setTimeout, setInterval等方法
    4. 可以进行异步请求(不过没有ajax的效率高, 所以如果是异步请求还是不建议单独开个线程)
    5. 在worker中不能跨域加载脚本, 不能访问dom
    6. web worker分为专用线程和共享线程, 共享线程可以实现跨标签通信

21. 聊聊事件循环
    > 浏览器里除了JS线程以外还有很多其他的线程比如计时器线程网络线程, 当JS主线程遇到异步任务时会交给对应的线程处理, 并注册回调, 当异步任务完成可以触发回调时会将回调放入事件队列中排队（等待JS主线程忙完手头的活来找他们）, 事件队列分为宏任务和微任务, 比如setTimeout, setInterval会进入宏任务, 而Promise, MutationObserver等会进入微任务, 当JS主线程的同步代码执行完毕, JS引擎进入闲置状态时, 会查看事件队列中有没有等待执行的异步回调, 如果有, 则优先把从微队列中排队的人拎出来挨个执行, 然后再把宏队列中排队的人拎出来挨个执行, 都执行完毕以后继续观测有没有需要等待的人, 有的话则继续循环此操作, 这整个过程就叫做事件循环 event loop

22. Set和WeakSet的区别是什么？
    > Set会影响垃圾回收, WeakSet不会, 举个例子, 如果我们往Set中存储了一个变量obj, 然后将这个obj置为null, 此时访问Set, 还是可以看到这个obj实际对应的地址, 而如果我们使用WeakSet, 随着obj被置为null, 则会直接无视WeakSet的使用, 回收该内存地址, 此时访问WeakSet, 该obj对应的地址也没了, 我们可以通过观测WeakSet来检查某些对象是否已经被回收
    > 同时WeakSet没有size属性, 不可遍历(也没有forEach方法), 只能添加对象

23. Map和WeakMap的区别是什么？
    > WeakMap键存储的地址不会影响垃圾回收, 且WeakMap的键只能是对象

24. Symbol有了解过吗？ Symbol和Symbol.for的区别是什么?
    > Symbol是es6新增的类型, 主要是用于帮助对象构建私有属性用的, 调用Symbol每次都会得到一个完全不一样的符号, 就算传递给Symbol的参数description一样, 也会得到完全不一样的符号, 但是Symbol.for不是这样的, Symbol.for如果参数description给的是一样的, 则会得到两个同样的Symbol符号