var browserSync          = require('browser-sync');
var reload               = browserSync.reload;
var path         = require('path');
var config       = require('../config.json');

var htmlPaths = {

  dest: path.join(config.root, config.base.dest)
}

var cssPaths = {

  src: path.join(config.root, config.base.src, config.stylesFolder.src, config.tasks.scss.src),
}

var scriptsPaths = {

  src: path.join(config.root, config.base.src, config.scriptsFolder.src, config.tasks.js.src),
}

var imgPaths = {

  src:  path.join(config.root, config.base.src, config.imgFolder.src, config.tasks.img.src),
}

module.exports = function(gulp, plugins) {

	return function(){

	    gulp.watch(path.join(config.root, config.base.src, config.htmlFolder.src, '/**/*.{html,json}'), ['html']);
	    gulp.watch(path.join(htmlPaths.dest, '/*.html')).on('change', reload);
	    gulp.watch(cssPaths.src, ['styles']);
	    gulp.watch(scriptsPaths.src, ['scripts', reload]);
	    gulp.watch(imgPaths.src, ['images']);

	};

};