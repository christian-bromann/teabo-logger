/* [LAO] Logger Module
 * @author Christian Bromann <contact@christian-bromann.com>
 * @date 2012-06-14
 * @requires requireJS (http://requirejs.org/)
 * @version 0.1-rc-20120614
 * @description view of your module
 */

// define your required files / modules
define([ 'jquery',
         'underscore',
         'backbone',
         '/core/js/utils/model_command.js',
         'text!/lao-logger/templates/list.html'
], function($, _, Backbone, ModelCommand, loggerTemplate) {

    var LoggerView = Backbone.View.extend({
        
        // define your backbone view
        // for more information take a look to the backbone documentation <http://backbonejs.org/>
        tagName: 'div',
        className: 'logger',
        
        events: {
            // register view events
            // 'click a' : 'someFunction'
        },
        
        // the initialize function is called when you create a view object
        initialize : function() {
            // bind "this" to your function via underscores _.bindAll function
            _.bindAll(this,'render','addLog','sendIORequest');

            // id of each log
            this.nr   = 0;

            // render view
            this.render();
        },

        render : function() {
            // define a data object which pass javascript objects to the template
            var data             = {},
                compiledTemplate = _.template(loggerTemplate, data);
            
            // append your rendered html into the document DOM
            $(this.el).html(compiledTemplate);
            $('body').append(this.el);
        },

        // provide a function which removes the view
        unrender : function() {
            this.el.empty();
        },

        // add log informations to the view
        addLog: function(param1,param2) {

            // return if the event comes from this module - when a log is sent, a server event is called too,
            // which will also be recognized and will send a new log to the server again and so one...
            if(JSON.stringify(param1).match(/\{"id":(\d+)/)) {
                return;
            }

            // define vars
            var channel, object,
                id = ++this.nr;

            // set server logs (via socket stream) apart from client logs (event dispatcher events)
            if(typeof param1 !== 'string') {

                // define vars
                channel = '',
                object  = JSON.stringify(param1);

                // events on server site
                // param2 is here always undefined
                $(this.el).find('div').prepend(
                    '<b>'+ id +'. Server Event: </b><br>' +
                    '<i>Object:</i> ' + object + '<br><br>'
                );

            } else {

                // define vars
                channel = JSON.stringify(param1),
                object  = JSON.stringify(param2);
              
                // events on client site
                $(this.el).find('div').prepend(
                    '<b>'+ id +'. Client Event:</b><br>' +
                    '<i>Channel:</i> ' + channel + '<br>' +
                    '<i>Object:</i> ' + object + '<br><br>'
                );
            
            }

            // send each client event via web socket to the server to store them in a DB
            this.sendIORequest(id,channel,object);

        },

        // send log to server via the model command
        sendIORequest: function(id,channel,object) {
            
            // The model command send a request to the given channel via WebSocket to the server.
            // Like the subscribe command you can collect them in an array to put all in a group command
            // (take a look to the subscribeChannels() function in controller.js)
            new ModelCommand(
                // the channel you listen on server side
                '/service/lao-logger/add',

                // your object you want to work with
                {
                    id:      id,
                    channel: channel,
                    object:  object
                }
            ).execute();

        }
    });

    return LoggerView;
});