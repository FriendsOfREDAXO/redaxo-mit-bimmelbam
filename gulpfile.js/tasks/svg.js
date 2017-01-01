const gulp = require('gulp');
const gutil = require('gulp-util');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const path = require('path');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const count = require('gulp-count');
const _ = require('lodash');

// load config
const config = require('../config');

const task = () => gulp.src(config.svg.sourceFiles)

    // prevent pipe breaking caused by errors
    .pipe(plumber())

    // assemble one SVG
    .pipe(svgstore({
        inlineSvg: true
    }))

    // minify
    .pipe(svgmin({
        plugins: [{
            cleanupIDs: false,
            removeUselessDefs: false,
            addClassesToSVGElement: {
                classNames: ['jabbathehutt'] // a huuuuuuge svg containing it all
            }
        }]
    }))

    // stop error prevention
    .pipe(plumber.stop())

    // log
    .pipe(size({'title': 'SVGs'}))
    .pipe(count(gutil.colors.white('SVG files processed: <%= counter %>')))

    // save
    .pipe(gulp.dest(config.svg.destinationFolder));

gulp.task('svg', task);
module.exports = task;