
MooCCK.Core = {};

MooCCK.Core.Editor = new Class({
    Implements: [ Options, Events ],
    modules: [],
    options: {
        basePath: ".",
        modules: [],
        theme: 'default',
        onSave: function(){}
    },
    initialize: function(element, options){
        this.setup(element, options);
    },
    setup: function(element, options){
        this.element = document.id(element).addClass('moo_cck loading');
        this.container = new Element('div', {
            'class': 'container'
        });
        this.moduleContainer = new Element('div', {
            'class': 'modules'
        }).inject(this.container);
        this.setOptions(options);
        this.loadTheme();
        this.options.modules.each(function(module){
            this.addModule(module.type, module);
        }.bind(this));
        this.toolbar().toElement().inject(this.container);
        this.element.removeClass('loading');
        this.container.inject(this.element);
        return this;
    },
    addModule: function(type, options){
        var moduleType = 'MooCCK.Module.'+type;
        options = options ? options : {};
        options.type = type;
        MooCCK.load(moduleType);
        var moduleInstance = new MooCCK.Module[type](this, options);
        this.modules.push(moduleInstance);
        moduleInstance.update().toElement().inject(this.moduleContainer);
        return this;
    },
    update: function(){
        Array.each(
            this.modules, 
            function(module){
                module.update();
            }, 
            this
        );
        return this;
    },
    loadTheme: function(){
        var theme = this.options.theme;
        if(!MooCCK.loaded.themes.contains(theme)){
            new Element('link', {
                rel: 'stylesheet',
                type: 'text/css',
                href: MooCCK.basePath+'Theme/'+theme+'.css'
            }).inject(document.getElement('head'));
            MooCCK.loaded.themes.push(theme);
        }
        return this;
    },
    toolbar: function(){
        MooCCK.load('MooCCK.Core.Toolbar');
        var toolbar = new MooCCK.Core.Toolbar();
        toolbar.button('Switch all to form', this.buttons.form.bind(this));
        toolbar.button('Switch all to preview', this.buttons.preview.bind(this));
        toolbar.button('Toggle all', this.buttons.toggle.bind(this));
        toolbar.button('Save', this.save.bind(this));
        toolbar.button('New', this.buttons.add.bind(this));
        return toolbar;
    },
    // Toolbar actions
    buttons: {
        add: function(){
            var wrapper = new Element('div');
            var select = new Element('select').inject(wrapper);
            new Element('option', {
                disabled: 'disabled',
                selected: 'selected'
            }).inject(select);
            Array.each(this.options.allowedModules, function(module, i){
                new Element('option', {
                    value: module,
                    text: module
                }).inject(select);
            });
            select.addEvent('change', function(){
                var type = select.options[select.selectedIndex].value; 
                this.addModule(type);
            }.bind(this));
            wrapper.inject(this.element);
            return this;
        },
        form: function(){
            this.modules.each(function(module, i){
                module.changeMode('form');
            });
            return this;
        },
        preview: function(){
            this.modules.each(function(module, i){
                module.changeMode('display');
            });
            return this;
        },
        toggle: function(){
            this.modules.each(function(module, i){
                module.changeMode();
            });
            return this;
        }
    },
    save: function(){
        var modules = [];
        Array.each(this.modules, function(module){
            modules.push(module.save());
        });
        this.fireEvent('save', [modules]);
        return this;
    }
});