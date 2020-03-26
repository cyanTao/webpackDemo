  const path = require('path');
  // html的插件
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  // 清理打包后项目的插件
  const {
    CleanWebpackPlugin
  } = require('clean-webpack-plugin');

  module.exports = {
    mode: 'production',
    entry: {
      app: './src2/index.js',
      print: './src2/print.js',
      another: './src2/another-module.js'
    },
    plugins: [
      //清理打包项目
      new CleanWebpackPlugin(),
      // 设置打包后html
      new HtmlWebpackPlugin({
        template: './public/index.html'
      }),
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve('dist')
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            // 生成的共享模块bundle的名字
            name: "commons",
            chunks: "initial",
            minChunks: 2
          }
        }
      }
    }
  };