'use strict';

var gulp = require('gulp');

gulp.task('ts-compile-no-emit', ['ts-lint-no-emit', 'ts-compile']);
