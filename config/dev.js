const merge = require('webpack-merge');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const common = require('./webpack.config.js');
const utils = require('./utils');

// host
const host = '0.0.0.0'

let port = '8081'



module.exports = new Promise(async resolve => {

  // 获取目前没被占用的port
  port = await utils.getPort(port)

  const config = merge(common, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new webpack.NamedModulesPlugin(), // 开发环境
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `Your application is running here:`,
            `     http://localhost:${port}`,
            `     http://${utils.getHost()}:${port}`
          ],
        },
        onErrors: utils.createNotifierCallback()
      }),
      ...(utils.useFastDev ? [new utils.fastDev()] : [])
    ],
    devServer: {
      quiet: true, //设为true，禁止显示devServer的console信息
      host,
      port,
      proxy: {
        '/': {
          target: 'http://www.ivvmedia.cn',
          pathRewrite: {
            "^/": "/"
          }
        }
      }
    }
  })

  resolve(config)
})