
MooCCK.Toolbar = new Class({
    initialize: function(){
        this.element = new Element('ul', {
            'class': 'moo_cck_toolbar'
        });
    },
    toElement: function(){
        return this.element;
    },
    inject: function(element){
        return this.element.inject(element);
    },
    li: function(element){
        var li = new Element('li');
        element.inject(li); 
        li.inject(this.element);
        return li;
    },
    button: function(text, cssClass, callback){
        this.li(new Element('a', {
            text: text,
            'class': cssClass,
            'href': '#',
            events: {
                click: function(e){
                    e.preventDefault();
                    callback();
                }
            }
        }));
        return this;
    },
    select: function(text, cssClass, options, callback){
        var select = new Element('select', {
            'class': cssClass,
            'name': cssClass,
            events: {
                change: function(e){
                    e.preventDefault();
                    callback(this.options[this.selectedIndex].value);
                    this.selectedIndex = 0;
                }
            }
        });
        new Element('option', {
            text: text,
            disabled: 'disabled',
            selected: 'selected'
        }).inject(select);
        options.each(function(option){
            new Element('option', option).inject(select);
        });
        this.li(select);
        return this;
    }
});