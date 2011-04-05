
var MooCCK_Heading = new Class({
    
    Extends: MooCCK_Base,
    
    type: 'Heading',
    
    html: function(){
        return '<h'+this.data.level+'>'+this.data.text+'</h'+this.data.level+'>';
    },
    
    form: function(){
        return '<select>'+
                    '<option value="1">1</option>'+
                    '<option value="2">2</option>'+
                    '<option value="3">3</option>'+
                    '<option value="4">4</option>'+
                    '<option value="5">6</option>'+
                    '<option value="6">6</option>'+
                '</select>'+
                '<input type="text" />';
    }
    
});
