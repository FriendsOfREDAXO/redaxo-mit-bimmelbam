const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const uglifyjs = require('uglify-js');
const modernizr = require("modernizr");
const writefile = require('writefile');
const humanSize = require('human-size');

// load config
const config = require('../config');

const task = (cb) => {

    modernizr.build(config.modernizr, (result) => {
        let dest = path.join(config.scripts.destinationFolder, '/modernizr.js');
        let target = uglifyjs.minify(result, {
            fromString: true
        }).code; // minify in all environments
        let targetSize = humanSize(Buffer.byteLength(target, 'utf8'));

        writefile(dest, target, () => {
            gutil.log(gutil.colors.white('Build a custom modernizr for you at ' + gutil.colors.magenta(dest + ', ' + targetSize)));
            return cb();
        });
    });
};

gulp.task('modernizr', task);
module.exports = task;