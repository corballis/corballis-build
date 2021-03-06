'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['ts-compile-emit', 'inject', 'import-translations-from-bower'], function () {

  gulp.watch([config.paths.rootHtmls, 'bower.json'], ['inject']);

  gulp.watch([
    config.paths.cssStyles,
    config.paths.sassStyles
  ], function (event) {
    if (isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(config.paths.scripts, function (event) {
    if (isOnlyChange(event)) {
      gulp.start('scripts');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(config.paths.translations, function () {
    gulp.start('import-translations-from-bower');
  });

  gulp.watch([config.paths.htmls, '!' + config.paths.rootHtmls], function (event) {
    browserSync.reload(event.path);
  });

  gulp.watch(config.paths.typeScripts, function () {
    gulp.start('ts-compile-no-emit');
  });
});
