const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const svgstore = require('gulp-svgstore');
const svgmin = require('gulp-svgmin');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const count = require('gulp-count');
const rename = require('gulp-rename');

// load config
const config = require('../config');

const task = () => gulp.src(config.svg.sourceFiles)

    // prevent pipe breaking caused by errors
    .pipe(plumber())

    // minify
    .pipe(svgmin({
        plugins: [{
            removeViewBox: false
        }]
    }))

    // log
    .pipe(count({
        message: colors.white('SVG files processed: <%= counter %>'),
        logger: (message) => log(message)
    }))

    // rename SVG (symbol)
    .pipe(rename({
            prefix: 'icon-'
        }
    ))

    // assemble one SVG
    .pipe(svgstore({
        inlineSvg: true
    }))

    // rename assembled SVG file
    .pipe(rename({
            basename: 'svg-sprite'
        }
    ))

    // stop error prevention
    .pipe(plumber.stop())

    // log
    .pipe(size({'title': 'SVGs'}))

    // save
    .pipe(gulp.dest(config.svg.destinationFolder));

gulp.task('svg', task);
module.exports = task;
