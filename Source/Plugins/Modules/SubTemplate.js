

MooCCK.load({core: 'Module'});

MooCCK.Modules.SubTemplate = new Class({
    Extends: MooCCK.Module,
    type: 'SubTemplate',
    inputs: {
        type: { 
            type: 'Select', 
            options: {  
                label: 'Type',
                options: {
                    '2cols': '2 columns',
                    '3cols': '3 columns'
                }
            }
        }
    },
    preview: function(){
        return new Element('p', {html: this._inputs.content.value.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '<br />')});
    }
});
