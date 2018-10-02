const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const del = require('del');

// load config
const config = require('../config');

// create dedicated tasks (e. g. 'clean:images')
for (let v of config.clean.cleanableTasks) {
    gulp.task('clean:' + v, function (done) {
        del(config[v].cleanFiles).then(function (touchedFiles) {
            if (touchedFiles.length > 0) {
                log(colors.white('Cleaned ' + v + ': ' + colors.magenta(touchedFiles.length)));
            }
            done();
        });
    });
}

// assemble clean task sequence
const cleanTasks = config.clean.cleanableTasks.map((v) => 'clean:' + v);

// set up gulp task containing sequence
const task = gulp.series(cleanTasks);

gulp.task('clean', task);
module.exports = task;
