'use strict';

exports.paths = {
  app: 'app',
  dist: 'dist',
  tmp: '.tmp',
  reports: 'reports',
  scripts: 'app/**/*.js',
  sassStyles: 'app/**/*.scss',
  cssStyles: 'app/**/*.css',
  htmls: 'app/**/*.html',
  images: 'app/images/**/*',
  rootHtmls: 'app/*.html',
  indexCss: 'app/index.scss',
  serveCss: '/serve/app/**/*.css',
  vendorCss: '/serve/app/vendor.css',
  specs: 'app/**/specs/**/*.js',
  e2eSpecs: 'app/**/specs/e2e/**/*.js',
  unitTests: 'app/**/specs/unit/**/*.js',
  serve: '/serve',
  serveApp: '/serve/app/',
  serveHtmls: '/serve/app/**/*.html',
  partials: '/partials/',
  karma: '/karma',
  fonts: '/fonts/',
  distImages: '/images',
  testHelpers: 'test-helpers',
  unit: 'unit',
  e2e: 'e2e',
  packages: [
    'bower.json',
    'package.json'
  ]
};

exports.templateCache = {
  enabled: false,
  module: 'gulpTemplates',
  filename: 'templateCacheHtml.js'
};

exports.proxy = {
  springHost: 'http://localhost'
};

exports.scssOrder = {
  before: [],
  after: []
};

/**
 *  Wiredep is the lib which injects bower dependencies in your project
 *  Mainly used to inject script tags in the index.html but also used
 *  to inject css preprocessor deps and js files in karma
 */
exports.wiredep = {
  exclude: [/bootstrap.js$/, /bootstrap-sass-official\/.*\.js/, /bootstrap\.css/],
  directory: 'bower_components'
};

exports.protractor = {

  framework: 'jasmine2',

  multiCapabilities: [
//    {
//      browserName: 'firefox'
//    },
    {
      browserName: 'chrome'
    }
  ],
  maxSessions: 1,

  baseUrl: 'http://localhost:3001',

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};