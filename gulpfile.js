
var gulp                 = require('gulp');

var nunjucksRender       = require('gulp-nunjucks-render');
var data                 = require('gulp-data');

var sass                 = require('gulp-sass');
var sourcemaps           = require('gulp-sourcemaps');
var minifyCss            = require('gulp-minify-css');
var autoprefixer         = require('gulp-autoprefixer');
var uncss                = require('gulp-uncss');

var imagemin             = require('gulp-imagemin');
/*var pngquant             = require('imagemin-pngquant');
var jpegtran             = require('imagemin-jpegtran');
*/
var lint                 = require('gulp-jshint');
var concat               = require('gulp-concat');

var newer                = require('gulp-newer');
var notify               = require('gulp-notify');
var plumber              = require('gulp-plumber');
var uglify               = require('gulp-uglify');
var size                 = require('gulp-size');
var rename               = require('gulp-rename');

/* Paths/to/files */

var paths = {

    root:'./site',
    templates: './site/dev/html/pages/*.html',
    jsonData: './site/dev/html/data/data.json',
    scss: './site/dev/styles/scss/**/*.scss',
    css: './site/dist/css',
    imgSrc:'./site/dev/img/*',
    imgDest : './site/dist/img',
    scriptsSrc : './site/dev/scripts/js/**/*.js',
    scriptsDest : './site/dist/scripts',
      scriptsSrcTwo : './site/dev/scripts/headJs/**/*.js',
      scriptsDestTwo : './site/dist/scripts/head',
    fontSrc : './site/dev/fonts/*',
    fontDest : './site/dist/fonts',
}

/*Browser-Sync Configuration*/

var browserSync   = require('browser-sync');

var reload        = browserSync.reload;
var bsConfig      = {

      server: {
            baseDir: paths.root,
        },

        ui: {
            port: 8080
        },

        logPrefix:"nunjuck test",

        browser: ["firefox"]
};

gulp.task('browser-sync', function() {
    browserSync.init(bsConfig);
});

gulp.task('bs-reload', function () {

    browserSync.reload();

});

/*Browser-Sync Configuration -- END */

/*Nunjucks Templates Task*/


gulp.task('nunjucks', function() {
    nunjucksRender.nunjucks.configure(['./site/dev/html/templates/'], {watch: false});
return gulp.src(paths.templates)
  // Renders template with nunjucks
  .pipe(data(function() {

      return require(JSON.parse(JSON.stringify(paths.jsonData, 'utf8')))

    }))
  .pipe(nunjucksRender())
  .pipe(gulp.dest(paths.root))

});

/*Nunjucks Templates Task -- END */

/*SCSS Task*/

gulp.task('styles', function () {
   gulp.src(paths.scss)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({

      browsers:['last 15 versions', 'safari 5', 'ie 8', 'ie 9','opera 12.1', 'ios 6', 'android 4'
        ]}))

    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(uncss({

          html:[paths.root + '/*.html'],
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
            .pipe(gulp.dest(paths.css))

    .pipe(minifyCss({

          keepBreaks:false,
          keepSpecialComments:false,

        }))

    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.css))
    .pipe(size({
                      showFiles : true

                  }))
    .pipe(notify({message: 'Styles : OK!'}))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('images', function(){

return gulp.src(paths.imgSrc)
        .pipe(newer(paths.imgDest))
        .pipe(plumber())
        .pipe(imagemin({

          progressive: true,

        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(paths.imgDest))
        .pipe(size({

            showFiles : true

        }))
        .pipe(notify({message : 'Images : OK!'}));

});

gulp.task('scripts', function() {

return gulp.src(paths.scriptsSrc)
       .pipe(concat('main.js'))
       .pipe(lint())
       /*.pipe(lint.reporter('jshint-stylish'))*/
       .pipe(plumber())
       .pipe(uglify())
       .pipe(rename({suffix : '.min'}))
       .pipe(gulp.dest(paths.scriptsDest))
       .pipe(size({
                      showFiles : true,
                      title : 'mini-concat JS'
                  }))
       .pipe(notify({message: 'Scripts : OK!'}));
});

gulp.task('scriptsTwo', function() {

return gulp.src(paths.scriptsSrcTwo)
       .pipe(lint())
       .pipe(plumber())
       .pipe(uglify())
       .pipe(rename({suffix : '.min'}))
       .pipe(gulp.dest(paths.scriptsDestTwo))
       .pipe(size({
                      showFiles : true,
                      title : 'mini-concat JS'
                  }))
       .pipe(notify({message: 'Scripts Two: OK!'}));
});

/*Fonts Task*/

gulp.task('fonts', function() {

return gulp.src(paths.fontSrc)
      .pipe(newer(paths.fontDest))
      .pipe(gulp.dest(paths.fontDest))
      .pipe(notify({message: 'Fonts : OK!'}))
});

/*Watch Task */

gulp.task('watch', ['nunjucks','styles','scripts','scriptsTwo','images','browser-sync'], function () {

    gulp.watch(paths.scss, ['styles']);
    gulp.watch(paths.templates, ['nunjucks']);
    gulp.watch(paths.root + '/*.html').on('change', reload);
    gulp.watch(paths.scriptsSrc, ['scripts', 'bs-reload']);
    gulp.watch(paths.imgSrc, ['images']);

});

/*Watch Task -- END */

gulp.task('default',['watch']);
