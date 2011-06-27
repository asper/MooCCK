
MooCCK.load({core: 'Toolbar'});

MooCCK.Editor = new Class({
    Implements: [ Events, Options ],
    element: null,
    options: {
        theme: 'default',
        data: [],
        modules: ['Paragraph', 'HtmlElement'],
        onSave: function(){}
    },
    modules: {},
    sortables: null,
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
        this.sortables = new Sortables(this.container, {
            clone: true,
            opacity: 0.7
        });
        this.buildSortableToolbar();
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
    order: function(){
        Object.each(this.modules, function(module, key){
            if(module.mode != 'preview'){
                module.mode = 'preview';
                module.update();
            }
        });
        this.element.addClass('moo_cck_ordering');
        this.toolbar.toElement().dispose();
        this.sortableToolbar.inject(this.element);
        this.sortables.attach();
    },
    buildSortableToolbar: function(){
        this.sortableToolbar = new MooCCK.Toolbar();
        this.sortableToolbar.button('Revert', 'order', function(){
            this.sortables.detach();
            this.sortableToolbar.toElement().dispose();
            this.toolbar.inject(this.element);
            this.element.removeClass('moo_cck_ordering');
        }.bind(this));
    },
    addModule: function(type, data){
        MooCCK.load({module: type});
        var mod = new MooCCK.Modules[type](this, data);
        return this;
    },
    deleteModule: function(key){
        this.modules[key].del();
    },
    buildToolbar: function(){
        this.toolbar = new MooCCK.Toolbar();
        this.toolbar.select('Add', 'add', [
            { text:'Paragraph', value: 'Paragraph' }, 
            { text:'HtmlElement', value: 'HtmlElement' }
        ], function(elementType){
            this.addModule(elementType);
        }.bind(this));
        this.toolbar.button('Reorder', 'order', this.order.bind(this));
        this.toolbar.button('Save', 'save', this.save.bind(this));
    }
});