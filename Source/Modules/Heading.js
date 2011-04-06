
var MooCCK_Heading = new Class({
    
    Extends: MooCCK_Module,
    
    type: 'Heading',
    
    initialize: function( container, options ){
        this.options.text = null;
        this.options.level = 1;
        this.parent( container, options );
    },
    
    html: function(){
        return new Element('h'+this.options.level, {
            text: this.options.text
        });
    },
    
    form: function(){
        var form = new Element('div');
        var level = new Element('select');
        level.addEvent('change', function(){
            this.options.level = level.options[ level.selectedIndex ].value;
        }.bind(this));
        (6).times(function(i){
            var j = i+1;
            var options = { value: j, text: j };
            if(j == this.options.level) options.selected = 'selected';
            new Element('option', options).inject(level);
        }.bind(this));
        level.inject(form);
        var text = new Element('input', {
            type: 'text',
            events: {
                keyup: function(){
                    this.options.text = text.value;
                }.bind(this)
            },
            value: this.options.text
        }).inject(form);
        return form;
    }
    
});
