

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
        this.setOptions(options);
        this.options.data.each(function(module, i){
            this.modules.push( new window['MooCCK_'+module.type](module.data) );
        }.bind(this));
    }
});

var MooCCK_Base = new Class({
    Implements: [ Options ],
    options: {},
    initialize: function( data, options ){
        this.data = data === undefined ? {} : data;
        this.setOptions(options);
    }
});

var MooCCK_Heading = new Class({
    Extends: MooCCK_Base,
    type: 'Heading',
    initialize: function( data, options ){
        this.parent( data, options );
    }
});