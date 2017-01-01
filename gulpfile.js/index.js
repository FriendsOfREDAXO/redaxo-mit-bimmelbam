const gulp = require('gulp');
const gulpSequence = require('gulp-sequence');
const requireDir = require('require-dir');

// load ENV
// find values in process.env.${value}, e. g. process.env.APP_ENV
require('dotenv').load();

// Require all tasks in gulpfile.js/tasks, including subfolders
requireDir('./tasks', { recurse: true });

// define sequences
const tasks = [];
tasks.development = gulpSequence(
    'init',
    'clean',
    'modernizr',
    'styles',
    'scripts',
    'images',
    'svg',
    'templates',
    'copy',
    'watch',
    'browserSync'
);
tasks.production = gulpSequence(
    'init',
    'clean',
    'modernizr',
    'styles',
    'scripts',
    'images',
    'svg',
    'templates',
    'copy'
);

// define tasks
gulp.task('development', tasks.development);
gulp.task('production', tasks.production);

// define default alias (use from ENV)
gulp.task('default', tasks[process.env.APP_ENV]);