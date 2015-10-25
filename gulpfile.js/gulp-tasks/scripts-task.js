var path         = require('path');
var config               = require('../config.json');

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}

module.exports = function (gulp, plugins) {
return function() {

 gulp.src(scriptsPaths.src)
       .pipe(plugins.plumber())
       .pipe(plugins.concat('main.js'))
       .pipe(plugins.jshint())
       .pipe(plugins.uglify())
       .pipe(plugins.rename({suffix : '.min'}))
       .pipe(gulp.dest(scriptsPaths.dest))
       .pipe(plugins.size({
                      showFiles : true,
                      title : 'mini-concat JS'
                  }))
       .pipe(plugins.notify({message: 'Scripts : OK!'}));
};
};
