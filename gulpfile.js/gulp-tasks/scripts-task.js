var path                 = require('path');
var config               = require('../config.json');

var vinylPaths           = require('vinyl-paths');
var del                  = require('del');

var environments         = require('gulp-environments');

var development          = environments.development;
var production           = environments.production;

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}

//var delp = [scriptsPaths.dest + '/**/*','!' + scriptsPaths.dest + '/main.min.js'];

module.exports = function (gulp, plugins) {
return function() {

 gulp.src(scriptsPaths.src)
       .pipe(plugins.plumber())
       .pipe(environments.production(plugins.concat('main.js')))
       .pipe(plugins.jshint())
       .pipe(environments.production(plugins.uglify()))
       .pipe(environments.production(plugins.rename({suffix : '.min'})))
       .pipe(gulp.dest(scriptsPaths.dest))
       .pipe(plugins.size({
                      showFiles : true,
                      title : 'mini-concat JS'
                  }))
       .pipe(plugins.notify({message: 'Scripts : OK!'}));
};
};