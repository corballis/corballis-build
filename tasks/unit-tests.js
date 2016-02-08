'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var Server = require('karma').Server;

function runTests(singleRun, done) {
  new Server({
    configFile: path.resolve(path.join(config.paths.tmp, config.paths.karma, 'karma.conf.js')),
    singleRun: singleRun,
    autoWatch: !singleRun
  }, function () {
    done();
  }).start();
}

gulp.task('test:nodep', function (done) {
  runTests(true, done);
});

gulp.task('test', ['inject'], function (done) {
  runTests(true, done);
});

gulp.task('test:auto', ['watch'], function (done) {
  runTests(false, done);
});
