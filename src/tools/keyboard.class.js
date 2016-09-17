/**
 * @class  Keyboard
 * @author Ariel Saldana / http://ariel.io
 * @fires  down
 * @fires  up
 */
let keyboardInstance = null;

class Keyboard extends EventEmitter {
    constructor(options) {
        super(options);
        
        if (!keyboardInstance) {
            keyboardInstance = this;
        }
        
        this.options = {};
        this.keycode_names = {
            91 : 'cmd',
            17 : 'ctrl',
            32 : 'space',
            16 : 'shift',
            18 : 'alt',
            20 : 'caps',
            9  : 'tab',
            13 : 'enter',
            8  : 'backspace',
            38 : 'up',
            39 : 'right',
            40 : 'down',
            37 : 'left',
            27 : 'esc'
        }
        
        this.downs = [];
        this.listen_to_events();
        
        return keyboardInstance;
    }
    
    /**
     * Listen to events
     * @return {object} Context
     */
    listen_to_events () {
        
        //down
        var keydown_handle = (e) => {
            var character = this.keycode_to_character (e.keyCode);
            
            if (this.downs.indexOf( character) === -1)
                this.downs.push(character);
                
            if (this.trigger('down', [e.keyCode, character]) === false)
            {
                e = e || window.event;
                
                if (e.preventDefault)
                    e.preventDefault();
                else
                    e.returnValue = false;
            }
        }
        
        var keyup_handle = (e) => {
           var character = this.keycode_to_character(e.character);
           
           if (this.downs.indexOf(character) !== -1)
                this.downs.splice(this.downs.indexOf(character),1);
                
           this.trigger('up', [e.keyCode, character]);
        }
        
        // Listen
        if (document.addEventListener)
        {
            document.addEventListener( 'keydown', keydown_handle, false );
            document.addEventListener( 'keyup', keyup_handle, false );
        }
        else
        {
            document.attachEvent( 'onkeydown', keydown_handle, false );
            document.attachEvent( 'onkeyup', keyup_handle, false );
        }

        return this;
    }
    
    /**
     * Convert a keycode to a char
     * @param  {integer} input Original keycode
     * @return {string}        Output
     */
    keycode_to_character (input) {
        var output = this.keycode_names[input];
        if (!output)
            output = String.fromCharCode(input).toLowerCase();
            
        return output;
    }
    
    /**
     * Test if keys are down
     * @param  {array} inputs Array of char to test as strings
     * @return {boolean}      True if every keys are down
     */
    are_down (inputs) {
        var down = true;
        
        for( var i = 0; i < inputs.length; i++ )
        {
            var key = inputs[ i ];

            if( typeof key === 'number' )
                key = this.keycode_to_character( key );

            if( this.downs.indexOf( key ) === -1 )
                down = false;
        }

        return down;
        
    }
    
    /**
     * Test if key is down
     * @param  {string}  input Char as string
     * @return {boolean}       True if key is down
     */
     is_down () {
         return this.are_down([input]);
     }
    
}