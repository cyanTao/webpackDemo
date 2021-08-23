const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html的插件
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');//被移除
const webpack = require('webpack');
// 清理打包后项目的插件
// const {
//   CleanWebpackPlugin
// } = require('clean-webpack-plugin');

const outputPath = 'dist'

module.exports = {
  //如果所有代码都不包含副作用，可在package.json设置sideEffects为 false，来告知 webpack，它可以安全地删除未用到的 export 导出。
  // mode: 'production', //环境
  entry: {
    index: './src/index.js',
    // index: './src2/index.ts',
    // polyfills: './src/polyfills.js',
    vendor: [
      'lodash'
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  // devtool: 'source-map', //用于将编译后的代码映射回原始源代码,帮助开发时更容易地追踪错误和警告,不要用于生产环境
  // 修改配置文件，告诉开发服务器(dev server)，在哪里查找文件
  devServer: {
    contentBase: outputPath,
    hot: true
  },
  plugins: [
    // new UglifyJSPlugin({
    //   sourceMap: true
    // }), //webpack 4版本之后被移除了，使用config.optimization.splitChunks来代替
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production') //无法在构建脚本 webpack.config.js 中，将 process.env.NODE_ENV 设置为 "production",所以加个 JSON.stringify
    // }), //环境变量配置
    // new CleanWebpackPlugin(), //清理打包项目文件夹
    new HtmlWebpackPlugin({
      template: './public/index.html' // 设置打包后html的模板
    }),

    /* 此处插件作用: 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改。因此通过实现以上步骤，利用客户端的长效缓存机制，可以通过命中缓存来消除请求，并减少向服务器获取资源，同时还能保证客户端代码和服务器端代码版本一致。这可以通过使用新的 entry(入口) 起点
    参考官网文章: https://www.webpackjs.com/guides/caching/#%E6%8F%90%E5%8F%96%E6%A8%A1%E6%9D%BF-extracting-boilerplate- */
    // new webpack.NamedModulesPlugin(), // 开发环境
    // new webpack.HotModuleReplacementPlugin(), //开发环境
    // new webpack.HashedModuleIdsPlugin(),// 生产环境
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(outputPath),
  },
  optimization: {
    // main bundle 会随着自身的新增内容的修改，而发生变化。
    // vendor bundle 会随着自身的 module.id 的修改，而发生变化。
    // manifest bundle 会因为当前包含一个新模块的引用，而发生变化。
    splitChunks: {
      // name: 'vendor',
      cacheGroups: {
        name: false,
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'common',
          chunks: 'all',
          priority: -10,
        },
        echarts: {
          test: function (module) {
            if (module.resource) {
              const include = [/[\\/]node_modules[\\/](echarts)/].some(reg => {
                return reg.test(module.resource);
              });
              return include;
            }
            return false;
          },
          name: 'echartMode',
          chunks: 'all'
        },
      },
    }
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['.tsx', '.ts', '.js']
  }
};