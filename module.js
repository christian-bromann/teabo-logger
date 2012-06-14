/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-14
 * @requires nodeJS (http://nodejs.org/)
 * @version 0.1-rc-20120614
 *
 * This is an exampel module for the [lao] project. It describes the best way to create a new module. This is
 * a recommendation for a possible implementation. You don't have to follow this structure below.
 *
 * module structure:
 *
 * yourmodulename/
 *     |-- module.js
 *     |-- rest.js
 *     |-- comet.js
 *     |-- public/
 *     |    |-- css/
 *     |    |    +-- main.css
 *     |    |-- images/
 *     |    |    +-- some-images.gif
 *     |    |-- js/
 *     |    |    |-- controller.js
 *     |    |    +-- views/
 *     |    |    |    +-- your-view.js
 *     |    +-- templates
 *     |    |    +-- template.html
 *
 *
 * Everythink in the public directory gets reachable for the client in the following scheme:
 *
 *     -> <domain>/<modulename>/css/
 *     -> <domain>/<modulename>/images/
 *     -> <domain>/<modulename>/js/
 *     -> <domain>/<modulename>/images/
 *     -> ...
 *     -> for this exampel module:
 *     -> http://localhost:3000/lao-logger/css/main.css
 *
 *---------------------------------------------------------------------------------------------------------------
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

};

// register css file
// to include more css files, user the @import function in your main.css file
exports.style = 'css/main.css';

// add html code to the main template
// exports.template = '<b>some HTML stuff here';

// export your rest service array
exports.rest = service.rest;

// export your comet services
exports.io = pubsub.io;