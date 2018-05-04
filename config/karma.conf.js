const path = require('path');

module.exports = (config) => {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'karma.entry.js'
    ],
    preprocessors: {
      'karma.entry.js': ['webpack']
    },
    reporters: ['progress', 'html', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    webpack: require('./webpack.test.js'),
    webpackServer: {
      noInfo: true,
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
    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
      reports: ['html'],
      dir: path.join(__dirname, '../coverage'),
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      thresholds: {
        emitWarning: true,
        global: {
          statements: 75,
          lines: 75,
          branches: 75,
          functions: 75
        },
        each: {
          statements: 75,
          lines: 75,
          branches: 75,
          functions: 75
        }
      }
    },
    htmlReporter: {
      outputFile: path.join(__dirname, '../test-results/report.html'),
      pageTitle: 'Video Playlist Tests',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: false
    }
  });
};