
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
    mode: 'preview',
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
        //this.buildToolbar();
        this.editor.modules[this.key] = this;
        this.update();
        this.inject(this.editor.container);
        this.editor.fireEvent('moduleAdd', [this]);
        return this;
    },
    toElement: function(){
        return this.element;
    },
    inject: function(element, where){
        return this.element.inject(element, where);
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
        this.formToolbar().inject(this.form);
        return this;
    },
    formToolbar: function(){
        this._formToolbar = new MooCCK.Toolbar();
        this._formToolbar.button('Delete', 'delete', this.del.bind(this));
        this._formToolbar.button('Close', 'close', this.close.bind(this));
        return this._formToolbar;
    },
    viewToolbar: function(){
        this._viewToolbar = new MooCCK.Toolbar();
        this._viewToolbar.button('Edit', 'edit', this.edit.bind(this));
        return this._viewToolbar;
    },
    del: function(){
        this.element.destroy();
        delete this.editor.modules[this.key];
    },
    close: function(){
        this.mode = 'preview';
        this.update();
    },
    edit: function(){
        this.mode = 'form';
        this.update();
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
    },
    update: function(){
        this.element.empty();
        if(this.mode == 'form'){
            this.form.inject(this.element);
            //this.toolbar.inject(this.element);
        }
        else{
            var el = this.preview();
            if(!this._viewToolbar){
                this.viewToolbar();
            }
            this._viewToolbar.inject(el);
            el.inject(this.element);
        }
    }
});