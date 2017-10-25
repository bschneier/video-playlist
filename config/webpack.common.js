const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    'vendor': path.resolve('app/vendor.ts'),
    'app': path.resolve('app/main.ts')
  },
  target: 'web',
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: path.resolve('app'),
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: path.resolve('config/tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        include: path.resolve('app'),
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpg|gif|png)$/,
        include: path.resolve('media'),
        loader: 'file-loader',
        options: {
          name: 'media/images/[name].[hash].[ext]'
        }
      },
      {
        test: /\.mp4$/,
        include: path.resolve('media/videos'),
        loader: 'file-loader',
        options: {
          name: 'media/videos/[name].[hash].[ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor']
    })
  ]
};
