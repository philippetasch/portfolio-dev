var gulp                 = require('gulp');
var plugins              = require('gulp-load-plugins')();

var path                 = require('path');
var fs                   = require('fs');
var config               = require('./config.json');

var browserSync          = require('browser-sync');
var reload               = browserSync.reload;


var htmlPaths = {

  src: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.src),
  templates: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.templates),
  layout: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.layout),
  partials: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.partials),
  jsonData: path.join(config.root, config.base.src, config.htmlFolder.src, config.tasks.html.jsonData),
  dest: path.join(config.root, config.base.dest)
}

var cssPaths = {

  src: path.join(config.root, config.base.src, config.stylesFolder.src, config.tasks.scss.src),
  dest: path.join(config.root, config.base.dest, config.stylesFolder.dest)
}

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}


var imgPaths = {

  src:  path.join(config.root, config.base.src, config.imgFolder.src, config.tasks.img.src),
  dest:  path.join(config.root, config.base.dest, config.imgFolder.dest)
}

var fontsPaths = {

  src: path.join(config.root, config.base.src, config.tasks.fonts.src),
  dest: path.join(config.root, config.base.dest, config.tasks.fonts.dest)
}

gulp.task('browser-sync', function() {
    browserSync.init(config.tasks.browserSync);
});

gulp.task('bs-reload', function () {

    browserSync.reload();

});

function fetchTask(task){

  return require('./gulp-tasks/' + task)(gulp, plugins);
}

gulp.task('html', fetchTask('html-task'));
gulp.task('cv', fetchTask('cv-task'));
gulp.task('styles', fetchTask('styles-task'));
gulp.task('images', fetchTask('images-task'));
gulp.task('scripts', fetchTask('scripts-task'));
gulp.task('fonts', fetchTask('fonts-task'));
gulp.task('replaceAwesome', fetchTask('replaceAwesome-task'));

gulp.task('watch', ['html','scripts','styles','images','fonts','browser-sync'], function () {

    gulp.watch(path.join(config.root, config.base.src, config.htmlFolder.src, '/**/*.{html,json}'), ['html']);
    gulp.watch(path.join(htmlPaths.dest, '/*.html')).on('change', reload);
    gulp.watch(cssPaths.src, ['styles']);
    gulp.watch(scriptsPaths.src, ['scripts', reload]);
    gulp.watch(imgPaths.src, ['images']);

});

gulp.task('default',['watch']);
