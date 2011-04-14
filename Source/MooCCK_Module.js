
/**
 * Base for all CCK modules
 */
var MooCCK_Module = new Class({
    Implements: [ Options ],
    container: null,
    options: {
        type: null,
        mode: 'form'
    },
    initialize: function( container, options ){
        this.container = container;
        this.setOptions( options );
    },
    toElement: function(){
        var out = this.options.mode == "form" ? this.form() : this.html();
        return this.wrappper(out);
    },
    form: function(){
        return new Element('div');
    },
    html: function(){
        return new Element('div');
    },
    wrappper: function( moduleElement, options ){
        options = Object.merge({
            'class': null
        }, options);
        var classSuffix = 'module ' + this.options.mode + ' ' + this.options.type.hyphenate().replace('-', '_').substr(1);
        options['class'] = options['class'] ? options['class']+' '+classSuffix : classSuffix;
        this.element = new Element('div', options);
        moduleElement.inject(this.element);
        this.element.store('module', this);
        var moduleLinks = new Element('p', {
            'class': 'module_links'
        });
        this.switchLink('Switch', {
            cssClass: 'switch_mode'
        }).inject(moduleLinks);
        this.switchLink('HTML', {
            mode: 'html',
            cssClass: 'html'
        }).inject(moduleLinks);
        this.switchLink('Form', {
            mode: 'form',
            cssClass: 'form'
        }).inject(moduleLinks);
        moduleLinks.inject(this.element);
        return this.element;
    },
    switchLink: function(text, options){
        options = Object.merge({
            mode: null,
            cssClass: null
        }, options);
        text = [text, 'Switch all'].pick();
        return new Element('a', {
            text: text,
            href: '#',
            'class': options.cssClass,
            events: {
                click: function(e){
                    e.preventDefault();
                    this.switchMode(options.mode);
                }.bind(this)
            }
        });
    },
    switchMode: function( mode ){
        mode = [mode, null].pick();
        if( mode != 'html' && mode != 'form' && mode !== null ){
            console.log('Wrong mode settings');
            return false;
        }
        if( !mode ){
            if(this.options.mode == 'html') mode = 'form';
            else mode = 'html';
        }
        this.options.mode = mode;
        this.container.retrieve('cck').update();
    },
    getConf: function(){
        var options = this.options;
        delete this.options.mode;
        return this.options;
    },
    text: function(label, optionKey, options){
        var input = new Element('input', Object.merge({
            type: 'text',
            events: {
                keyup: function(){
                    this.options[optionKey] = input.value;
                }.bind(this)
            },
            value: this.options[optionKey]
        }, options));
        return this.inputWrapper(label, input);
    },
    textarea: function(label, optionKey, options){
        var input = new Element('textarea', Object.merge({
            events: {
                keyup: function(){
                    this.options[optionKey] = input.value;
                }.bind(this)
            },
            value: this.options[optionKey]
        }, options));
        return this.inputWrapper(label, input);
    },
    select: function(label, optionKey, optionKeyValuePairs, selectConf){
        var input = new Element('select', Object.merge({
            events: {
                change: function(){
                    this.options.level = input.options[ input.selectedIndex ].value;
                }.bind(this)
            }
        }, selectConf));
        Object.each(optionKeyValuePairs, function(text, value){
            var optionConf = { value: value, text: text };
            if(value == this.options[optionKey]) optionConf.selected = 'selected';
            new Element('option', optionConf).inject(input);
        }.bind(this));
        return this.inputWrapper(label, input);
    },
    inputWrapper: function(label, input, options){
        var wrapper = Element('div', Object.merge({
            'class': 'input'
        }, options));
        new Element('label', {
            text: label
        }).inject(wrapper);
        input.inject(wrapper);
        return wrapper;
    }
});