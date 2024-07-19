const packageConfig = require('../package.json')
const path = require('path')
const os = require('os');
const portfinder = require('portfinder')

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()
    if (error.webpackError) {
      console.error(error.webpackError)
    } else {
      console.error(error.message)
    }
    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

exports.getHost = () => {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

exports.getPort = port => new Promise((resolve, reject) => {
  portfinder.basePort = port
  portfinder.getPort((err, newPort) => {
    if (err) {
      reject(err)
    } else {
      resolve(newPort)
    }
  })
})

// fastDev
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env.development')
});
const {
  ROOT_PATH,
  INCLUDE_PATH
} = process.env
const useFastDev = ROOT_PATH && INCLUDE_PATH

exports.useFastDev = useFastDev

exports.fastDev = function () {
  function formatPath(dirname) {
    // 以/开头
    if (/^\//.test(dirname)) {
      dirname = dirname.slice(1)
    }
    // 以/结尾
    if (/\/$/.test(dirname)) {
      dirname = dirname.slice(-1) + '\/?'
    }
    // 没有.xxx后缀
    else if (!/\.[a-zA-Z]+$/.test(dirname)) {
      dirname = dirname + '\/?'
    }
    // 以.js和.vue结尾的, 可以省略后缀, 这里直接去掉避免代码没写后缀导致识别不出
    else if (/\.(js|vue)$/.test(dirname)) {
      dirname = dirname.replace(/(.*)\.(js|vue)/, '$1')
    }
    return dirname
  }
  const reg = new RegExp(ROOT_PATH + '/' + INCLUDE_PATH.split(',').map(dirname => `(?!${formatPath(dirname)})`).join(''))
  console.log(reg)
  return new webpack.IgnorePlugin(reg)
}