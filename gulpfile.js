
var gulp                 = require('gulp');
var plugins              = require('gulp-load-plugins')();

var path                 = require('path');
var fs                   = require('fs');
var del                  = require('del');
var vinylPaths           = require('vinyl-paths');
var config               = require('./gulp-files/config.json');

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
    plugins.nunjucksRender.nunjucks.configure([htmlPaths.src], {watch: false});
return gulp.src(htmlPaths.templates)
  .pipe(plugins.plumber())
  // Renders template with nunjucks
  .pipe(plugins.data(function() {

      return JSON.parse(fs.readFileSync(htmlPaths.jsonData, 'utf8'))

    }))
  .pipe(plugins.nunjucksRender())
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
    .pipe(plugins.plumber())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass())
    .pipe(plugins.autoprefixer({

      browsers:['last 15 versions', 'safari 5', 'ie 8', 'ie 9','opera 12.1', 'ios 6', 'android 4'
        ]}))

    .pipe(plugins.sourcemaps.write({includeContent: true}))
    .pipe(plugins.uncss({

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
});

gulp.task('replaceAwesome', function(){

  return gulp.src(path.join(config.root, config.base.src, config.stylesFolder.src,'/font-awesome/font-awesome.scss'))
         .pipe(vinylPaths(del))
         .pipe(plugins.rename(

              "_font-awesome.scss"
          ))
         .pipe(gulp.dest(path.join(config.root, config.base.src, config.stylesFolder.src, '/font-awesome/')))

});

var imgPaths = {

  src:  path.join(config.root, config.base.src, config.imgFolder.src, config.tasks.img.src),
  dest:  path.join(config.root, config.base.dest, config.imgFolder.dest)
}

gulp.task('images', function(){

return gulp.src(imgPaths.src)
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

});

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}

gulp.task('scripts', function() {

return gulp.src(scriptsPaths.src)
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
});

/*Fonts Task*/

var fontsPaths = {

  src: path.join(config.root, config.base.src, config.tasks.fonts.src),
  dest: path.join(config.root, config.base.dest, config.tasks.fonts.dest)
}

gulp.task('fonts', function() {

return gulp.src(fontsPaths.src)
      .pipe(plugins.newer(fontsPaths.dest))
      .pipe(gulp.dest(fontsPaths.dest))
      .pipe(plugins.notify({message: 'Fonts : OK!'}))
});

/*Watch Task */

gulp.task('watch', ['html','scripts','styles','images','fonts','browser-sync'], function () {

    gulp.watch([htmlPaths.templates, htmlPaths.layout, htmlPaths.partials, htmlPaths.jsonData], ['html']);
    gulp.watch(config.root + '/*.html').on('change', reload);
    gulp.watch(cssPaths.src, ['styles',]);
    gulp.watch(scriptsPaths.src, ['scripts', reload]);
    gulp.watch(imgPaths.src, ['images']);

});

/*Watch Task -- END */

gulp.task('default',['watch']);
