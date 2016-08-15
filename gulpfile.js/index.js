var gulp                 = require('gulp');
var plugins              = require('gulp-load-plugins')();

var path                 = require('path');
var fs                   = require('fs');
var config               = require('./config.json');

function fetchTask(task){

  return require('./gulp-tasks/' + task)(gulp, plugins);
}

var vinylPaths           = require('vinyl-paths');
var del                  = require('del');

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
  dest: path.join(config.root, config.base.dest, config.scriptsFolder.dest)
}

/* Tasks being watched */
gulp.task('html', fetchTask('html-task'));
gulp.task('scripts', fetchTask('scripts-task'));
gulp.task('styles', fetchTask('styles-task'));
gulp.task('images', fetchTask('images-task'));
gulp.task('browser-sync', fetchTask('browserSync-task'));

/* Tasks not being watched */
gulp.task('cv', fetchTask('cv-task'));
gulp.task('fonts', fetchTask('fonts-task'));
gulp.task('replaceAwesome', fetchTask('replaceAwesome-task'));
gulp.task('clean', fetchTask('clean-task'));

/* Tasks not wrapped in default */
gulp.task('push-dist', fetchTask('push-dist'));

gulp.task('watch', ['html','scripts','styles','images','browser-sync'], fetchTask('watch-task'));
gulp.task('default',['fonts','replaceAwesome','cv','watch']);
