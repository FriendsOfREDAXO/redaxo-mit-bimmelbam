const gulp = require('gulp');
const log = require('fancy-log');
const colors = require('ansi-colors');
const notifier = require('node-notifier');

// load config
const config = require('../config');

const task = (done) => {
    for (let v of config.watch) {

        // remove './' from glob
        // workaround for https://github.com/shama/gaze/issues/167
        let glob = config[Object.keys(v)].watchFiles.map((w) => w.replace(/^\.\//, ''));

        // init watch task
        gulp.watch(glob, {
            cwd: process.cwd() + '/' // workaround
        }, gulp.series(v[Object.keys(v)]));
    }

    // log info about frontend demo
    log(colors.white('Find frontend demo at: ' + colors.magenta('http://localhost:' + config.browserSync.port + '/demo')));

    // throw notification
    notifier.notify({
        title: 'ROOOAAAARRRRRR!',
        message: 'http://localhost:' + config.browserSync.port,
        open: 'http://localhost:' + config.browserSync.port,
        sound: 'Purr',
        contentImage: __dirname + '/../assets/trex.png'
    });

    done();
};

gulp.task('watch', task);
module.exports = task;
