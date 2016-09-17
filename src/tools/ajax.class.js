/**
 * @class    ajax.class.js
 * @author   Ariel Saldana / http://ariel.io
 * TODO:     Add support to add options to he ajax request. (Headers)
 */
ajaxInstance = null;

class Ajax {
    
    constructor () {
        
        if (!ajaxInstance)
            ajaxInstance = this;
            
        return ajaxInstance;
    }
    
}