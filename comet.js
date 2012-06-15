/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-16
 * @requires nodeJS (http://nodejs.org/)
 * @version 0.1-rc-20120614
 * @description this file defines all comet services
 */

// include your modules and files you need
// you may need your module model to store the objects of the request
var Model = require('../../modules/lao-logger/model/lao-logger').model,

    // put all your function into a comet array with the channel (you want to listen to) as key
    comet = [];

/* store each log into the DB
 *
 * @param bayeux - comet object
 * @param channel - channel of the WebSocket request
 * @param obj - object which was sent with the request
 *
 * @returns null
 */
comet['/service/lao-logger/add'] = function(bayeux,channel,obj) {
    
    // create a mongo object
    var log = new Model({
        channel: obj.channel,
        object:  obj.object
    });
    
    // store log into the DB
    log.save();
};

// export your comet services
exports.comet = comet;