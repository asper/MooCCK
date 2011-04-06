
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
    wrappper: function( moduleElement ){
        this.element = new Element('div', {
            'class': 'module '+this.options.type.hyphenate().replace('-', '_').substr(1)
        });
        moduleElement.inject(this.element);
        this.element.store('module', this);
        var moduleLinks = new Element('p', {
            'class': 'module_links'
        });
        this.switchLink('Switch').inject(moduleLinks);
        this.switchLink('HTML', 'html').inject(moduleLinks);
        this.switchLink('Form', 'form').inject(moduleLinks);
        moduleLinks.inject(this.element);
        return this.element;
    },
    switchLink: function(text, mode){
        text = [text, 'Switch'].pick();
        mode = [mode, null].pick();
        return new Element('a', {
            text: text,
            href: '#',
            events: {
                click: function(e){
                    e.preventDefault();
                    this.switchMode(mode);
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
    }
});