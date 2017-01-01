const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const count = require('gulp-count');
const _ = require('lodash');

// load config
const config = require('../config');

const task = () => gulp.src(config.images.sourceFiles)

    // minify (production)
    .pipe(process.env.APP_ENV == 'production' ? imagemin([
        // plugins (https://www.npmjs.com/browse/keyword/imageminplugin)
        imagemin.gifsicle(),
        imagemin.jpegtran(),
        pngquant(),
        imagemin.svgo()
    ], {
        // options
        verbose: true
    }) : gutil.noop())

    // log
    .pipe(count(gutil.colors.white('Image files processed: <%= counter %>')))

    // save
    .pipe(gulp.dest(config.images.destinationFolder));

gulp.task('images', task);
module.exports = task;