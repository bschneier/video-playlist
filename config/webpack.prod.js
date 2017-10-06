const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const commonConfig = require('./webpack.common');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('src/index.html'),
      favicon: path.resolve('media/favicon.ico'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        html5: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        useShortDoctype: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ]
});
