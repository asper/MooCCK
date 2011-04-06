
var MooCCK_Paragraph = new Class({
    
    Extends: MooCCK_Module,
    
    type: 'Paragraph',
    
    initialize: function( container, options ){
        this.options.text = null;
        this.parent( container, options );
    },
    
    html: function(){
        return new Element('p', {
            text: this.options.text
        });
    },
    
    form: function(){
        var form = new Element('div');
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
