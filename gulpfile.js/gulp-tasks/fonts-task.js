var path         = require('path');
var config               = require('../config.json');

var fontsPaths = {

  src: path.join(config.root, config.base.src, config.tasks.fonts.src),
  dest: path.join(config.root, config.base.dest, config.tasks.fonts.dest)
}

module.exports = function(gulp, plugins) {

return function (){

	gulp.src(fontsPaths.src)
      .pipe(plugins.newer(fontsPaths.dest))
      .pipe(gulp.dest(fontsPaths.dest))
      .pipe(plugins.notify({message: 'Fonts : OK!'}))

};
};