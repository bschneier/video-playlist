const webpack = require('webpack');
const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
  entry: {
    'vendor': path.resolve('app/vendor.ts'),
    'app': path.resolve('app/main.ts')
  },
  target: 'web',
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
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href']
          }
        }
      },
      {
        test: /manifest.json$/,
        type: 'javascript/auto',
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'manifest.json'
            }
          },
          'app-manifest-loader'
        ]
      },
      // Ignore warnings about System.import in Angular
      { test: /[\/\\]@angular[\/\\].+\.js$/, parser: { system: true } }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.ContextReplacementPlugin(/(.+)?angular(\\|\/)core(.+)?/, path.resolve(__dirname, '../app')),
  ],
  stats: {
    assets: true,
    builtAt: false,
    chunks: true,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    hash: false,
    modules: false,
    timings: false,
    version: false,
    warnings: true
  }
};
