'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('scripts', function () {
  return gulp.src(config.paths.scripts)
    .pipe(gulpPlugins.cached('linting'))
    .pipe(gulpPlugins.jshint())
    .pipe(gulpPlugins.jshint.reporter('jshint-stylish'))
    .pipe(gulpPlugins.if(!browserSync.active, gulpPlugins.jshint.reporter('fail')))
    .pipe(browserSync.stream({once: true}))
});
