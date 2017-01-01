// import jQuery
const $ = require('jquery');

// Bootstrap 3 doesn’t come with CommonJS pattern and therefore requires a global jQuery
window.$ = window.jQuery = $;

// import from our scripts folder
require('./ie10-viewport-bug-workaround/ie10-viewport-bug-workaround');

// import node modules
require('bootstrap-sass/assets/javascripts/bootstrap/carousel');
require('bootstrap-sass/assets/javascripts/bootstrap/transition');

// on document ready
$(function() {
    require('./demo-module/demo-module');
});