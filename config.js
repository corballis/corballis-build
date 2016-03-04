'use strict';

exports.paths = {
  // Location of the main application files
  app: 'app',
  // Location where all the optimized resources are copied for the production build
  dist: 'dist',
  // Temporary folder used by the development environment and the build system
  tmp: '.tmp',
  // Location of the Plato and coverage reports
  reports: 'reports',
  // Glob pattern for the application sources
  scripts: 'app/**/*.js',
  // Glob pattern for the application SASS styles
  sassStyles: 'app/**/*.scss',
  // Glob pattern for the application CSS styles
  cssStyles: 'app/**/*.css',
  // Glob pattern for the HTML files
  htmls: 'app/**/*.html',
  // Glob pattern for the image files
  images: 'app/images/**/*',
  // Glob pattern for the translation files
  translations: 'app/languages/**/*',
  // Glob pattern for the root HTML files. These files will be processed by the html task
  rootHtmls: 'app/*.html',
  // Main SASS file
  indexCss: 'app/index.scss',
  // Location from where the CSS files are served in development mode
  serveCss: '/serve/app/**/*.css',
  // CSS file for the vendor stylesheets
  vendorCss: '/serve/app/vendor.css',
  // Glob pattern for all test files
  specs: 'app/**/specs/**/*.js',
  // Glob pattern for page objects of e2e test
  e2eSpecsWithoutPageObjects: 'app/**/specs/e2e/**/!(*-page).js',
  // Glob pattern for e2e tests
  e2eSpecs: 'app/**/specs/e2e/**/*.js',
  // Glob pattern for unit tests
  unitTests: 'app/**/specs/unit/**/*.js',
  // Temporary folder to store resources in for the development mode
  serve: '/serve',
  // Location of the application files in development mode
  serveApp: '/serve/app/',
  // Glob pattern for HTML files served in development mode
  serveHtmls: '/serve/app/**/*.html',
  // Location of template partials
  partials: '/partials/',
  // Location of the generated karma configuration file
  karma: '/karma',
  // Location of the fonts in the production build
  fonts: '/fonts/',
  // Location of the images in the production build
  distImages: '/images',
  // Location of the translation files in the production build
  distTranslations: '/languages',
  // Location of the test helper files
  testHelpers: 'test-helpers',
  unit: 'unit',
  e2e: 'e2e',
  // Package files to be updated by the bump task
  packages: [
    'bower.json',
    'package.json'
  ]
};

// Configuration of the Angular template cache.
exports.templateCache = {
  // Enable the generation of an Angular module that adds all HTML templates to Angular's $templateCache.
  enabled: false,
  // Name of the template module
  module: 'gulpTemplates',
  // Name of the template module file
  filename: 'templateCacheHtml.js'
};

// HTTP proxy configuration
exports.proxy = {
  // URL of the server side part of the application
  springHost: 'http://' + process.env.HOST_IP
};

/**
 * If the auto import order of the scss files is not appropriate, you can move some files up to the top or down to the bottom.
 */
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

// Protractor configuration. Please refer to the Protractor reference documentation.
exports.protractor = {

  framework: 'jasmine2',

  maxSessions: 1,

  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000
  }
};