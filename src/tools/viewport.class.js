/**
 * @class    Viewport
 * @author   Ariel Saldana / http://ariel.io
 * @fires    resize
 * @fires    scroll
 * @requires Ticker
 */

import { EventEmitter } from '../core/event_emitter.class';
import { Ticker } from './ticker.class';
import { Detector } from './detector.class';

let viewportInstance = null;

export class Viewport extends EventEmitter {

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    constructor(options) {
        super(options);
        
        if (!viewportInstance) {
            viewportInstance = this;
        }
        
        this.options = {};
        this.options.disable_hover_on_scroll = false;
        this.options.initial_triggers = [ 'resize', 'scroll'];

        if (options)
            Object.assign(this.options, options);
        
        this.ticker             = new Ticker();
        this.detector           = new Detector();
        this.top                = 0;
        this.left               = 0;
        this.y                  = 0;
        this.x                  = 0;
        this.scroll             = {};
        this.scroll.delta       = {};
        this.scroll.delta.top   = 0;
        this.scroll.delta.left  = 0;
        this.scroll.delta.y     = 0;
        this.scroll.delta.x     = 0;
        this.scroll.direction   = {};
        this.scroll.direction.x = null;
        this.scroll.direction.y = null;
        this.width              = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
        this.height             = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.pixel_ratio        = window.devicePixelRatio || 1;
        
        // Init
        // this.init_disabling_hover_on_scroll();
        this.init_events();
        
        return viewportInstance;
    }
    
    /**
     * Init events
     * @return {object} Context
     */
    init_events() {
        
        var resize_callback = () => {
            this.resize_handler();
        }
        
        var scroll_callback = () => {
            this.scroll_handler();
        }
        
        window.addEventListener( 'resize', resize_callback );
        window.addEventListener( 'scroll', scroll_callback);
        
        if ( this.options.initial_triggers.length )
        {
            
            this.ticker.wait(1, () => {
                for( var i = 0; i < this.options.initial_triggers.length; i++ )
                {
                    // Set up
                    var action = this.options.initial_triggers[ i ],
                        method = this[ action + '_handler' ];

                    // Method exist
                    if( typeof method === 'function' )
                    {
                        // Trigger
                        method.apply( this );
                    }
                }
            });
        }
        
        return this;
    }
    
    /**
     * Handle the resize event
     * @return {object} Context
     */
    resize_handler () {
        // Set up
        this.width  = window.innerWidth  || document.documentElement.clientWidth  || document.body.clientWidth;
        this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        
        // Trigger
        this.trigger( 'resize', [ this.width, this.height ] );

        return this;
    }
    
    /**
     * Handle the scroll event
     * @return {object} Context
     */
    scroll_handler () {
        // Set up
        var top  = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : window.document.documentElement.scrollTop,
            left = typeof window.pageXOffset !== 'undefined' ? window.pageXOffset : window.document.documentElement.scrollLeft;

        this.scroll.direction.y = top  > this.top  ? 'down'  : 'up';
        this.scroll.direction.x = left > this.left ? 'right' : 'left';
        this.scroll.delta.top   = top  - this.top;
        this.scroll.delta.left  = left - this.left;
        this.top                = top;
        this.left               = left;

        // Alias
        this.y              = this.top;
        this.x              = this.left;
        this.scroll.delta.y = this.scroll.delta.top;
        this.scroll.delta.x = this.scroll.delta.left;

        // Trigger
        this.trigger( 'scroll', [ this.top, this.left, this.scroll ] );

        return this;
    }
    
    /**
     * Disable pointer events on body when scrolling for performance
     * @return {object} Context
     */
    init_disabling_hover_on_scroll () {
        
        var timeout = null, active = false;
        
        this.on('scroll', () => {
            if (!that.options.disable_hover_on_scroll )
            return;
            
            if (timeout)
                window.clearTimeout(timeout);
                
            if (!active)
            {
                active = true;
                document.body.style.pointerEvents = 'none';
            }
            
            timeout = window.setTimeout( function()
            {
               active = false;
               document.body.style.pointerEvents = 'auto'; 
            }, 60 );
        });
        return this;
    }
    
    /**
     * Test media and return false if not compatible
     * @param  {string} condition Condition to test
     * @return {boolean}          Match
     */
    match_media (condition)
    {
        if( !this.detector.features.media_query || typeof condition !== 'string' || condition === '' )
            return false;

        return !!window.matchMedia( condition ).matches;
    }
}
