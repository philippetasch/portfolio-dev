
var gulp                 = require('gulp');
var plugins              = require('gulp-load-plugins')();

var nunjucksRender       = require('gulp-nunjucks-render');
var data                 = require('gulp-data');
var fs                   = require('fs');


//var sass                 = require('gulp-sass');
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

var path                 = require('path');
var config               = require('./config.json');

/*Browser-Sync Configuration*/

var browserSync   = require('browser-sync');

var reload        = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init(config.tasks.browserSync);
});

gulp.task('bs-reload', function () {

    browserSync.reload();

});

/*Browser-Sync Configuration -- END */

/*Nunjucks Templates Task*/
var htmlPaths = {

  src: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.src),
  templates: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.templates),
  layout: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.layout),
  partials: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.partials),
  jsonData: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.jsonData),
  dest: path.join(config.root)
}

gulp.task('html', function() {
    nunjucksRender.nunjucks.configure([htmlPaths.src], {watch: false});
return gulp.src(htmlPaths.templates)
  .pipe(plumber())
  // Renders template with nunjucks
  .pipe(data(function() {

      return JSON.parse(fs.readFileSync(htmlPaths.jsonData, 'utf8'))

    }))
  .pipe(nunjucksRender())
  .pipe(gulp.dest(config.root))

});

/*Nunjucks Templates Task -- END */

/*SCSS Task*/

var cssPaths = {

  src: path.join(config.root, config.base.src, config.stylesFolder.src, config.tasks.scss.src),
  dest: path.join(config.root, config.base.dest, config.stylesFolder.dest)
}

gulp.task('styles', function () {
   gulp.src(cssPaths.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(autoprefixer({

      browsers:['last 15 versions', 'safari 5', 'ie 8', 'ie 9','opera 12.1', 'ios 6', 'android 4'
        ]}))

    .pipe(sourcemaps.write({includeContent: true}))
    .pipe(uncss({

          html:[config.root + '/*.html'],
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

    .pipe(minifyCss({

          keepBreaks:false,
          keepSpecialComments:false,

        }))

    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(cssPaths.dest))
    .pipe(size({
                      showFiles : true

                  }))
    .pipe(notify({message: 'Styles : OK!'}))
    .pipe(browserSync.reload({stream:true}))
});

var imgPaths = {

  src:  path.join(config.root, config.base.src, config.imgFolder.src, config.tasks.img.src),
  dest:  path.join(config.root, config.base.dest, config.imgFolder.dest)
}

gulp.task('images', function(){

return gulp.src(imgPaths.src)
        .pipe(newer(imgPaths.dest))
        .pipe(plumber())
        .pipe(imagemin({

          progressive: true,

        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest(imgPaths.dest))
        .pipe(size({

            showFiles : true

        }))
        .pipe(notify({message : 'Images : OK!'}));

});


var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}

gulp.task('scripts', function() {

return gulp.src(scriptsPaths.src)
       .pipe(plumber())
       .pipe(concat('main.js'))
       .pipe(lint())
       /*.pipe(lint.reporter('jshint-stylish'))*/
       .pipe(uglify())
       .pipe(rename({suffix : '.min'}))
       .pipe(gulp.dest(scriptsPaths.dest))
       .pipe(size({
                      showFiles : true,
                      title : 'mini-concat JS'
                  }))
       .pipe(notify({message: 'Scripts : OK!'}));
});

var scriptsPathsTwo = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.srcTwo),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.destTwo)
}

var allScripts = [scriptsPaths.src, scriptsPathsTwo.src];

gulp.task('scriptsTwo', function() {

return gulp.src(scriptsPathsTwo.src)
       .pipe(plumber())
       .pipe(lint())
       .pipe(uglify())
       .pipe(rename({suffix : '.min'}))
       .pipe(gulp.dest(scriptsPathsTwo.dest))
       .pipe(size({
                      showFiles : true,
                      title : 'mini-concat JS'
                  }))
       .pipe(notify({message: 'Scripts Two: OK!'}));
});

/*Fonts Task*/

var fontsPaths = {

  src: path.join(config.root, config.base.src, config.tasks.fonts.src),
  dest: path.join(config.root, config.base.dest, config.tasks.fonts.dest)
}

gulp.task('fonts', function() {

return gulp.src(fontsPaths.src)
      .pipe(newer(fontsPaths.dest))
      .pipe(gulp.dest(fontsPaths.dest))
      .pipe(notify({message: 'Fonts : OK!'}))
});

/*Watch Task */

gulp.task('watch', ['html','styles','scripts','scriptsTwo','images','browser-sync'], function () {

    gulp.watch([htmlPaths.templates, htmlPaths.layout, htmlPaths.partials, htmlPaths.jsonData], ['html']);
    gulp.watch(config.root + '/*.html').on('change', reload);
    gulp.watch(cssPaths.src, ['styles']);
    gulp.watch(allScripts, ['scripts', 'bs-reload']);
    gulp.watch(imgPaths.src, ['images']);

});

/*Watch Task -- END */

gulp.task('default',['watch']);
