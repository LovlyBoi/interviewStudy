# webpack

1. 介绍一下webpack scope hoisting
    > scope hoisting是webpack的内置优化, 它是针对模块的优化, 在生产环境打包时会自动开启, 在未开启scope hoisting时, webpack会将每个模块的代码放置在一个独立的函数环境中, 这样是为了保证模块的作用域互不干扰
    > 而scope hoisting的作用恰恰相反, 是把多个模块的代码合并到一个函数环境中执行, 在这一过程中, webpack会按照正确的顺序去合并模块代码, 同时对涉及的标识符做以适当处理以避免重名。
    > 这样做的好处是减少了函数的调用, 对运行效率有一定的提升, 也降低了打包的体积
    > 但是scope hoisting的启动是有前提的, 如果是遇到了某些模块多次被其他模块引用, 或者使用了动态导入的模块, 再或者是非esm的模块, 都不会有scope hoisting

2. webpack5主要更新了什么
    > webpack5更新的小东西还蛮多的, 我记得一些
    - 清除输出目录
        > 过去我们清除输出目录, 需要使用html-clean-webpack-plugin, 而现在我们只需要在output里配置clean 为true就好了
        ```js
        output: {
            clean: true
        }
        ```
    - top level await
        > 因为目前官方正在打算考虑将top level await加入es标准, 这个东西主要是可以允许你不在async函数中使用await, 而webpack5已经率先支持了, 我们只需要配置experiments中的topLevelAwait为true就好了
        ```js
        module.exports = {
            experiments: {
                topLevelAwait: true
            }
        }
        ```
    - 打包体积优化
        > webpack5对模块合并, 作用域提升, treeshaking的处理变得更加智能了

    - 打包缓存开箱即用
        > 在webpack4中, 需要使用cache-loader缓存打包结果以优化之后的打包性能, 在webpack5中默认就开启了打包缓存, 无须再安装cache-loader, 默认情况下, webpack5是将模块的打包结果缓存到内存中, 可以通过cache配置进行更改
        ```js
        module.exports = {
            cache: {
                type: "fileSystem", // 缓存的类型, 支持: memory, fileSystem
                cacheDirectory: path.resolve(__dirname, "node_modules/.cache/webpack"), // 如果缓存类型是fileSystem可以通过该属性设置缓存目录, 默认的缓存目录就是node_modules/.cache/webpack
            }
        }
        ```
    
    - 资源模块
        > 在webpack4中, 针对资源型文件我们通常使用file-loader, url-loader, raw-loader进行处理, 由于大部分前端项目都会用到资源型文件, 因此webpack5原生支持了资源型模块
        ```js
        module.exports = {
            output: {
                filename: "main.js",
                path: path.resolve(__dirname, "./dist"),
                assetModuleFilename: "assets/[hash:5][ext", // 这个配置就是用来保存自定义资源保存的目录
            },
            module: {
                rules: [
                    {
                        test: /\.png$/,
                        type: "asset/resource", // 作用类似于file-loader
                    },
                    {
                        test: /\.jpg/,
                        type: "asset/inline", // 作用类似于url-loader
                    }
                ]
            }
        }
        ```
    - 模块联邦
        模块联邦主要用于微前端的架构体系中, 他允许你在两个不同的工程中采用公用模块以及进行模块复用
        ```js
        // project a webpack config
        const { ModuleFederationPlugin } = require("webpack").container;
        module.exports = {
            plugins: [
                new ModuleFederationPlugin({
                    name: "module", // 你要暴露出去的公用模块的名称
                    filename: "module-entry.js", // 你暴露出去的公用模块最终会打包到一个js文件里, 你可以配置这个js文件名
                    exposes: {
                        // 具体暴露的模块
                        "./cloneDeep": "./src/cloneDeep.js"
                    }
                })
            ]
        }
        ```

        ```js
        // project b webpack config
        module.exports = {
            plugins: [
                new ModuleFederationPlugin({
                    remotes: {
                        moduleA: "module@http:localhost:8080/cloneDeep.js", // 就引入了, 然后导入的时候直接module/cloneDeep就好了
                    }
                })
            ]
        }
        ```
3. webpack编译结果有去看过吗？
    > 了解过的, webpack会将分析完的模块全部放在一个对象中, 对象中的key为模块的路径, 值是一个函数, 函数体基本上是该模块的代码, 然后不是在模块内部有require, module, module.exports什么的吗, 都会通过参数传递给这个函数, 然后会开启一个立即执行函数, 将这个模块集合的对象作为参数传递给立即执行函数, 然后再立即执行函数内部会构造一个require函数出来, 该require函数会在内部构造module, exports等属性, require会通过传递进来的模块路径去从modules集合里找到对应的函数, 执行并将module, exports等属性作为参数传递进去, 当对应函数执行完毕, module.exports也有值了, 然后整个require函数返回该对象即可, 在这里有一个细节, 每一个模块函数的函数体最好使用eval去执行, 并打上source-map的注释, 这样在打包后如果报错了, 依然可以链接到你这个模块的地址, webpack也是这样做的, 否则报错的路径就是一个虚拟的浏览器环境

    ```js
    (function (modules) {
        function __webpack_require(moduleId) {
                const module = {
                    exports: {}
                }
                const fn = modules[moduleId];
                fn(module, module.exports, __webpack_require);
                return module.exports;
            }
            __webpack_require("./src/index.js");
        })({
            "./src/a.js": function (module, exports, __webpack_require) {
                console.log("this is a module");
                module.exports = {
                    a: 10,
                    b: 20
                }
            },
            "./src/index.js": function (module, exports, __webpack_require) {
                console.log("this is index page");
                const obj = __webpack_require("./src/a.js");
                console.log("obj", obj);
            }
        })
    ```