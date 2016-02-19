'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var fs = require('fs');
var glob = require('glob');

var browserSync = require('browser-sync');

var gulpPlugins = require('gulp-load-plugins')();

gulp.task('webdriver:update', gulpPlugins.protractor.webdriver_update);
gulp.task('webdriver:standalone', gulpPlugins.protractor.webdriver_standalone);

function saveTempConfig() {
  var e2eTmp = path.resolve(path.join(config.paths.tmp, '/e2e'));

  if (!fs.existsSync(e2eTmp)){
    fs.mkdirSync(e2eTmp);
  }

  var confFile = e2eTmp + '/e2e.conf.js';
  fs.writeFile(confFile, 'exports.config=' + bundle(config.protractor) + ';');
  return confFile;
}

function bundle(obj) {
  var type = typeof obj;
  if(type === 'string') return '\'' + obj + '\'';
  if(type === 'boolean' || type === 'number') return obj;
  if(type === 'function') return obj.toString();
  var ret = [];
  for(var prop in obj) {
    if (Array.isArray(obj)) {
      ret.push(bundle(obj[prop]));
    } else {
      ret.push(prop + ': ' + bundle(obj[prop]));
    }
  }
  return Array.isArray(obj) ? '[' + ret.join(',') + ']' : '{' + ret.join(',') + '}';
}

function distributeParallelTests() {
  var specs = findE2eSpecs();
  config.protractor.multiCapabilities = [];
  var ports = process.env.PROTRACTOR_DOCKER_PORTS ? process.env.PROTRACTOR_DOCKER_PORTS.split(';') : ['3001'];
  var browserCount = ports.length;
  initMultipleCapabilities(ports);

  for (var j = 0; j < specs.length; j++) {
    config.protractor.multiCapabilities[j % browserCount].specs.push(specs[j]);
  }

  setupBaseUrl();
//  console.log(config.protractor.multiCapabilities);
}

function findE2eSpecs() {
  var files = glob.sync(config.paths.e2eSpecsWithoutPageObjects);
  var resolvedSpecs = [];
  for (var i = 0; i < files.length; i++) {
    resolvedSpecs.push('../../' + files[i]);
  }
  return resolvedSpecs;
}

function initMultipleCapabilities(ports) {
  config.protractor.multiCapabilities = [];
  for (var i = 0; i < ports.length; i++) {
    config.protractor.multiCapabilities.push({
      browserName: 'chrome',
      port: ports[i],
      specs: []
    });
  }
}

function setupBaseUrl() {
  config.protractor.onPrepare = function () {
    browser.baseUrl = 'http://localhost:' + browser.getProcessedConfig().value_.capabilities.port;
    if (browser.getProcessedConfig().value_.onPrepareCustom) {
      browser.getProcessedConfig().value_.onPrepareCustom();
    }
  }
}

function runProtractor(done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];
  distributeParallelTests();

  gulp.src(config.paths.e2eSpecs)
    .pipe(gulpPlugins.protractor.protractor({
      configFile: saveTempConfig(),
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
