'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');
var util = require('util');
var proxyMiddleware = require('http-proxy-middleware');

function browserSyncInit(baseDir, browser, serverPort, clientPort) {
  browser = browser === undefined ? 'default' : browser;
  serverPort = serverPort === undefined ? 8080 : serverPort;
  clientPort = clientPort === undefined ? 3000 : clientPort;

  var routes = null;
  if (baseDir === config.paths.app || (util.isArray(baseDir) && baseDir.indexOf(config.paths.app) !== -1)) {
    routes = {
      '/bower_components': 'bower_components',
      '/fonts': 'bower_components/font-awesome/fonts',
      '/fonts/bootstrap': 'bower_components/bootstrap-sass/assets/fonts/bootstrap'
    };
  }

  var springServer = config.proxy.springHost + ':' + serverPort;

  var server = {
    baseDir: baseDir,
    routes: routes,
    middleware: [
      proxyMiddleware('/api', {target: springServer, changeOrigin: true}),
      proxyMiddleware('/info', {target: springServer, changeOrigin: true}),
      // glob patterns do not support 'ends with', so we need to add the [] at the end, otherwise login.html would match
      proxyMiddleware('/logi[n]', {target: springServer, changeOrigin: true}),
      proxyMiddleware('/logout', {target: springServer, changeOrigin: true})
    ]
  };

  browserSync.instance = browserSync.init({
    port: clientPort,
    startPath: '/',
    server: server,
    browser: browser,
    open: false
  });
}

browserSync.use(browserSyncSpa({
  selector: '[data-ng-app]'
}));

gulp.task('serve', ['clean', 'watch'], function () {
  browserSyncInit([path.join(config.paths.tmp, config.paths.serve), config.paths.app]);
});

gulp.task('serve:dist', ['clean', 'build'], function () {
  browserSyncInit(config.paths.dist);
});

gulp.task('serve:e2e', ['clean', 'watch'], function () {
  browserSyncInit([path.join(config.paths.tmp, config.paths.serve), config.paths.app], [], 8081, 3001);
});

gulp.task('serve:e2e-single', ['clean', 'ts-compile-emit', 'inject'], function() {
  browserSyncInit([path.join(config.paths.tmp, config.paths.serve), config.paths.app], [], 8081, 3001);
});

gulp.task('serve:e2e-dist', ['build'], function () {
  browserSyncInit(config.paths.dist, [], 8081, 3001);
});
