
MooCCK.load({core: 'Toolbar'});

MooCCK.Modules = {};

MooCCK.Module = new Class({
    editor: null,
    data: {},
    type: null,
    key: null,
    element: null,
    inputs: {},
    _inputs: {},
    form: null,
    toolbar: null,
    initialize: function(editor, data){
        this.setup(editor, data);
    },
    setup: function(editor, data){
        this.editor = editor;
        this.key = String.uniqueID();
        this.data =  [data, {}].pick();
        this.element = new Element('div', {
            'class': 'moo_cck_module'
        });
        this.buildForm();
        this.buildToolbar();
        this.editor.modules[this.key] = this;
        this.inject(this.editor.container);
        this.editor.fireEvent('moduleAdd', [this]);
        return this;
    },
    toElement: function(){
        return this.element;
    },
    inject: function(element){
        return this.element.inject(element);
    },
    buildForm: function(){
        this.form = new Element('fieldset', {
            'class': 'moo_cck_fieldset'
        });
        new Element('legend', {
            text: this.type,
            'class': 'moo_cck_legend'
        }).inject(this.form);
        Object.each(this.inputs, function(input, key){
            MooCCK.load({input: input.type});
            new MooCCK.Inputs[input.type](this, key, input.options).inject(this.form);
        }, this);
        this.form.inject(this.element);
        return this;
    },
    buildToolbar: function(){
        this.toolbar = new MooCCK.Toolbar();
        this.toolbar.button('Delete', 'delete', this.del.bind(this));
        this.toolbar.inject(this.element);
    },
    del: function(){
        this.element.destroy();
        delete this.editor.modules[this.key];
    },
    save: function(){
        var data = {};
        Object.each(this._inputs, function(input, key){
            data[key] = input.save();
        });
        return {
            type: this.type,
            data: data
        };
    }
});