const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const path = require('path');
const uglifyjs = require('uglify-js');
const modernizr = require("modernizr");
const writefile = require('writefile');
const humanSize = require('human-size');

// load config
const config = require('../config');

const task = (done) => {

    modernizr.build(config.modernizr, (result) => {
        let dest = path.join(config.scripts.destinationFolder, '/modernizr.js');
        let options = {}; // see https://github.com/mishoo/UglifyJS2#minify-options
        let target = uglifyjs.minify(result, options).code;
        let targetSize = humanSize(Buffer.byteLength(target, 'utf8'));

        writefile(dest, target, () => {
            log(colors.white('Build a custom modernizr for you at ' + colors.magenta(dest + ', ' + targetSize)));
            return done();
        });
    });
};

gulp.task('modernizr', task);
module.exports = task;
