process.env.NODE_ENV = 'development'
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const webpack = require('webpack');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.NamedModulesPlugin(), // 开发环境
  ],
  devServer: {
    port: '8081',
    proxy: {
      '/': {
        target: 'http://www.ivvmedia.cn',
        pathRewrite: {
          "^/": "/"
        }
      }
    }
  }
});