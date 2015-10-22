'use strict';

var path = require('path');
var gulp = require('gulp');
var glob = require('glob');
var config = require('../config');
var plato = require('plato');

gulp.task('plato', function (done) {
  var files = glob.sync(config.paths.scripts);
  var excludeFiles = /.*-spec\.js/;

  var options = {
    title: 'Plato Inspections Report',
    exclude: excludeFiles
  };
  var outputDir = config.paths.reports + '/plato';

  plato.inspect(files, outputDir, options, platoCompleted);

  function platoCompleted() {
    if (done) {
      done();
    }
  }
});

