'use strict';

var gulpUtil = require('gulp-util');

exports.errorHandler = function (title) {
  'use strict';

  return function (err) {
    gulpUtil.log(gulpUtil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};