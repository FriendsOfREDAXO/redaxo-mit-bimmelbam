const gulp = require('gulp');
const gutil = require('gulp-util');
const nunjucks = require('gulp-nunjucks-html');
const path = require('path');
const browserSync = require('browser-sync');
const notifier = require('node-notifier');
const plumber = require('gulp-plumber');
const count = require('gulp-count');
const _ = require('lodash');

// load config
const config = require('../config');

const task = (cb) => {
    let hasErrors = false; // init

    return gulp.src(config.templates.sourceFiles)

        // prevent pipe breaking caused by errors
        .pipe(plumber())

        // compile nunjucks templates
        .pipe(nunjucks({
            searchPaths: [config.templates.sourceFolder], // define root path to allow for relative extends
            ext: '.html' // generate html files (not nunj files)
        }))
        .on('error', (err) => {

            // mark errors
            hasErrors = true;

            // throw error to console
            gutil.log(gutil.colors.red.bold(err.name + ': ' + err.message));

            // throw notification
            notifier.notify({
                title: 'ROOOAAAARRRRRR!',
                message: 'Templates gone wrong.',
                sound: 'Basso',
                contentImage: __dirname + '/../assets/trex.png'
            });
        })

        // stop error prevention
        .pipe(plumber.stop())

        // log
        .pipe(!hasErrors ? count(gutil.colors.white('HTML files generated from templates: <%= counter %>')) : gutil.noop())

        // save
        .pipe(gulp.dest(config.templates.destinationFolder));
};

gulp.task('templates', task);
gulp.task('templates-reload', ['templates'], browserSync.reload); // watch task
module.exports = task;