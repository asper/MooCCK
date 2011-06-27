/**
 * MooCCK
 * 
 * Dependencies :
 * - Mootools Core 1.3.2
 * - Mootools More/Object.Extras
 * - Mootools More/Drag
 * - Mootools More/Drag.Move
 * - Mootools More/Sortables
 * - Mootools More/Request.JSONP
 * - Mootools More/Locale
 * - Mootools More/Tips
 * 
 */
 
/**
 * Global namespace
 */
var MooCCK = {};

/**
 * Loader
 */
MooCCK.Loader = {
    // Path to the root folder
    path: '.',
    // List of loaded files
    loaded: {
        core: [],
        modules: [],
        inputs: [],
        themes: []
    },
    // Load one or more core classes
    core: function(files){
        files = Array.from(files).map(function(file){
            return MooCCK.Loader.path+'Core/'+file+'.js';
        });
        this._request('core', files);
        return this;
    },
    // Load one or more modules
    module: function(files){
        files = Array.from(files).map(function(file){
            return MooCCK.Loader.path+'Plugins/Modules/'+file+'.js';
        });
        this._request('modules', files);
        return this;
    },
    // Load one or more inputs
    input: function(files){
        files = Array.from(files).map(function(file){
            return MooCCK.Loader.path+'Plugins/Inputs/'+file+'.js';
        });
        this._request('inputs', files);
        return this;
    },
    // Load one or more themes
    theme: function(files){
        Array.from(files).each(function(file){
            if(!MooCCK.Loader.loaded.themes.contains(file)){
                new Element('link', {
                    rel: 'stylesheet',
                    type: 'text/css',
                    href: MooCCK.Loader.path+'Plugins/Themes/'+file+'/style.css'
                }).inject(document.getElement('head'));
                MooCCK.Loader.loaded.themes.push(file);
            }
        });
        return this;
    },
    // Fetch files
    _request: function(key, files){
        if(typeOf(this.loaded[key])){
            Array.from(files).each(function(file){
                if(!MooCCK.Loader.loaded[key].contains(file)){
                    new Request({
                        url: file,
                        method: 'GET',
                        async: false,
                        evalResponse: true,
                        onSuccess: function(){
                            MooCCK.Loader.loaded[key].push(file);
                        }
                    }).send();
                }
            });
        }
        return this;
    },
    setPath: function(){
        var scriptUrl = $$('script').getLast().get('src');
        this.path = scriptUrl.substr(0, scriptUrl.lastIndexOf('/')+1 );
        return this;
    }
};

// Set the base path right now
MooCCK.Loader.setPath();

/**
 * Load
 * Shortcut to MooCCK.Load methods
 * Usage:
 * MooCCK.load({
 *      core: ['Editor'],
 *      module: ['Paragraph', 'Heading'],
 *      input: ['Text', 'Textarea']
 * });
 */
MooCCK.load = function( hash ){
    Object.each(hash, function(files, key){
        if(['core', 'module', 'input', 'theme'].contains(key)){
            MooCCK.Loader[key](files);
        }
    }, this);
};

// Load the editor
MooCCK.load({
    core: ['Editor']
});