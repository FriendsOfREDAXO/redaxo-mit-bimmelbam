const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const copy = require('cpy');
const path = require('path');

// load config
const config = require('../config');

let tasks = [];
// loop through copy tasks (see config) and fill an array with results from copy functions (promises!)
for (let v of config.copy) {
    const copyTask = () => copy(v.sourceFiles, path.resolve(v.destinationFolder), {
        cwd: v.sourceFolder,
        parents: true,
        nodir: true
    }).then((res) => {
        if (res.length > 0) {
            log(colors.white('Copied ' + v.title + ': ' + colors.magenta(res.length)));
        }
    });

    copyTask.displayName = 'copy:' + v.title;
    tasks.push(copyTask);
}

const task = gulp.series(tasks);

gulp.task('copy', task);
module.exports = task;
