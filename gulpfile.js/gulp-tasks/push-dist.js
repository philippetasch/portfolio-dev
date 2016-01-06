var path         = require('path');
var config       = require('../config.json');

var distPaths = {

  src: path.join(config.root, config.base.dest, "**/*"),
  dest: path.join(config.push)
}

module.exports = function(gulp, plugins) {

return function (){

	gulp.src(distPaths.src)
	  .pipe(plugins.newer(distPaths.src))
      .pipe(gulp.dest(distPaths.dest))
      .pipe(plugins.notify({message: 'Dist pushed !'}))
};
};