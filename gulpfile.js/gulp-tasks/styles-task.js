var browserSync          = require('browser-sync');
var path                 = require('path');
var config               = require('../config.json');

var environments         = require('gulp-environments');

var development          = environments.development;
var production           = environments.production;

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

      browsers:['last 5 versions', 'Firefox > 20', 'ie 8','opera 15', 'ios 6', 'android 4'
        ]}))

    .pipe(plugins.sourcemaps.write({

          includeContent: false,
          sourceRoot: cssPaths.src

    }))
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
          ,/\.disable-hover/
          ,/^\.classlist/],

        }))
    .pipe(gulp.dest(cssPaths.dest))

    .pipe(environments.production(plugins.minifyCss({

          keepBreaks:false,
          keepSpecialComments:false,

        })))

    .pipe(environments.production(plugins.rename({suffix: '.min'})))
    .pipe(environments.production(gulp.dest(cssPaths.dest)))
    .pipe(browserSync.stream())
    .pipe(plugins.size({
                      showFiles : true

                  }))
    .pipe(plugins.notify({message: 'Styles : OK!'}))
};
};
