define([ 'jquery', 
         'underscore', 
         'backbone', 
         'text!/logger/templates/list.html' 
], function($, _, Backbone, loggerTemplate) {

    var LoggerView = Backbone.View.extend({
        tagName: 'div',
        className: 'logger',
        events: {
            
        },
        initialize : function() {
            _.bindAll(this,'render');
            this.render();
            this.nr = 0;
        },
        render : function() {
            var data             = {},
                compiledTemplate = _.template(loggerTemplate, data);
            
            $(this.el).html(compiledTemplate);
            $('body').append(this.el);
        },
        unrender : function() {
            this.el.empty();
        },
        addLog: function(param1,param2) {
            if(typeof param1 !== 'string') {
                $(this.el).find('div').prepend('<b>'+ (++this.nr) +'. Server Event: </b><br><i>Object:</i> ' + JSON.stringify(param1) + '<br><br>');
            } else {
                $(this.el).find('div').prepend('<b>'+ (++this.nr) +'. Client Event:</b><br><i>Channel:</i> ' + JSON.stringify(param1) + '<br><i>Object:</i> ' + JSON.stringify(param2) + '<br><br>');
            }
            
        }
    });

    return LoggerView;
});