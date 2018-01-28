const gulp = require('gulp');
const env = require('minimist')(process.argv.slice(2));
const colors = require('ansi-colors');
const asciify = require('asciify');

const task = (cb) => {

    if (env.production) {

        console.log(colors.white('\n  Production'));

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

        console.log(colors.white('\n  Development'));

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