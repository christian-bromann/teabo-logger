/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-14
 * @requires nodeJS (http://nodejs.org/)
 * @version 0.1-rc-20120614
 * @description this file defines a mongodb model
 */

// include your modules and files you need
// to create a mongodb model you need to require the 'mongoose' module
var mongoose = require('mongoose'),
    
    // create the schema of your model
    // for more information take a look to the mongoose api on <http://mongoosejs.com/>
    schema = new mongoose.Schema({
        id:      Number,
        channel: String,
        object:  String
    }),
    // create a model according to the defined schema
    model  = mongoose.model('lao-logger', schema);

// export both objects
exports.schema = schema;
exports.model  = model;