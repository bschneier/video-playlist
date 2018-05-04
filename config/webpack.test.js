const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve('app'),
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: path.resolve('tsconfig.json') }
          },
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
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
        test: /\.(jpg|gif|png|mp4|woff|eot|ttf|svg)$/,
        include: path.resolve('assets'),
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        }]
      },
      {
        test: /.ts$/,
        use: [{
          loader: 'istanbul-instrumenter-loader',
          options: {
            esModules: true
          }
        }],
        include: path.resolve(__dirname, '../app/'),
        exclude: [/.spec.ts/],
        enforce: 'post'
      },
      // Ignore warnings about System.import in Angular
      { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.resolve(__dirname, '../app')),
    new webpack.LoaderOptionsPlugin({
      options: {
          emitErrors: true
      }
    })
  ]
};
