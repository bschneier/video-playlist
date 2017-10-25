const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: path.resolve('app'),
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: path.resolve('config/tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.s?css$/,
        include: path.resolve('app'),
        loaders: ['css-loader', 'sass-loader']
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
      },
      {
        test: /.ts$/,
        loader: 'istanbul-instrumenter-loader',
        include: path.resolve(__dirname, '../app/'),
        exclude: [/.spec.ts/],
        enforce: 'post',
        options: {
          esModules: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
          emitErrors: true
      }
    })
  ]
};
