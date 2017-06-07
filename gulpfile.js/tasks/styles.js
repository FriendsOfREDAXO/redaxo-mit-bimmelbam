const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const nano = require('gulp-cssnano');
const path = require('path');
const browserSync = require('browser-sync');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');
const _ = require('lodash');

// load config
const config = require('../config');

const task = (cb) => {
    let hasErrors = false; // init
    return gulp.src(config.styles.sourceFiles)

        // init sourcemaps
        .pipe(process.env.APP_ENV == 'development' ? sourcemaps.init() : gutil.noop())

        // prevent pipe breaking caused by errors
        .pipe(plumber())

        // glob partials (use wildcard * for imports)
        .pipe(sassGlob())

        // compile sass
        .pipe(sass())
        .on('error', function (err) {

            // mark errors
            hasErrors = true;

            // throw error to console
            gutil.log(gutil.colors.red.bold(err.name + ': ' + err.message));

            // throw notification
            notifier.notify({
                title: 'ROARRRRRRRRRR!',
                message: 'Styles gone wrong.',
                sound: 'Basso',
                contentImage: __dirname + '/../assets/trex.png'
            });

            // continue gulp task
            cb();
        })

        // run postcss plugins
        .pipe(postcss([
            autoprefixer() // autoprefixer uses config from .browserslistrc
        ]))

        // stop error prevention
        .pipe(plumber.stop())

        // compress (production)
        .pipe(process.env.APP_ENV == 'production' ? nano(config.cssnano) : gutil.noop())

        // log
        .pipe(!hasErrors ? gutil.noop(gutil.log(gutil.colors.white('CSS files generated:'))) : gutil.noop())
        .pipe(size({title: 'Styles:', showFiles: true}))

        // write sourcemaps (development)
        .pipe(process.env.APP_ENV == 'development' ? sourcemaps.write('.') : gutil.noop())

        // save
        .pipe(gulp.dest(config.styles.destinationFolder))

        // make browersync reload CSS only!
        .pipe(browserSync.stream({match: '**/*.css'}));
};

gulp.task('styles', task);
module.exports = task;