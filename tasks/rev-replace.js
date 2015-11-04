'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var gulpPlugins = require('gulp-load-plugins')();

gulp.task('rev-replace-dist', ['html', 'fonts', 'other', 'image-revisions', 'translation-revisions'], function () {
  var translationManifest = gulp.src(path.join(config.paths.dist, config.paths.distTranslations, "/rev-manifest.json"));
  var imageManifest = gulp.src(path.join(config.paths.dist, config.paths.distImages, "/rev-manifest.json"));

  gulp.src(path.join(config.paths.dist, '/**/*'))
    .pipe(gulpPlugins.revReplace({manifest: translationManifest}))
    .pipe(gulpPlugins.revReplace({manifest: imageManifest}))
    .pipe(gulp.dest(config.paths.dist));
});