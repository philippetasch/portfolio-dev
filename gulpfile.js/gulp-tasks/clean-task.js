var path 				 = require('path');
var config               = require('../config.json');
var vinylPaths           = require('vinyl-paths');
var del                  = require('del');

module.exports = function(gulp, plugins){

  return function () {

  	return gulp.src(path.join(config.root, config.base.dest))
         .pipe(vinylPaths(del))

};
};