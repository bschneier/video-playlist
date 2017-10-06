const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve('dist'),
    historyApiFallback: true,
    hot: true,
    noInfo: false,
    port: 3002
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
      favicon: path.resolve('media/favicon.ico')
    }),
    new OpenBrowserPlugin({ url: 'http://localhost:3002'})
  ]
});
