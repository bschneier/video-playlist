const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.ts$/,
        include: path.resolve('src'),
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
        test: /.ts$/,
        loader: 'istanbul-instrumenter-loader',
        include: path.resolve(__dirname, '../src/'),
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
