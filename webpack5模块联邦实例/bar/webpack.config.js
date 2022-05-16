const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 3002,
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new ModuleFederationPlugin({
            remotes: {
                home: "home@http://localhost:8080/home-entry.js"
            }
        })
    ]
}