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
         'text!/lao-logger/templates/list.html'
], function($, _, Backbone, loggerTemplate) {

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
            _.bindAll(this,'render');

            // render view
            this.render();
            this.nr = 0;
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

            // set server logs (via socket stream) apart from client logs (event dispatcher events)
            if(typeof param1 !== 'string') {

                // events on server site
                $(this.el).find('div').prepend('<b>'+ (++this.nr) +'. Server Event: </b><br><i>Object:</i> ' + JSON.stringify(param1) + '<br><br>');
            
            } else {
              
                // events on client site
                $(this.el).find('div').prepend('<b>'+ (++this.nr) +'. Client Event:</b><br><i>Channel:</i> ' + JSON.stringify(param1) + '<br><i>Object:</i> ' + JSON.stringify(param2) + '<br><br>');
            
            }
            
        }
    });

    return LoggerView;
});