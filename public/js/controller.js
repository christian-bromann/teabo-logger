define([
    'jquery',
    'underscore',
    '/core/js/utils/subscribe_command.js',
    '/logger/js/view/logger.js'
], function( $, _, SubscribeCommand, LoggerView) {
    
    var LoggerController = function(options) {
        _.bindAll(this,'subscribeChannels','logEvent');
        window.app.eventDispatcher.bind('handshakeComplete',this.subscribeChannels);
        window.app.eventDispatcher.bind('all',this.logEvent);

        this.initialize();
    };

    LoggerController.prototype = {
        initialize: function() {
            this.view = new LoggerView({});
            console.log(this.view);
        },
        subscribeChannels: function() {
            new SubscribeCommand('/**', this.logEvent).execute();
        },
        logEvent: function(obj,channel) {
            this.view.addLog(obj,channel);
        }

    };

    return LoggerController;
});
