'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('image-revisions', function () {
  return gulp.src(config.paths.images)
    .pipe(gulpPlugins.cache(gulpPlugins.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulpPlugins.rev())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.distImages)))
    .pipe(gulpPlugins.size({title: 'images'}))
    .pipe(gulpPlugins.rev.manifest())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.distImages)));
});