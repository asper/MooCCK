
MooCCK.load('MooCCK.Core.Input');

MooCCK.Input.Select = new Class({
    Extends: MooCCK.Core.Input,
    initialize: function(module, options){
        this.parent(module, options);
        var select = new Element('select', {
            type: 'text',
            id: this.options.id,
            name: this.options.id
        });
        Object.each(this.options.options, function(text, value){
            var optionConf = { value: value, text: text };
            if(value == this.options.value) optionConf.selected = 'selected';
            new Element('option', optionConf).inject(select);
        }, this);
        this.options.value = select.options[select.selectedIndex].value; 
        select.addEvent('change', function(){ 
            this.options.value = select.options[select.selectedIndex].value; 
        }.bind(this)).inject(this.element);
    }
});