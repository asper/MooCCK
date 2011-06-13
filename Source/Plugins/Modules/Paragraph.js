

MooCCK.load({core: 'Module'});

MooCCK.Modules.Paragraph = new Class({
    Extends: MooCCK.Module,
    type: 'Paragraph',
    inputs: {
        content: { type: 'Textarea', options: {label: 'Content of the paragraph', value: 'Lorem ipsum...'} }
    },
    preview: function(){
        return new Element('p', {html: this._inputs.content.value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br />')});
    }
});
