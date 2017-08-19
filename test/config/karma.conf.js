// Karma configuration
// Generated on Sat Aug 19 2017 11:25:27 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        '../../public/assets/js/lodash.core.min.js',
        '../../public/assets/js/moment.min.js',
        '../../public/assets/js/angular.min.js',
        '../../public/assets/js/angular.min.js',
        '../../public/assets/js/angular-resource.js',
        '../../public/assets/js/angular-route.js',
        '../../public/assets/js/angular-datepicker.min.js',
        '../../public/assets/js/angular-mocks.js',
        '../../public/app/app.js',
        '../../public/app/config/config.js',
        '../../public/app/filters/readableDate.js',
        '../../public/app/services/voyageService.js',
        '../../public/app/controllers/homeController.js',
        '../../public/app/controllers/voyagesController.js',
        '../unit/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
