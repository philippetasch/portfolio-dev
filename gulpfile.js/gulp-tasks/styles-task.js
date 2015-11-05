var browserSync          = require('browser-sync');
var path                 = require('path');
var config               = require('../config.json');


var cssPaths = {

  src: path.join(config.root, config.base.src, config.stylesFolder.src, config.tasks.scss.src),
  dest: path.join(config.root, config.base.dest, config.stylesFolder.dest)
}

module.exports = function (gulp, plugins) {
  return function () {
   gulp.src(cssPaths.src)
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({

      browsers:['last 15 versions', 'safari 5', 'ie 8', 'ie 9','opera 12.1', 'ios 6', 'android 4'
        ]}))

    .pipe(plugins.sourcemaps.write({includeContent: true}))
    .pipe(plugins.uncss({

          html:[path.join(config.root, config.base.dest, '/*.html')],
          ignore:
          [/^\.lt-/
          ,/^\.no-js/
          ,/^\.js/
          ,/^\.triangle--/
          ,/\.opened/
          ,/\.active/
          ,/\.headroom/
          ,/\.headroom--/
          ,/\.disable-hover/],

        }))
    .pipe(gulp.dest(cssPaths.dest))

    .pipe(plugins.minifyCss({

          keepBreaks:false,
          keepSpecialComments:false,

        }))

    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(gulp.dest(cssPaths.dest))
    .pipe(browserSync.stream())
    .pipe(plugins.size({
                      showFiles : true

                  }))
    .pipe(plugins.notify({message: 'Styles : OK!'}))
};
};
