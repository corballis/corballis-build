'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('partials', function () {
  if (config.templateCache.enabled) {
    return gulp.src([
        path.join(config.paths.htmls),
        path.join(config.paths.tmp, config.paths.serveHtmls),
        path.join('!' + config.paths.rootHtmls)
      ])
      .pipe(gulpPlugins.minifyHtml({
        empty: true,
        spare: true,
        quotes: true
      }))
      .pipe(gulpPlugins.angularTemplatecache(config.templateCache.filename, {
        module: config.templateCache.module,
        root: 'app'
      }))
      .pipe(gulp.dest(config.paths.tmp + config.paths.partials));
  }
});