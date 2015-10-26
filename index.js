'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var config = require('./config');
var _ = require('lodash');

var tasksFolder = __dirname + '/tasks';

function jsFilesOnly(file) {
  return (/\.js$/i).test(file);
}

function requireFile(file) {
  require(tasksFolder + '/' + file);
}

exports.config = function (overrides) {
  _.extend(config.scssOrder, overrides.scssOrder);
  _.extend(config.paths, overrides.paths);
  _.extend(config.templateCache, overrides.templateCache);
  _.extend(config.proxy, overrides.proxy);
  _.extend(config.protractor, overrides.protractor);
  _.extend(config.wiredep, overrides.wiredep);
};

/**
 *  The gulp tasks are splitted in several files in the tasks directory
 */
wrench.readdirSyncRecursive(tasksFolder).filter(jsFilesOnly).map(requireFile);

gulp.task('default', ['clean', 'build', 'plato'], function() {
  gulp.start('test:nodep');
});