'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var merge = require('deepmerge');
var browserSync = require('browser-sync');
var eventStream = require('event-stream');
var _ = require('lodash');
var gulpPlugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files']
});

gulp.task('translation-revisions', ['import-translations-from-bower'], function () {
  return gulp.src(path.join(config.paths.tmp, config.paths.serve, config.paths.distTranslations, '**/*'))
    .pipe(gulpPlugins.rev())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.distTranslations)))
    .pipe(gulpPlugins.rev.manifest())
    .pipe(gulp.dest(path.join(config.paths.dist, config.paths.distTranslations)));
});

gulp.task('import-translations-from-bower', function () {
  var bowerStream = gulp.src(gulpPlugins.mainBowerFiles()).pipe(gulpPlugins.filter('**/*.lang.json'));
  var appStream = gulp.src(config.paths.translations);

  var aggregatorOptions = {
    group: function (file) {
      return file.relative.substr(0, file.relative.indexOf('.'));
    },
    aggregate: function (group, files) {
      return {
        path: group + '.json',
        contents: new Buffer(processTranslationsForLanguage(files))
      };
    }
  };

  return eventStream.merge(bowerStream, appStream)
    .pipe(gulpPlugins.groupAggregate(aggregatorOptions))
    .pipe(gulp.dest(path.join(config.paths.tmp, config.paths.serve, config.paths.distTranslations)))
    .pipe(browserSync.stream({once: true}));
});

function processTranslationsForLanguage(files) {
  var result = {};

  files = _.sortBy(files, function (file) {
    return 1 / file.relative.length;
  });

  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    result = merge(result, JSON.parse(file.contents.toString('utf8')));
  }

  return JSON.stringify(result);
}