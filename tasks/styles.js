'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var errorHandling = require('../error-handling');
var browserSync = require('browser-sync');
var gulpPlugins = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var series = require('stream-series');
var _ = require('lodash');

gulp.task('styles', function () {
  var sassOptions = {
    style: 'expanded'
  };

  var sassFiles = [
    config.paths.sassStyles,
    '!' + config.paths.indexCss
  ];

  var beforeSassFiles = _.map(config.scssOrder.before, function (path) {
    return config.paths.app + '/' + path;
  });

  var afterSassFiles = _.map(config.scssOrder.after, function (path) {
    return config.paths.app + '/' + path;
  });

  _.forEach(beforeSassFiles, function (path) {
    sassFiles.push('!' + path);
  });

  _.forEach(afterSassFiles, function (path) {
    sassFiles.push('!' + path);
  });

  var beforeSassStream = gulp.src(beforeSassFiles, {read: false});
  var afterSassStream = gulp.src(afterSassFiles, {read: false});
  var injectFiles = gulp.src(sassFiles, { read: false });

  var injectOptions = {
    transform: function (filePath) {
      filePath = filePath.replace('/' + config.paths.app + '/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// injector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src([config.paths.indexCss])
    .pipe(gulpPlugins.inject(series(beforeSassStream, injectFiles, afterSassStream), injectOptions))
    .pipe(wiredep(_.extend({}, config.wiredep)))
    .pipe(gulpPlugins.sourcemaps.init())
    .pipe(gulpPlugins.sass(sassOptions)).on('error', errorHandling.errorHandler('Sass'))
    .pipe(gulpPlugins.autoprefixer()).on('error', errorHandling.errorHandler('Autoprefixer'))
    .pipe(gulpPlugins.sourcemaps.write())
    .pipe(gulp.dest(path.join(config.paths.tmp, config.paths.serveApp)))
    .pipe(browserSync.stream({once: true}));
});
