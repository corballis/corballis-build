'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('other', ['image-revisions'], function () {
  var fileFilter = gulpPlugins.filter(function (file) {
    return file.stat.isFile();
  });

  var excludedFiles = config.templateCache.enabled ? '/**/*.{html,css,js,scss}' : '/**/*.{css,js,scss}';
  var htmlFilter = gulpPlugins.filter('**/*.html', {restore: true});

  return gulp.src([
      path.join(config.paths.app, '/**/*'),
      path.join('!' + config.paths.app, excludedFiles),
      path.join('!' + config.paths.images),
      path.join('!' + config.paths.rootHtmls),
      path.join('!' + config.paths.translations)
    ])
    .pipe(fileFilter)
    .pipe(htmlFilter)
    .pipe(gulpPlugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(config.paths.dist, '/')));
});