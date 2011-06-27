
MooCCK.Toolbar = new Class({
    tips: null,
    initialize: function(){
        this.element = new Element('ul', {
            'class': 'moo_cck_toolbar'
        });
        //this.tips = new Tips(null, {className: 'moo_cck_tip'});
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
    li: function(text, element){
        var li = new Element('li');
        element.inject(li); 
        li.inject(this.element);
        //li.store('tip:title', text);
        //this.tips.attach(li);
        return li;
    },
    button: function(text, cssClass, callback){
        callback = [callback, function(){}].pick();
        this.li(text, new Element('a', {
            text: text,
            'class': cssClass,
            'id': cssClass,
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
        this.li(text, span);
        return this;
    }
});