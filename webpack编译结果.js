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