/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-14
 * @requires requireJS (http://requirejs.org/)
 * @version 0.1-rc-20120614
 * @description controller of your module
 */

// define your required files / modules
define([
    /**
     * Add your javascript and template files you need here. There are already several libraries included. If you
     * want to use them, you only have to write the following short terms:
     *
     * jquery : jQuery library <http://jquery.com/>
     * underscore : Underscore library <http://underscorejs.org/>
     * backbone : Backbone library <http://backbonejs.org/>
     * jqueryui : UI library from jQuery <http://jqueryui.com/>
     * jquerycollision : a jQuery collision plugin <http://sourceforge.net/projects/jquerycollision/>
     * jqueryfancy : a lightbox plugin from jQuery <http://fancybox.net/>
     * text : requireJS plugin to load templates <http://requirejs.org/docs/api.html#text>
     * faye : simple pub/sub messaging <http://faye.jcoglan.com/>
     *
     */

    'jquery',
    'underscore',
    '/core/js/utils/subscribe_command.js',
    '/lao-logger/js/view/logger.js'
], function( $, _, SubscribeCommand, LoggerView) {
    
    // create controller object
    var LoggerController = function(options) {
        // bind "this" to your function via underscores _.bindAll function
        _.bindAll(this,'subscribeChannels','logEvent');

        // bind events and assign it to a special function
        window.app.eventDispatcher.bind('handshakeComplete',this.subscribeChannels);
        window.app.eventDispatcher.bind('all',this.logEvent); // 'all' matches all events

        // call your special init function
        this.initialize();
    };

    LoggerController.prototype = {

        initialize: function() {
            // initialize your view
            this.view = new LoggerView({});
        },

        subscribeChannels: function() {
            // use the subscribe command to register the channels, you want to listen to
            // with SubscribeCommand(...).execute() the command gets executed immediately
            new SubscribeCommand('/**', this.logEvent).execute();

            // if you have more subscribe commands, put them into an array and use the group command function like this:
            // var commands = [];
            // commands.push(new SubscribeCommand(...));
            // commands.push(new SubscribeCommand(...));
            // commands.push(new SubscribeCommand(...));
            // window.app.groupCommand.addCommands(commands);
        },

        logEvent: function(obj,channel) {
            // add event log if event was called
            this.view.addLog(obj,channel);
        }

    };

    return LoggerController;
});
