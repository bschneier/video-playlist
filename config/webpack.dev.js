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
    overlay: true,
    stats: {
      assets: false,
      builtAt: false,
      chunks: false,
      entrypoints: false,
      errors: true,
      errorDetails: true,
      hash: false,
      modules: false,
      timings: false,
      version: false,
      warnings: true
    }
  },
  mode: 'development',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader', options: { config: { path: path.resolve('config/postcss.config.js') } } },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|gif|png|mp4|woff|eot|svg|ttf)$/,
        include: path.resolve('assets'),
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve('app/index.html')
    })
  ]
});
