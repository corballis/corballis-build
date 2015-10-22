'use strict';

var gulp = require('gulp');
var path = require('path');
var del = require('del');
var config = require('../config');

gulp.task('clean', function () {
  var distFolder = path.join(config.paths.dist, '/');
  var tempFolder = path.join(config.paths.tmp, '/');

  del.sync([distFolder, tempFolder]);
});