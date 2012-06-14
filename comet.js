var Model = require('../../modules/lao-logger/model/lao-logger').model,
    io    = [];

io['/service/lao-logger/add'] = function(bayeux,channel,obj) {
    
    var log = new Model({
        channel: obj.channel,
        object:  obj.object
    });
    
    log.save();
};

exports.io = io;