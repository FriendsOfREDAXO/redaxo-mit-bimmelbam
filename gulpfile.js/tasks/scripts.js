const gulp = require('gulp');
const gutil = require('gulp-util');
const browserify = require('browserify');
const watchify = require('watchify');
const babelify = require('babelify');
const uglify = require('gulp-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const size = require('gulp-size');
const notifier = require('node-notifier');

// load config
const config = require('../config');

// set up browserify
const b = browserify({
    entries: config.scripts.sourceFiles,
    cache: {},
    packageCache: {},
    plugin: [watchify] // watchify!
});

// add transforms
b.transform("babelify", {
    presets: ["es2015"]
});

// watch for events
b.on('update', bundle);
b.on('log', gutil.log);

// define bundle
function bundle() {
    return b.bundle()
        .on('error', function (err) {

            // throw error to console
            gutil.log(gutil.colors.red.bold(err.name + ': ' + err.message));

            // throw notification
            notifier.notify({
                title: 'ROARRRRRRRRRR!',
                message: 'JavaScript gone wrong.',
                sound: 'Basso',
                contentImage: __dirname + '/../assets/trex.png'
            });
        })
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(process.env.APP_ENV == 'production' ? uglify() : gutil.noop())
        .pipe(gutil.noop(gutil.log(gutil.colors.white('JS files generated:'))))
        .pipe(size({title: 'Scripts:', showFiles: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.scripts.destinationFolder))
        .pipe(browserSync.stream());
}

const task = bundle;

gulp.task('scripts', task);
module.exports = task;