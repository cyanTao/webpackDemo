const merge = require('webpack-merge');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.config');

const config = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ],
  output: {
    filename: '[name].[chunkhash].js',
    //  publicPath: '/'
  }
}


if (process.env.NODE_ANALYZE == 'true') {
  config.plugins.push(
    new BundleAnalyzerPlugin({
      generateStatsFile: false,
      statsOptions: {
        source: false
      }
    })
  )
}

module.exports = merge(common, config);