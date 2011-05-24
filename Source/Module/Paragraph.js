

MooCCK.load('MooCCK.Core.Module');

MooCCK.Module.Paragraph = new Class({
    Extends: MooCCK.Core.Module,
    name: 'Paragraph',
    inputs: {
        content: { type: 'Textarea', label: 'Content of the paragraph', value: 'Lorem ipsum...' }
    },
    display: function(){
        return new Element('p', {text: this.inputs.content.options.value});
    }
});
