
MooCCK.load({core: 'Toolbar'});

MooCCK.Editor = new Class({
    Implements: [ Events, Options ],
    element: null,
    options: {
        theme: 'default',
        data: [],
        modules: ['Paragraph'],
        onSave: function(){}
    },
    modules: {},
    initialize: function(element, options){
        this.setup(element, options);
    },
    setup: function(element, options){
        this.element = [document.id(element), new Element('div')].pick();
        this.container = new Element('div', {
            'class': 'moo_cck_modules'
        });
        this.setOptions(options);
        MooCCK.load({theme: this.options.theme});
        this.element.addClass('moo_cck '+this.options.theme);
        Array.each(this.options.data, function(module){
            this.addModule(module.type, module.data);
        }, this);
        this.container.inject(this.element);
        this.buildToolbar();
        this.toolbar.inject(this.element);
        return this;
    },
    toElement: function(){
        return this.element;
    },
    inject: function(element){
        return this.element.inject(element);
    },
    save: function(){
        var data = [];
        Object.each(this.modules, function(module, key){
            data.push(module.save());
        });
        this.fireEvent('save', [data, this]);
        return this;
    },
    addModule: function(type, data){
        MooCCK.load({module: type});
        new MooCCK.Modules[type](this, data);
        return this;
    },
    deleteModule: function(key){
        this.modules[key].del();
    },
    buildToolbar: function(){
        this.toolbar = new MooCCK.Toolbar();
        this.toolbar.button('Save', 'save', this.save.bind(this));
        this.toolbar.select('Add', 'add', [{ text:'Paragraph', value: 'Paragraph' }], function(elementType){
            this.addModule(elementType);
        }.bind(this));
    }
});