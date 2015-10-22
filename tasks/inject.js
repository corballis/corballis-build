'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var errorHandling = require('../error-handling');
var gulpPlugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');
var _ = require('lodash');

gulp.task('inject', ['scripts', 'styles'], function () {

  function karmaTransform(filepath, file, i, length) {
    return '\'' + filepath + '\'' + (i + 1 < length ? ',' : '');
  }

  var injectStyles = gulp.src([
    path.join(config.paths.tmp, config.paths.serveCss),
    path.join('!' + config.paths.tmp, config.paths.vendorCss)
  ], { read: false });

  var injectScripts = gulp.src([
      config.paths.scripts,
      path.join('!' + config.paths.specs)
    ])
    .pipe(gulpPlugins.angularFilesort()).on('error', errorHandling.errorHandler('AngularFilesort'));

  var scriptsInjectOptions = {
    ignorePath: [path.join(config.paths.tmp, config.paths.serve), config.paths.app],
    addRootSlash: false
  };

  var stylesInjectOptions = {
    ignorePath: [path.join(config.paths.tmp, config.paths.serve)],
    addRootSlash: false
  };

  var karmaScriptsInjectOptions = {
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false,
    transform: karmaTransform
  };

  var karmaHelperScripts = gulp.src([
    path.join(config.paths.testHelpers, '/*.js'),
    path.join(config.paths.testHelpers, config.paths.unit, '/*.js')
  ]);

  var karmaHelperScriptsInjectOptions = {
    starttag: '// inject:helpers',
    endtag: '// endinject',
    addRootSlash: false,
    transform: karmaTransform
  };

  var karmaSpecs = gulp.src(config.paths.unitTests);

  var karmaSpecsInjectOptions = {
    starttag: '// inject:specs',
    endtag: '// endinject',
    addRootSlash: false,
    transform: karmaTransform
  };

  var karmaFilter = gulpPlugins.filter('**/karma.conf.js', {restore: true});
  var htmlFilter = gulpPlugins.filter('*.html', {restore: true});

  return gulp.src([path.join(config.paths.app, '/*.html'), path.join(__dirname, '/../karma.conf.js')])
    .pipe(htmlFilter)
    .pipe(gulpPlugins.inject(injectStyles, stylesInjectOptions))
    .pipe(gulpPlugins.inject(injectScripts, scriptsInjectOptions))
    .pipe(wiredep(_.extend({}, config.wiredep)))
    .pipe(gulp.dest(path.join(config.paths.tmp, config.paths.serve)))
    .pipe(browserSync.stream({once: true}))
    .pipe(htmlFilter.restore)
    .pipe(karmaFilter)
    .pipe(gulpPlugins.inject(injectScripts, karmaScriptsInjectOptions))
    .pipe(gulpPlugins.inject(karmaHelperScripts, karmaHelperScriptsInjectOptions))
    .pipe(gulpPlugins.inject(karmaSpecs, karmaSpecsInjectOptions))
    .pipe(wiredep(_.extend({}, config.wiredep, {devDependencies: true, ignorePath: '../../'})))
    .pipe(gulp.dest(path.join(config.paths.tmp, config.paths.karma)))
    .pipe(karmaFilter.restore)
});
