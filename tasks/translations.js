'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('translation-revisions', function () {
  return gulp.src(config.paths.translations)
    .pipe(gulpPlugins.rev())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.distTranslations)))
    .pipe(gulpPlugins.rev.manifest())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.distTranslations)));
});