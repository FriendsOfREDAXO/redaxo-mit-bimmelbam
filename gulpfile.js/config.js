/**
 * config
 * contains preferences for gulp tasks, folders, extensions et al
 */

const config = {

    // A-Z!

    // Autoprefixer (adds vendor prefixes to rules by http://caniuse.com)
    // https://github.com/postcss/autoprefixer
    'autoprefixer': {
        'browsers': [
            'last 3 versions', // base support
            'Chrome >= 21', // full flexbox support
            'Edge >= 12',
            'Explorer >= 10', // because <10 is shitty
            'Firefox >= 28', // full flexbox support
            'iOS >= 7.1', // full flexbox support
            'Opera >= 15',
            'Safari >= 6.1' // full flexbox support
        ]
    },

    // Browsersync
    // https://www.browsersync.io/docs/options
    'browserSync': {
        'proxy': process.env.APP_HOST,
        'port': 3000,
        'open': false,
        'reloadOnRestart': true,
        'notify': false,
        'reloadDelay': 0,
        'ghostMode': false // disable mirroring clicks, scrolls and forms. it’s too buggy.
    },

    // Clean
    // clean asset folders before new assets are generated
    'clean': {
        'cleanableTasks': [
            'images',
            'templates',
            'scripts',
            'styles',
            'svg'
        ]
    },

    // cssnano (minifies CSS)
    // http://cssnano.co/options/
    'cssnano': {
        'zindex': false,
        'discardUnused': false,
        'mergeIdents': false,
        'reduceIdents': false
    },

    // Images
    'images': {
        'sourceFiles': ['./source/images/**/*.{jpg,png,gif,svg}'],
        'destinationFolder': './app/assets/images',
        'watchFiles': ['./source/images/**/*.{jpg,png,gif,svg}'],
        'cleanFiles': ['./app/assets/images/*.{jpg,png,gif,svg}']
    },

    // Modernizr
    // https://modernizr.com/docs
    'modernizr': {
        'feature-detects': [
            'css/animations',
            'css/filters',
            'css/flexbox',
            'css/pointerevents',
            'css/transforms3d',
            'css/transitions',
            'css/vhunit',
            'css/vwunit',
            'css/backgroundblendmode'
        ],
        'options': [
            'setClasses'
        ],
        'classPrefix': ''
    },

    // Templates
    'templates': {
        'sourceFolder': './source/templates',
        'sourceFiles': ['./source/templates/*.njk'],
        'destinationFolder': './app/demo',
        'watchFiles': ['./source/templates/**/*.{njk,json}'],
        'cleanFiles': ['./app/demo/*.html']
    },

    // Scripts
    'scripts': {
        'sourceFiles': ['./source/scripts/script.js'],
        'destinationFolder': './app/assets/js',
        'watchFiles': ['./source/scripts/**/*.js'],
        'cleanFiles': ['./app/assets/js/*.{js,map}']
    },

    // Styles
    'styles': {
        'sourceFiles': ['./source/styles/*.scss'],
        'destinationFolder': './app/assets/css',
        'watchFiles': ['./source/styles/**/*.scss'],
        'cleanFiles': ['./app/assets/css/*.{css,map}']
    },

    // SVG
    // combines SVG files to into one with <symbol> elements (»SVG sprite«)
    'svg': {
        'sourceFiles': ['./source/svg/**/*.svg'],
        'destinationFolder': './source/templates/svg',
        'watchFiles': ['./source/svg/**/*.svg'],
        'cleanFiles': ['./app/assets/svg/*.svg']
    },

    // Watch
    // watches for file changes and fires up related tasks
    'watch': [
        {'images': ['images']},
        {'scripts': ['scripts']},
        {'styles': ['styles']},
        {'svg': ['svg']},
        {'templates': ['templates-reload']}
    ]
};

module.exports = config;