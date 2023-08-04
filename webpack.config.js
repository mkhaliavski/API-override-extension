// noinspection NpmUsedModulesInstalled

const path = require("path");

const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin")

module.exports = () => ({
    mode: "development",
    entry: {
        main: "./src/entry/main.tsx",
        sidebar: "./src/entry/sidebar.tsx"
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".html"]
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        hot: true,
        port: 8080,
        historyApiFallback: {
            rewrites: [
                {from: '/main', to: '/main.html'},
                {from: '/sidebar', to: '/sidebar.html'},
                {from: '/', to: '/main.html'},
            ]
        }
    },
    optimization: {
        providedExports: true,
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false
            })
        ],
        usedExports: true
    },
    plugins: [
        new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        new HtmlWebpackPlugin({
            template: "./src/template.ejs",
            title: "Main Panel",
            filename: "main.html",
            chunks: ["main"]
        }),
        new HtmlWebpackPlugin({
            template: "./src/template.ejs",
            title: "Sidebar Panel",
            filename: "sidebar.html",
            chunks: ["sidebar"],
        }),
        new CopyPlugin({
            patterns: [
                {from: "./src/extension/**/*", to: "[name][ext]"}
            ]
        })
    ]
})

