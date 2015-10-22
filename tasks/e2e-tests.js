'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');

var browserSync = require('browser-sync');

var gulpPlugins = require('gulp-load-plugins')();

gulp.task('webdriver:update', gulpPlugins.protractor.webdriver_update);
gulp.task('webdriver:standalone', gulpPlugins.protractor.webdriver_standalone);

function runProtractor(done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

  gulp.src(config.paths.e2eSpecs)
    .pipe(gulpPlugins.protractor.protractor({
      configFile: path.resolve(path.join(__dirname, '../e2e.conf.js')),
      args: args
    }))
    .on('error', function (err) {
      throw err;
    })
    .on('end', function () {
      browserSync.exit();
      done();
    });
}

gulp.task('e2e', ['e2e:single']);
gulp.task('e2e:serve', ['serve:e2e', 'webdriver:update'], runProtractor);
gulp.task('e2e:single', ['serve:e2e-single', 'webdriver:update'], runProtractor);
gulp.task('e2e:dist', ['serve:e2e-dist', 'webdriver:update'], runProtractor);
