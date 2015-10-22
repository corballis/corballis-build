'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('fonts', function () {
  return gulp.src(gulpPlugins.mainBowerFiles())
    .pipe(gulpPlugins.filter('**/*.{eot,svg,ttf,woff,woff2}'))
    .pipe(gulpPlugins.flatten())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.fonts)));
});