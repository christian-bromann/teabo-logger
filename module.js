/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-14
 * @requires nodeJS (http://nodejs.org/)
 * @version 0.1-rc-20120614
 * @description the main module file, exports all important services
 */

/* at first load all your modules and files you need */

// include file with IO services
var pubsub  = require('./comet');
// include file with rest services
var service = require('./rest');

/* init function
 * is executed when module gets loaded
 */
exports.init = function() {

    // do something exciting
    // ...

};

// register css file
// to include more css files, user the @import function in your main.css file
exports.style = 'css/main.css';

// add html code to the main template
// exports.template = '<b>some HTML stuff here';

// export your rest service array
exports.rest = service.rest;

// export your comet services
exports.io = pubsub.comet;