'use strict';

var gulp = require('gulp');
var config = require('../config');
var tslint = require('gulp-tslint');

gulp.task('ts-lint', function () {
  return gulp.src(config.paths.typeScripts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});
