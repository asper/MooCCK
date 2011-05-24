
MooCCK.load('MooCCK.Core.Input');

MooCCK.Input.Text = new Class({
    Extends: MooCCK.Core.Input,
    initialize: function(module, options){
        this.parent(module, options);
        var textinput = new Element('input', {
            type: 'text',
            id: this.options.id,
            name: this.options.id,
            value: this.options.value
        });
        textinput.addEvent('keyup', function(){ 
            this.options.value = textinput.value; 
        }.bind(this)).inject(this.element);
    }
});