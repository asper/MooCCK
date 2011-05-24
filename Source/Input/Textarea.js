
MooCCK.load('MooCCK.Core.Input');

MooCCK.Input.Textarea = new Class({
    Extends: MooCCK.Core.Input,
    initialize: function(module, options){
        this.parent(module, options);
        var textarea = new Element('textarea', {
            id: this.options.id,
            name: this.options.id,
            value: this.options.value,
            text: this.options.value
        });
        textarea.addEvent('keyup', function(){ 
            this.options.value = textarea.value; 
        }.bind(this)).inject(this.element);
    }
});