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
    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    webpack: require('./webpack.test.js'),
    webpackServer: {
      noInfo: true
    },
    coverageIstanbulReporter: {      
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib 
      reports: ['html', 'lcovonly', 'text-summary'],      
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name 
      dir: path.join(__dirname, '../coverage'),  
      // if using webpack and pre-loaders, work around webpack breaking the source path 
      fixWebpackSourcePaths: true,
      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped` 
      skipFilesWithNoCoverage: true,      
      // Most reporters accept additional config options. You can pass these through the `report-config` option 
      'report-config': {      
        // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137 
        html: {
          // outputs the report in ./coverage/html 
          subdir: 'html'
        }
      },      
      // enforce percentage thresholds 
      // anything under these percentages will cause karma to fail with an exit code of 1 if not running in watch mode 
      thresholds: {
        emitWarning: true, // set to `true` to not fail the test command when thresholds are not met 
        global: { // thresholds for all files 
          statements: 75,
          lines: 75,
          branches: 100,
          functions: 100
        },
        each: { // thresholds per file 
          statements: 75,
          lines: 75,
          branches: 100,
          functions: 100
        }
      }      
    }
  });
};