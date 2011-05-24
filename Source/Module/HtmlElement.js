


MooCCK.load('MooCCK.Core.Module');

MooCCK.Module.HtmlElement = new Class({
    Extends: MooCCK.Core.Module,
    name: 'HtmlElement',
    inputs: {
        type: { 
            label: 'Type',
            type: 'Select', 
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
        },
        content: { type: 'Textarea', label: 'Content', value: 'Lorem ipsum...' }
    },
    display: function(){
        console.log(this.inputs.type);
        return new Element(this.inputs.type.options.value, {text: this.inputs.content.options.value});
    }
});
