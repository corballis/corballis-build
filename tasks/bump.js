'use strict';

var gulp = require('gulp');
var config = require('../config');
var args = require('yargs').argv;

var gulpPlugins = require('gulp-load-plugins')();

gulp.task('bump', function () {
  var type = args.type;
  var version = args.ver;
  var options = {};
  if (version) {
    options.version = version;
  } else {
    options.type = type;
  }

  return gulp.src(config.paths.packages)
    .pipe(gulpPlugins.bump(options))
    .pipe(gulp.dest('.'));
});