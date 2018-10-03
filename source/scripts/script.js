// import jQuery
const $ = require('jquery');

// import node modules
// see https://getbootstrap.com/docs/4.1/getting-started/javascript/
require('popper.js');
require('bootstrap/js/dist/util');
require('bootstrap/js/dist/carousel');
require('bootstrap/js/dist/tooltip');

// on document ready
$(function() {

    // enable tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // include demo module
    require('./demo-module/demo-module');
});
