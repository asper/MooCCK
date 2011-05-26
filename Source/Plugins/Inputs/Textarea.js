
MooCCK.load({core: 'Input'});

MooCCK.Inputs.Textarea = new Class({
    Extends: MooCCK.Input,
    type: 'Textarea',
    initialize: function(module, key, options){
        this.parent(module, key, options);
        var textarea = new Element('textarea', {
            id: this.key,
            name: this.key,
            value: this.value,
            text: this.value
        });
        textarea.addEvent('keyup', function(){ 
            this.value = textarea.value; 
        }.bind(this)).inject(this.element);
    }
});