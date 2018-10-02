const gulp = require('gulp');
const browserSync = require('browser-sync');

// load config
const config = require('../config');

const task = (done) => {
    browserSync.init(config.browserSync);

    done();
};

gulp.task('browserSync', task);
module.exports = task;
