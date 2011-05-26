
MooCCK.Inputs = {};

MooCCK.Input = new Class({
    Implements: [ Events, Options ],
    module: null,
    options: {
        label: null,
        value: null
    },
    type: null,
    key: null,
    value: null,
    element: null,
    initialize: function(module, key, options){
        this.setup(module, key, options);
    },
    setup: function(module, key, options){
        this.module = module;
        this.key = key;
        this.setOptions(options);
        this.value = this.module.data[key] ? this.module.data[key] : this.options.value;
        this.element = new Element('div', {
            'class': 'moo_cck_input '+this.type+' '+this.key
        });
        if(this.options.label){
            new Element('label', {
                text: this.options.label,
                'for': this.key+'_'+this.module.key
            }).inject(this.element);
        }
        this.module._inputs[this.key] = this;
        this.inject(this.module.form);
        return this;
    },
    toElement: function(){
        return this.element;
    },
    inject: function(element){
        return this.element.inject(element);
    },
    save: function(){
        return this.value;
    }
});