const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    mode: "development",
    devServer: {
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            name: "home", // 联邦模块的名称, 该名称将成为一个全局变量, 通过该变量可以获得当前联邦的所有模块
            filename: "home-entry.js", // 模块联邦生成的文件名, 全部变量置入到该文件中
            exposes: { // 当前联邦暴露的所有模块
                "./deepClone": "./src/deepClone.js"
            }
        })
    ],

}