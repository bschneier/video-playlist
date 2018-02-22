const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve('app'),
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    port: 3002,
    overlay: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('app/index.html'),
      favicon: path.resolve('assets/icons/video-playlist-iphone-120.png')
    })
  ]
});
