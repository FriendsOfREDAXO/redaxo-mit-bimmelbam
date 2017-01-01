const gulp = require('gulp');
const gutil = require('gulp-util');
const gulpSequence = require('gulp-sequence');
const copy = require('cpy');

// load config
const config = require('../config');

// copy generated SVG
gulp.task('copy:svg', (cb) => {
    let src = ['./source/templates/svg/*.svg'];
    let dest = './app/assets/svg';
    copy(src, dest, {}).then((res) => {
        if (res.length > 0) {
            gutil.log(gutil.colors.white('Copied SVG files: ' + gutil.colors.magenta(res.length)));
        }
        cb();
    });
});

// copy material icons (npm package)
gulp.task('copy:materialIcons', (cb) => {
    let src = ['./node_modules/material-design-icons/iconfont/*.{woff,woff2}'];
    let dest = './app/assets/fonts';
    copy(src, dest, {}).then((res) => {
        if (res.length > 0) {
            gutil.log(gutil.colors.white('Copied material icon files: ' + gutil.colors.magenta(res.length)));
        }
        cb();
    });
});

// copy bootstrap icon fonts (npm package)
gulp.task('copy:bootstrapIcons', (cb) => {
    let src = ['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*.{woff,woff2}'];
    let dest = './app/assets/fonts/bootstrap';
    copy(src, dest, {}).then((res) => {
        if (res.length > 0) {
            gutil.log(gutil.colors.white('Copied bootstrap icon files: ' + gutil.colors.magenta(res.length)));
        }
        cb();
    });
});

const task = gulpSequence('copy:svg', 'copy:materialIcons', 'copy:bootstrapIcons');

gulp.task('copy', task);
module.exports = task;