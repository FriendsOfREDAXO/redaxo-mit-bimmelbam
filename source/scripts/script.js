// import jQuery
import $ from 'jquery';

// import bootstrap components from node_modules folder
// see https://getbootstrap.com/docs/4.3/getting-started/webpack/
import 'popper.js';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tooltip';

// import demo module
import fooFighters from './demo-modules/foo-fighters';

// on document ready
$(function() {

    // enable bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Learn to Fly!
    console.dir(fooFighters);
});
