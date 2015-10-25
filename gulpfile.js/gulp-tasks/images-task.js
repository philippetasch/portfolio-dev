var path         = require('path');
var config               = require('../config.json');

var imgPaths = {

  src:  path.join(config.root, config.base.src, config.imgFolder.src, config.tasks.img.src),
  dest:  path.join(config.root, config.base.dest, config.imgFolder.dest)
}

module.exports = function(gulp, plugins){
return function () {
    gulp.src(imgPaths.src)
        .pipe(plugins.newer(imgPaths.dest))
        .pipe(plugins.plumber())
        .pipe(plugins.imagemin({

          progressive: true,

        }))
        .pipe(plugins.plumber.stop())
        .pipe(gulp.dest(imgPaths.dest))
        .pipe(plugins.size({

            showFiles : true

        }))
        .pipe(plugins.notify({message : 'Images : OK!'}));
};
};
