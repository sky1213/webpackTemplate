/**
 * @file webpack(4.x)配置文件
 * @author sky 2018.06.05
 */

// 引入path功能模块
var path = require('path');
// 导入webpack
var webpack = require('webpack');
// 引入html模版生成插件 每次编译后自动生成一个html文件，并将编译后的js文件使用script标签引入到页面
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 资源拷贝插件
var CopyWebpackPlugin = require('copy-webpack-plugin');

// 打包配置
var config = {
    // 添加下面的配置，在打包文件时，不会将react打包进bundle文件，需要在页面上单独再引入react才能用，一般开发第三方库时使用
    // externals: { 'react': 'react' },
    // 配置入口文件
    entry: {
        'test1/index': './src/test1/index.js'
    },

    // 文件输出配置 文件名、文件保存路径
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // 配置开发服务器，不要写colors:true，progress:true等，webpack2.x已不支持这些
    devServer: {
        historyApiFallback: true,
        inline: true,//注意：不写hot: true，否则浏览器无法自动更新；
    },

    module: {
        rules: [
            // 配置loader 使用babel-loader 转换es6、react代码
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                }
            },
            // 解析js文件中导入的css文件
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            // 解析图片，limit参数指定当引用的图片小于8k则将图片转换成base64字符串，如果大于8k将图片拷贝到输出目录‘images/[hash:8].[name].[ext]’中    
            // {
            //     test: /\.(png)|(jpg)|(jpeg)|(gif)$/,
            //     loader: "url-loader", //?limit=8192&name=images/[hash:8].[name].[ext]
            //     options: {
            //         limit: '8192',
            //         name: 'images/[hash:8].[name].[ext]',
            //         publicPath: '../'
            //     }
            // }
        ]
    },
    // 抽取公共文件、第三方库文件、webpack运行时文件
    optimization: {
        splitChunks: {
            chunks: 'initial', // 只对入口文件处理
            cacheGroups: {
                vendor: { // split `node_modules`目录下被打包的代码到 `public/vendor.bundle.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
                    test: /node_modules\//,
                    name: 'public/vendor',
                    priority: 10,
                    enforce: true
                },
                commons: { // split `common`和`components`目录下被打包的代码到`public/commons.bundle.js && .css`
                    test: /common\/|components\//,
                    name: 'public/commons',
                    priority: 10,
                    enforce: true
                }
            }
        },
        // webpack运行时文件，单独抽取
        runtimeChunk: {
            name: 'public/manifest'
        }
    },
    // 插件配置
    plugins: [
        // 将test2文件加下面的 普通html页面资源拷贝到输出目录
        new CopyWebpackPlugin([
            { from: path.join(__dirname,'src/test2'), to:  path.join(__dirname,'dist/test2') ,toType: "dir",force: true}
        ])
    ]
};

// 动态生成页面
var eList = config.entry;
for (const page in eList) {
    if (eList.hasOwnProperty(page)) {
        const htmlPlugin = new HtmlWebpackPlugin({
            filename: `${page}.html`,
            template: './src/template.html',
            chunks: ['public/manifest', 'public/vendor','public/commons' , page],
            hash: true, // 为静态资源生成hash值
            // minify: true,
            // xhtml: true,
        });
        config.plugins.push(htmlPlugin);
    }
}

// 导出功能配置
module.exports = config;