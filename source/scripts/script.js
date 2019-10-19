// import components
import $ from 'jquery';
import 'bootstrap/js/dist/util';
import 'bootstrap/js/dist/carousel';
import 'bootstrap/js/dist/tooltip';
import { tns } from "tiny-slider/src/tiny-slider"

// import demo module
import fooFighters from './demo-modules/foo-fighters';


// on document ready
$(function() {

    // enable bootstrap tooltips
    $('[data-toggle="tooltip"]').tooltip();

    // Learn to Fly!
    console.dir(fooFighters);
});
