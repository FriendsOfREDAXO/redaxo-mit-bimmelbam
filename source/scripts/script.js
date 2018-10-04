// import jQuery
const $ = require('jquery');

// import bootstrap components from node_modules folder
// see https://getbootstrap.com/docs/4.1/getting-started/javascript/
require('popper.js');
require('bootstrap/js/dist/util');
require('bootstrap/js/dist/carousel');
require('bootstrap/js/dist/tooltip');

// import demo module
import fooFighters from './demo-modules/foo-fighters';

// on document ready
$(function() {

    // enable bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Learn to Fly!
    console.dir(fooFighters);
});
