
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
        var textarea = this.textarea('Paragraph content', 'text', {rows: 10}).inject(form);
        return form;
    }
    
});
