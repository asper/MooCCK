
MooCCK.Toolbar = new Class({
    initialize: function(){
        this.element = new Element('ul', {
            'class': 'moo_cck_toolbar'
        });
    },
    toElement: function(){
        var lis = this.element.getElements('li');
        if(lis){
            lis.removeClass('first').removeClass('last');
            lis[0].addClass('first');
            lis[lis.length-1].addClass('last');
        }
        return this.element;
    },
    inject: function(element, where){
        return this.toElement().inject(element, where);
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
        var span = new Element('span', {
            'class': cssClass
        });
        var select = new Element('select', {
            'name': cssClass,
            events: {
                change: function(e){
                    e.preventDefault();
                    callback(this.options[this.selectedIndex].value);
                    this.selectedIndex = 0;
                }
            }
        }).inject(span);
        select.selectedIndex = 0;
        new Element('option', {
            text: text,
            disabled: 'disabled',
            selected: 'selected'
        }).inject(select);
        options.each(function(option){
            new Element('option', option).inject(select);
        });
        this.li(span);
        return this;
    }
});