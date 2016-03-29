'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')();
var errorHandling = require('../error-handling');

gulp.task('html', ['ts-compile-emit', 'inject', 'partials'], function () {
  var partialsInjectFile = gulp.src(path.join(config.paths.tmp, config.paths.partials, config.templateCache.filename), { read: false });

  var partialsInjectOptions = {
    starttag: '<!-- inject:partials -->',
    ignorePath: path.join(config.paths.tmp, config.paths.partials),
    addRootSlash: false
  };

  var htmlFilter = gulpPlugins.filter('*.html', {restore: true});
  var jsFilter = gulpPlugins.filter('**/*.js', {restore: true});
  var cssFilter = gulpPlugins.filter('**/*.css', {restore: true});
  var manifest = gulp.src(path.join(config.paths.dist, config.paths.distImages, "/rev-manifest.json"));
  var assets;

  return gulp.src(path.join(config.paths.tmp, config.paths.serve, '/*.html'))
    .pipe(gulpPlugins.inject(partialsInjectFile, partialsInjectOptions))
    .pipe(assets = gulpPlugins.useref.assets())
    .pipe(gulpPlugins.rev())
    .pipe(jsFilter)
    .pipe(gulpPlugins.ngAnnotate())
    .pipe(gulpPlugins.uglify({ preserveComments: gulpPlugins.uglifySaveLicense })).on('error', errorHandling.errorHandler('Uglify'))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(gulpPlugins.replace('../font/', '../fonts/'))
    .pipe(gulpPlugins.replace('../fonts/bootstrap', '../fonts/'))
    .pipe(gulpPlugins.csso())
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe(gulpPlugins.useref())
    .pipe(gulpPlugins.revReplace())
    .pipe(htmlFilter)
    .pipe(gulpPlugins.minifyHtml({
      empty: true,
      spare: true,
      quotes: true,
      conditionals: true
    }))
    .pipe(htmlFilter.restore)
    .pipe(gulp.dest(path.join(config.paths.dist, '/')))
    .pipe(gulpPlugins.size({ title: path.join(config.paths.dist, '/'), showFiles: true }));
});
