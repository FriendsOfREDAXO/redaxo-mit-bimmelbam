const gulp = require('gulp');
const browserSync = require('browser-sync');

// load config
const config = require('../config');

const task = () => {
    browserSync.init(config.browserSync);
};

gulp.task('browserSync', task);
module.exports = task;