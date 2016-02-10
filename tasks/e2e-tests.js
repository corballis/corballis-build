'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('../config');
var fs = require('fs');

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
  fs.writeFile(confFile, 'exports.config=' + bundle(config.protractor) + ';', console.log);
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

function runProtractor(done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

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
