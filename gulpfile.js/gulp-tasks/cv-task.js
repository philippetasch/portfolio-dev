var path         = require('path');
var config       = require('../config.json');

var cvPaths = {

  src: path.join(config.root, config.base.src, config.tasks.cv.src),
  dest: path.join(config.root, config.base.dest, config.tasks.cv.dest)
}

module.exports = function(gulp, plugins) {

return function (){

	gulp.src(cvPaths.src)
      .pipe(plugins.newer(cvPaths.dest))
      .pipe(gulp.dest(cvPaths.dest))
      .pipe(plugins.notify({message: 'CV : OK!'}))

};
};