const gulp = require('gulp');
const gutil = require('gulp-util');
const copy = require('cpy');
const pSeries = require('p-series');
const _ = require('lodash');

// load config
const config = require('../config');

const task = (cb) => {

    let tasks = [];
    // loop through copy tasks (see config) and fill an array with results from copy functions (promises!)
    _.forEach(config.copy, function (v) {
        tasks.push(() => copy(v.src, v.dest, {}).then((res) => {
            if (res.length > 0) {
                gutil.log(gutil.colors.white('Copied ' + v.title + ': ' + gutil.colors.magenta(res.length)));
            }
        }));
    });

    // run tasks in series, then use callback to finish gulp copy task
    pSeries(tasks).then(result => cb());
};

gulp.task('copy', task);
module.exports = task;