

MooCCK.load({core: 'Module'});

MooCCK.Modules.HtmlElement = new Class({
    Extends: MooCCK.Module,
    type: 'HtmlElement',
    inputs: {
        type: { 
            type: 'Select', 
            options: {  
                label: 'Type',
                options: {
                    'p': 'Paragraph',
                    'div': 'Div', 
                    'blockquote': 'Blockquote', 
                    'h1': 'H1', 
                    'h2': 'H2', 
                    'h3': 'H3', 
                    'h4': 'H4', 
                    'h5': 'H5', 
                    'h6': 'H6'
                }
            }
        },
        content: { type: 'Textarea', options: {label: 'Content of the paragraph', value: 'Lorem ipsum...'} }
    },
    preview: function(){
        return new Element(this._inputs.type.value, {text: this._inputs.type.value});
    }
});
