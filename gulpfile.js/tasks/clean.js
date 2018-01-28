const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const gulpSequence = require('gulp-sequence');
const del = require('del');
const _ = require('lodash');

// load config
const config = require('../config');

// create dedicated tasks (e. g. 'clean:images') 
_.forEach(config.clean.cleanableTasks, function (v) {
    gulp.task('clean:' + v, function (cb) {
        del(config[v].cleanFiles).then(function (touchedFiles) {
            if (touchedFiles.length > 0) {
                log(colors.white('Cleaned ' + v + ': ' + colors.magenta(touchedFiles.length)));
            }
            cb();
        });
    });
});

// assemble clean task sequence
const cleanTasks = _.map(config.clean.cleanableTasks, (v) => 'clean:' + v);

// set up gulp task containing sequence
const task = gulpSequence.apply(null, cleanTasks);

gulp.task('clean', task);
module.exports = task;