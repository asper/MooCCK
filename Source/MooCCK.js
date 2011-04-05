
/**
 * Dependencies : 
 * - More/Asset
 */

/**
 * Silent log if console is not enabled
 */
if( typeof(console) === undefined ) var console = { log: function(){} };
 

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
        data: []
    },
    element: null,
    modules: [],
    initialize: function( element, options ){
        this.element = document.id(element);
        if(!this.element) return;
        if(!this.setPath()) return;
        this.setOptions(options);
        this.loadModules();
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
 * Load all modules and then init them
 */
    loadModules: function(){
        var modulesToLoad = [];
        var modulesToLoadCount = 0;
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
                onLoad: loadFunction
            });
        }.bind(this));
    },
    initModules: function(){
        this.options.data.each(function(module, i){
            this.modules.push( new window['MooCCK_'+module.type](module.data) );
        }.bind(this));
        this.update();
    },
    update: function(){
        var html = '';
        this.modules.each(function(module, i){
            html += module;
        });
        this.element.set('html', html);
    }
});

/**
 * Base for all CCK modules
 */
var MooCCK_Base = new Class({
    Implements: [ Options ],
    options: {
        mode: 'html'
    },
    initialize: function( data, options ){
        this.data = data === undefined ? {} : data;
        this.setOptions(options);
    },
    toString: function(){ 
        if(this.options.mode == "form"){
            return this.form();
        }
        else{
            return this.html();
        }
    },
    form: function(){
        return '';
    },
    html: function(){
        return '';
    }
    
});