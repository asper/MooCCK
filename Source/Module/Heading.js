


MooCCK.load('MooCCK.Core.Module');

MooCCK.Module.Heading = new Class({
    Extends: MooCCK.Core.Module,
    name: 'Heading',
    inputs: {
        level: { type: 'Select', options: { '1': 'H1', '2': 'H2', '3': 'H3', '4': 'H4', '5': 'H5', '6': 'H6' }, label: 'Level' },
        content: { type: 'Text', label: 'Content', value: 'empty' }
    },
    display: function(){
        return new Element('h'+this.inputs.level.options.value, {text: this.inputs.content.options.value});
    }
});
