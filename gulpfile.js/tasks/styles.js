const gulp = require('gulp');
const through = require('through');
const log = require('fancy-log');
const colors = require('ansi-colors');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const nano = require('gulp-cssnano');
const browserSync = require('browser-sync');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const notifier = require('node-notifier');

// load config
const config = require('../config');

const task = (done) => {
    let hasErrors = false; // init
    return gulp.src(config.styles.sourceFiles)

        // init sourcemaps
        .pipe(process.env.APP_ENV !== 'production' ? sourcemaps.init() : through())

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
            log(colors.bold(colors.red(err.name + ': ' + err.message)));

            // throw notification
            notifier.notify({
                title: 'ROARRRRRRRRRR!',
                message: 'Styles gone wrong.',
                sound: 'Basso',
                contentImage: __dirname + '/../assets/trex.png'
            });

            // continue gulp task
            done();
        })

        // run postcss plugins
        .pipe(postcss([
            customProperties(),
            autoprefixer() // autoprefixer uses config from .browserslistrc
        ]))

        // stop error prevention
        .pipe(plumber.stop())

        // compress (production)
        .pipe(process.env.APP_ENV === 'production' ? nano(config.cssnano) : through())

        // log
        .pipe(!hasErrors ? through(log(colors.white('CSS files generated:'))) : through())
        .pipe(size({title: 'Styles:', showFiles: true}))

        // write sourcemaps (development)
        .pipe(process.env.APP_ENV !== 'production' ? sourcemaps.write('.') : through())

        // save
        .pipe(gulp.dest(config.styles.destinationFolder))

        // make browersync reload CSS only!
        .pipe(browserSync.stream({match: '**/*.css'}));
};

gulp.task('styles', task);
module.exports = task;
