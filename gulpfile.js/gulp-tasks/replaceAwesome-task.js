var path 				 = require('path');
var config               = require('../config.json');
var vinylPaths           = require('vinyl-paths');
var del                  = require('del');

module.exports = function(gulp, plugins){

  return function () {
  return gulp.src(path.join(config.root, config.base.src, config.stylesFolder.src,'/font-awesome/font-awesome.scss'))
         .pipe(vinylPaths(del))
         .pipe(plugins.rename(

              "_font-awesome.scss"
          ))
         .pipe(gulp.dest(path.join(config.root, config.base.src, config.stylesFolder.src, '/font-awesome/')))

};
};