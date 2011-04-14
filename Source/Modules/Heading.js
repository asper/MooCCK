
var MooCCK_Heading = new Class({
    
    Extends: MooCCK_Module,
    
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
        this.select('Heading Level', 'level', {
            '1': 'H1',
            '2': 'H2',
            '3': 'H3',
            '4': 'H4',
            '5': 'H5',
            '6': 'H6'
        }).inject(form);
        this.text('Heading Content', 'text').inject(form);
        return form;
    }
    
});
