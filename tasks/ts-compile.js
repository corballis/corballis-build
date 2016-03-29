'use strict';

var gulp = require('gulp');
var config = require('../config');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var path = require('path');

gulp.task('ts-compile', function () {
  return gulp.src(config.paths.typeScripts)
    .pipe(sourcemaps.init())
    .pipe(ts({
      declaration: true,
      noExternalResolve: true,
      target: 'es5',
      module: 'system',
      moduleResolution: 'node',
      sourceMap: true,
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      removeComments: false,
      noImplicitAny: false
    }))
    .js
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.join(config.paths.tmp, config.paths.serveApp)));
});
