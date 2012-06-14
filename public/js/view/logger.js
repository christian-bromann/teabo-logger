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
        
        // the initialize function gets called when you create a view object
        initialize : function() {
            // bind "this" to your function via underscores _.bindAll function
            _.bindAll(this,'render','addLog','sendIORequest');

            // render view
            this.render();
            this.nr = 0;
            this.i = 0;
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

            // define vars
            var channel, object;

            // set server logs (via socket stream) apart from client logs (event dispatcher events)
            if(typeof param1 !== 'string') {

                // define vars
                channel = '',
                object  = JSON.stringify(param1);

                // events on server site
                $(this.el).find('div').prepend('<b>'+ (++this.nr) +'. Server Event: </b><br><i>Object:</i> ' + object + '<br><br>');

            } else {

                // define vars
                channel = JSON.stringify(param1),
                object  = JSON.stringify(param2);
              
                // events on client site
                $(this.el).find('div').prepend('<b>'+ (++this.nr) +'. Client Event:</b><br><i>Channel:</i> ' + channel + '<br><i>Object:</i> ' + object + '<br><br>');
            
                this.sendIORequest(channel,object);

            }

            
        },

        sendIORequest: function(channel,object) {
            
            //
            new ModelCommand(
                '/service/lao-logger/add',
                {
                    channel: channel,
                    object:  object
                }
            ).execute();
            console.log('execute io ', object);
        }
    });

    return LoggerView;
});