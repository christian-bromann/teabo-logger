/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-14
 * @requires nodeJS (http://nodejs.org/)
 * @version 0.1-rc-20120614
 * @description this file defines all rest services
 */

// include your modules and files you need
// you may need your module model to get and return the stored objects of the mongodb
var Model = require('../../modules/lao-logger/model/lao-logger').model;

/* function to show all stored log informations
 * it should always send a result to the client via res.send()
 *
 * @param
 *     req - request object
 *           contains request params
 *     res - respond object
 *           contains respond configurations
 * @returns null
 */
var showAllLogs = function(req,res) {
    Model.find(function(err,logs) {
        if(!err) {
            res.send(logs);
        } else {
            res.send('[Error] - objects could not be loaded');
        }
    });
};

/* function to show a log by a specific ID
 * it should always send a result to the client via res.send()
 *
 * @param
 *     req - request object
 *           contains request params
 *     res - respond object
 *           contains respond configurations
 * @returns null
 */
var showLogById = function(req,res) {
    var id = req.params.id;
    Model.findById(id,function(err,log) {
        if(!err) {
            res.send(log);
        } else {
            res.send('[Error] - object could not be loaded');
        }
    });
};

/* function to delete all logs from the database
 *
 * @param
 *     req - request object
 *           contains request params
 *     res - respond object
 *           contains respond configurations
 * @returns null
 */
var deleteLogs = function(req, res) {
    // find all objects (with empty query {})
    Model.find({}, function(err,logs) {
        if(!err) {
            // iterate through all elements
            for(var i = 0; i < logs.length; ++i) {
                // remove each one
                logs[i].remove();
            }
            res.send('Successfully removed all logs from database');
        } else {
            res.send('[ERROR] - objects could not be loaded');
        }
    });
};

// define and export your rest services
// it should be always an arry
exports.rest = [

    /* the array objects must be available in the following format
     *
     * url: URL of the rest service
     * type: request type [get,post,delete,put]
     * callback: function which will be executed
     */
    { url: '/lao-logger/list',     type: 'get', callback: showAllLogs },
    { url: '/lao-logger/show/:id', type: 'get', callback: showLogById },
    { url: '/lao-logger/delete',   type: 'get', callback: deleteLogs  }

];
