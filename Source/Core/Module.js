
MooCCK.Module = {};

MooCCK.Core.Module = new Class({
    Implements: Options,
    mode: 'display',
    name: 'Module',
    inputs: {},
    options: {
        inputs: {}
    },
    initialize: function(editor, options){
        this.editor = editor;
        this.setOptions(options);
        this.inputs = Object.map(this.inputs, function(input, key){
            if(this.options.inputs[key] !== undefined){
                input.value = this.options.inputs[key];
            }
            MooCCK.load( 'MooCCK.Input.'+input.type );
            return new MooCCK.Input[input.type](this, input);
        }, this);
        this.wrapper = new Element('div', {
            'class': 'module '+this.name
        });
        this.form = this.buildForm();
    },
    buildForm: function(){
        var fieldset = new Element('fieldset');
        new Element('legend', { text: this.name }).inject(fieldset);
        Object.each(this.inputs, function(input){
            input.toElement().inject(fieldset);
        });
        return fieldset;
    },
    toElement: function(){
        return this.wrapper;
    },
    update: function(){
        var content = this.mode == 'form' ? this.form : this.display();
        this.wrapper.empty().removeClass('form').removeClass('display').addClass(this.mode);
        content.inject(this.wrapper);
        return this;
    },
    display: function(){
        return new Element('div');
    },
    save: function(){
        var conf = { type: this.options.type, inputs: {} };
        Object.each(this.inputs, function(input, key){
            conf.inputs[key] = input.save();
        });
        return conf;
    },
    toolbar: function(){
        MooCCK.load('MooCCK.Core.Toolbar');
        var toolbar = new MooCCK.Core.Toolbar();
        toolbar.button('Toggle mode', this.toggleMode.bind(this));
        return toolbar;
    },
    changeMode: function( mode ){
        if(mode === undefined){
            mode = this.mode == 'form' ? 'display' : 'form';
        }
        this.mode = mode;
        this.update();
        return this;
    }
});