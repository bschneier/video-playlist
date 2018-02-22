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
            options: { configFileName: path.resolve('tsconfig.json') }
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
        loaders: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|gif|png|mp4|woff|eot|ttf|svg)$/,
        include: path.resolve('assets'),
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[hash].[ext]'
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
