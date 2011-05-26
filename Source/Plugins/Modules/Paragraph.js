

MooCCK.load({core: 'Module'});

MooCCK.Modules.Paragraph = new Class({
    Extends: MooCCK.Module,
    type: 'Paragraph',
    inputs: {
        content: { type: 'Textarea', options: {label: 'Content of the paragraph', value: 'Lorem ipsum...'} }
    },
    display: function(){
        return new Element('p', {text: this._inputs.content.value});
    }
});
