var browserSync          = require('browser-sync');
var reload               = browserSync.reload;
var config               = require('../config.json');

module.exports = function(gulp, plugins) {
return function() {

    browserSync.init(config.tasks.browserSync);

};
};
