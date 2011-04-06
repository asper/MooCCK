
/**
 * Dependencies : 
 * - More/Asset
 */

/**
 * Silent log if console is not enabled
 */
if( typeof(console) === undefined ) var console = { log: function(){} };

var MooCCK_BaseModuleLoaded = false;

/**
 * Array containing the list of loaded modules
 */
var MooCCK_LoadedModules = [];

/**
 * Main MooCCK class
 */
var MooCCK = new Class({
    Implements: [ Options ],
    options: {
        data: [],
        mode: 'html',
        modules: [ 'Heading', 'Paragraph' ]
    },
    element: null,
    modules: [],
    initialize: function( element, options ){
        this.element = document.id(element);
        if(!this.element) return;
        if(!this.setPath()) return;
        this.setOptions(options);
        this.element.store('cck', this);
        if(MooCCK_BaseModuleLoaded){
            this.loadModules();
        }
        else{
            Asset.javascript(this.path+'MooCCK_Module.js', {
                onLoad: function(){
                    MooCCK_BaseModuleLoaded = true;
                    this.loadModules();
                }.bind(this),
                events: {
                    error: function(){
                        console.log('Error loading base module : '+this.path+'MooCCK_Module.js');
                    }.bind(this)
                }
            });
        }
    },
/**
 * Sets the path using the script's src
 * Script tag must have the id 'MooCCK_Script'
 */
    setPath: function(){
        var script = document.id('MooCCK_Script');
        if(script){
            var scriptUrl = script.get('src');
            this.path = scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1 );
            return true;
        }
        console.log('MooCCK script id is not set');
        return false;
    },
/**
 * Loads all modules and then inits them if there was nos errors
 */
    loadModules: function(){
        var modulesToLoad = this.options.modules;
        var modulesToLoadCount = this.options.modules.length;
        this.options.data.each(function(module, i){
            if( MooCCK_LoadedModules.indexOf(module.type) === -1 ){
                modulesToLoad.push(module.type);
                modulesToLoadCount++;
                MooCCK_LoadedModules.push(module.type);
            }
        }.bind(this));
        var loadFunction = function(){
            modulesToLoadCount--;
            if( modulesToLoadCount === 0 ){
                this.initModules();
            }
        }.bind(this);
        modulesToLoad.each(function(moduleType, i){
            Asset.javascript(this.path+'Modules/'+moduleType+'.js', {
                onLoad: loadFunction,
                events: {
                    error: function(){
                        console.log('Error loading module "'+this.path+'Modules/'+moduleType+'.js'+'"');
                    }
                }
            });
        }.bind(this));
    },
/**
 * Instanciates all modules
 */
    initModules: function(){
        this.options.data.each(function(module, i){
            module.mode = this.options.mode;
            this.modules.push( new window['MooCCK_'+module.type](this.element, module) );
        }.bind(this));
        this.update();
    },
/**
 * Update the HTML with the module content
 */
    update: function(){
        this.element.empty();
        this.modules.each(function(module, i){
            module.toElement().inject(this.element);
        }.bind(this));
        var cckLinks = new Element('p', {
            'class': 'cck_links'
        });
        this.switchLink('Switch all').inject(cckLinks);
        this.switchLink('HTML', 'html').inject(cckLinks);
        this.switchLink('Form', 'form').inject(cckLinks);
        this.saveLink('Save').inject(cckLinks);
        this.addLink('Add').inject(cckLinks);
        cckLinks.inject(this.element);
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
        this.modules.each(function(module, i){
            if( !mode ){
                if(module.options.mode == 'html') mode = 'form';
                else mode = 'html';
            }
            module.options.mode = mode;
        });
        this.update();
    },
    saveLink: function(text){
        text = [text, 'Save'].pick();
        return new Element('a', {
            text: text,
            href: '#',
            events: {
                click: function(e){
                    e.preventDefault();
                    console.log(this.getConf());
                }.bind(this)
            }
        });
    },
    addLink: function(text){
        text = [text, 'Add'].pick();
        return new Element('a', {
            text: text,
            href: '#',
            events: {
                click: function(e){
                    e.preventDefault();
                    var select = new Element('select', {
                        events: {
                            change: function(){
                                var options = { mode: 'form' };
                                this.modules.push( new window['MooCCK_'+select.options[select.selectedIndex].value](this.element, options) );
                                this.update();
                            }.bind(this)
                        }
                    });
                    new Element('option', { value: 0, text: 'Choose a module type...', disabled: 'disabled', selected: 'selected' }).inject(select);
                    MooCCK_LoadedModules.each(function(moduleType, i){
                        new Element('option', { value: moduleType, text: moduleType }).inject(select);
                    });
                    select.inject(this.element);
                }.bind(this)
            }
        });
    },
    getConf: function(){
        var conf = [];
        this.modules.each(function(module){
            conf.push(module.getConf());
        });
        return conf;
    }
});
