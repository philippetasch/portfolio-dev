var path                 = require('path');
var config               = require('../config.json');

var vinylPaths           = require('vinyl-paths');
var del                  = require('del');
var environments         = require('gulp-environments');
var addsrc               = require('gulp-add-src');

var development          = environments.development;
var production           = environments.production;

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}

//var delp = [scriptsPaths.dest + '/**/*','!' + scriptsPaths.dest + '/main.min.js'];

module.exports = function (gulp, plugins) {
  return function() {

  var addOpts = './site/dev/scripts/js/options.js';
  gulp.src([scriptsPaths.src,'!'+addOpts])
         .pipe(plugins.plumber())
         .pipe(production(plugins.concat('main.js')))
         .pipe(plugins.jshint())
         .pipe(production(plugins.addSrc(addOpts)))
         .pipe(production(plugins.uglify()))
         .pipe(production(plugins.rename({suffix : '.min'})))
         .pipe(gulp.dest(scriptsPaths.dest))
         .pipe(plugins.size({
              showFiles : true,
              title : 'mini-concat JS'
          }))
         .pipe(plugins.notify({message: 'Scripts : OK!'}));
  };
};
