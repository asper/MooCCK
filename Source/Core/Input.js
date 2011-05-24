
MooCCK.Input = {};

MooCCK.Core.Input = new Class({
    element: null,
    Implements: Options,
    module: null,
    options: {
        id: null,
        label: null,
        value: null
    },
    initialize: function( module, options ){
        this.setOptions(options);
        this.options.id = String.uniqueID();
        this.module = module;
        this.element = new Element('div', {
            'class': 'input'
        });
        this.element.label = new Element('label', {text: this.options.label, 'for': this.options.id}).inject(this.element);
    },
    toElement: function(){
        return this.element;
    },
    save: function(){
        return this.options.value;
    }
});