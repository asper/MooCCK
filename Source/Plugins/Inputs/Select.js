
MooCCK.load({core: 'Input'});

MooCCK.Inputs.Select = new Class({
    Extends: MooCCK.Input,
    type: 'Select',
    initialize: function(module, key, options){
        this.parent(module, key, options);
        var select = new Element('select', {
            id: this.key,
            name: this.key
        });
        Object.each(this.options.options, function(text, value){
            var optionConf = { value: value, text: text };
            if(value == this.value) optionConf.selected = 'selected';
            new Element('option', optionConf).inject(select);
        }, this);
        this.value = select.options[select.selectedIndex].value; 
        select.addEvent('change', function(){ 
            this.value = select.options[select.selectedIndex].value; 
        }.bind(this)).inject(this.element);
    }
});