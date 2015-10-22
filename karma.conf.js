'use strict';

var path = require('path');

module.exports = function (config) {
  'use strict';

  config.set({

    basePath: path.resolve('.'),

    frameworks: [
      'jasmine'
    ],

    files:
      [
        // bower:js
        // endbower
      ].concat(
      [
        // inject:app
        // endinject
      ]).concat(
      [
        // inject:helpers
        // endinject
      ]).concat(
      [
        // inject:specs
        // endinject
      ]),

    exclude: [
      'bower_components/ng-corballis/src/ng-init/init.js'
    ],

    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: process.env.JENKINS === '1' ? ['PhantomJS'] : ['Chrome', 'Firefox'],

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    preprocessors: {
      'app/**/!(*-spec)+(.js)': 'coverage'
    },

    reporters: ['progress', 'coverage'],

    coverageReporter: {
      type: 'html',
      dir: 'reports/coverage/'
    }
  });
};
