/**
 * @class    Mouse
 * @author   Ariel Saldana / http://ariel.io
 * @fires    down
 * @fires    up
 * @fires    move
 * @fires    wheel
 * @requires Viewport
 */

import { EventEmitter } from '../core/event_emitter.class';
import { Viewport } from './viewport.class';

let mouseInstance = null;

export class Mouse extends EventEmitter {

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    constructor ( options )
    {
        super(options);
        
        if (!mouseInstance) {
            mouseInstance = this;
        }
        
        this.options = {};

        if (options) 
            Object.assign(this.options, options);
        
        this.viewport         = new Viewport();
        this.down             = false;
        this.position         = {};
        this.position.x       = 0;
        this.position.y       = 0;
        this.position.ratio   = {};
        this.position.ratio.x = 0;
        this.position.ratio.y = 0;
        this.wheel            = {};
        this.wheel.delta      = 0;

        this.listen_to_events();
        
        return mouseInstance;
    }
    
    /**
     * Listen to events
     * @return {object} Context
     */
    listen_to_events() {
        var mouse_down_handle = (e) => {
            this.down = true;
            
            if (this.trigger('down',[this.position, e.target])=== false)
            {
                e.preventDefault();
            }
        }
        
        var mouse_up_handle = (e) => {
            this.down = false;
            
            this.trigger('up', [this.position, e.target]);
        }
        
        var mouse_move_handle = (e) => {
            this.position.x = e.clientX;
            this.position.y = e.clientY;
            
            this.position.ratio.x = this.position.x / this.viewport.width;
            this.position.ratio.y = this.position.y / this.viewport.height;
            
            this.trigger( 'move', [ this.position, e.target]);
        }
        
        var mouse_wheel_handle = (e) => {
            this.wheel.delta = e.wheelDeltaY || e.wheelDelta || -e.detail;
            
            if (this.trigger ('wheel', [this.wheel]) === false)
            {
                e.preventDefault();
                return false;
            }
        }
        
        // Listen
        if (document.addEventListener)
        {
            document.addEventListener( 'mousedown', mouse_down_handle, false );
            document.addEventListener( 'mouseup', mouse_up_handle, false );
            document.addEventListener( 'mousemove', mouse_move_handle, false );
            document.addEventListener( 'mousewheel', mouse_wheel_handle, false );
            document.addEventListener( 'DOMMouseScroll', mouse_wheel_handle, false );
        }
        else
        {
            document.attachEvent( 'onmousedown', mouse_down_handle, false );
            document.attachEvent( 'onmouseup', mouse_up_handle, false );
            document.attachEvent( 'onmousemove', mouse_move_handle, false );
            document.attachEvent( 'onmousewheel', mouse_wheel_handle, false );
        }

        return this;
        
        
        
        
    }
}