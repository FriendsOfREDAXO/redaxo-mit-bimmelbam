const gulp = require('gulp');
const path = require('path');
const modernizr = require('gulp-modernizr');
const uglify = require('gulp-uglify-es').default;

// load config
const config = require('../config');

const task = () => {
    return gulp.src(config.scripts.destinationFolder, '/modernizr.js')
        .pipe(modernizr(config.modernizr))
        .pipe(uglify())
        .pipe(gulp.dest(path.join(config.scripts.destinationFolder, '/modernizr.js')))
};

gulp.task('modernizr', task);
module.exports = task;
