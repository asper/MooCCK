
MooCCK.Core.Toolbar = new Class({
    initialize: function(){
        this.element = new Element('div', {
            'classs': 'toolbar'
        });
    },
    toElement: function(){
        return this.element;
    },
    button: function(text, callback){
        new Element('a', {
            text: text,
            href: '#',
            'class':  text.hyphenate().replace('-', '_').substr(1),
            events: {
                click: function(e){
                    e.preventDefault();
                    callback();
                }
            }
        }).inject(this.element);
    }
});