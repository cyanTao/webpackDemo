const merge = require('webpack-merge');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  output: {
    filename: '[name].[chunkhash].js',
    //  publicPath: '/'
  },
});