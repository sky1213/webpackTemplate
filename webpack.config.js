/**
 * @file webpack配置文件
 * @author sky 2017.08.01
 */

// 引入path功能模块
var path = require('path');
// 导入webpack
var webpack=require('webpack');
// 引入html模版生成插件 每次编译后自动生成一个html文件，并将编译后的js文件使用script标签引入到页面
var HtmlWebpackPlugin = require('html-webpack-plugin');


// 导出功能配置
module.exports = {
    // 配置入口文件
    entry: './src/index.js',

    // 文件输出配置 文件名、文件保存路径
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // 配置开发服务器，不要写colors:true，progress:true等，webpack2.x已不支持这些
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；
    },

    // 配置loader 使用babel-loader 转换es6、react代码
    module: {
        rules:[
        {
            test: /\.js$/,
            use: [
                { loader: 'babel-loader'}
            ]
        }
        ]
    },

    // 插件配置
    plugins: [
            new HtmlWebpackPlugin({
                title: "webpack template" // 指定生成的html文件的title属性值
            }),
        
            new webpack.HotModuleReplacementPlugin()
    ]
};