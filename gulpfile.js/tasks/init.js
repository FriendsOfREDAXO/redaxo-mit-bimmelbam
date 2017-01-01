const gulp = require('gulp');
const gutil = require('gulp-util');
const asciify = require('asciify');

const task = (cb) => {

    if (process.env.APP_ENV == 'production') {

        console.log(gutil.colors.white('\n  Production'));

        // bring out some ASCII art
        asciify('REDAXO', {
            font: 'big',
            color: 'red'
        }, (err, res) => {
            console.log(res);
            cb();
        });
    }
    else {

        console.log(gutil.colors.white('\n  Development'));

        // bring out some ASCII art
        asciify('BIMMELBAM', {
            font: 'mini',
            color: 'blue'
        }, (err, res) => {
            console.log(res);
            cb();
        });
    }
};

gulp.task('init', task);
module.exports = task;