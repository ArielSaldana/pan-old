/**
 * @class  Event Emmiter
 * @author Ariel Saldana / http://ahhriel.com
 */

class EventEmitter {

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    constructor(options) {
        this.callbacks = {};
        this.callbacks.base = {};
    }

    /**
     * Start listening specified events
     * @param  {string}   names    Events names (can contain namespace)
     * @param  {function} callback Function to apply if events are triggered
     * @return {object}            Context
     * @example
     *
     *     on( 'event-1.namespace event-2.namespace event-3', function( value )
     *     {
     *         console.log( 'fire !', value );
     *     } );
     */
    on(names, callback) {

        // errors
        if (typeof names === 'undefined' || names === '') {
            console.warn('wrong names');
            return false;
        }

        if (typeof callback === 'undefined') {
            console.warn('wrong callback');
            return false;
        }

        // Resolve names
        names = this.resolve_names(names);

        // Each name      
        names.forEach(name => {

            // Resolve name
            name = this.resolve_name(name);

            // Create namespace if it does not exist
            if (!(this.callbacks[name.namespace] instanceof Object))
                this.callbacks[name.namespace] = {};

            // create callback if it does not exist
            if (!(this.callbacks[name.namespace][name.value] instanceof Array))
                this.callbacks[name.namespace][name.value] = [];

            // add callback
            this.callbacks[name.namespace][name.value].push(callback);

        });

        return this;

    }


    /**
     * Stop listening specified events
     * @param  {string}   names Events names (can contain namespace or be the namespace only)
     * @return {object}         Context
     * @example
     *
     *     off( 'event-1 event-2' );
     *
     *     off( 'event-3.namespace' );
     *
     *     off( '.namespace' );
     *
     */
    off(names) {
        // errors
        if (typeof names === 'undefined' || names === '') {
            console.warn('wrong name');
            return false;
        }

        // resolve names
        names = this.resolve_names(names);

        // each name




        // names.forEach ( function( name ) 
        names.forEach(name => {

            // resolve name
            name = this.resolve_name(name);

            // remove namespace
            if (name.namespace !== 'base' && name.value === '') {
                delete this.callbacks[name.namespace];
            }

            // remove specific callback in namespace
            else {
                // try to remove from each namespace
                if (name.namespace === 'base') {
                    for (var namespace in this.callbacks) {
                        if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
                            delete this.callbacks[namespace][name.value];

                            // remove namespace if empty.
                            if (Object.keys(this.callbacks[namespace]).length === 0) {
                                delete this.callbacks[namespace];
                            }
                        }
                    }
                }

                // specified namespace
                else if (this.callbacks[name.namespace] instanceof Object && this.callbacks[name.namespace][name.value] instanceof Array) {
                    delete this.callbacks[name.namespace][name.value];

                    // remove namespace if empty
                    if (Object.keys(this.callbacks[name.namespace]).length === 0)
                        delete this.callbacks[name.namespace];
                }
            }
        });
    }

    /**
     * Fires event
     * @param  {string} name Event name (single)
     * @param  {array} args  Arguments to send to callbacks
     * @return {boolean}     First value sent by the callbacks applieds
     */
    trigger(name, args) {

        // errors
        if (typeof name === 'undefined' || name === '') {
            console.warn('wrong name');
            return false;
        }

        var final_result, result;

        // default args
        if (!(args instanceof Array))
            args = [];

        // Resolve names (should on have one event)
        name = this.resolve_names(name);

        // Resolve name
        name = this.resolve_name(name[0]);

        // Default namespace
        if (name.namespace === 'base') {
            // Try to find callback in each namespace
            for (var namespace in this.callbacks) {
                if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
                    this.callbacks[namespace][name.value].forEach(function (callback) {
                        result = callback.apply(this, args);

                        if (typeof final_result === 'undefined')
                            final_result = result;
                    });
                }
            }
        }

        // specified namespace
        else if (this.callbacks[name.namespace] instanceof Object) {
            if (name.value === '') {
                console.warn('wrong name');
                return this;
            }

            this.callbacks[name.namespace][name.value].forEach(function (callback) {
                result = callback.apply(this, args);

                if (typeof final_result === 'undefined')
                    final_result = result;
            });
        }

        return final_result;
    }


    /**
     * Trigga wut say wut
     */
    trigga(name, args) {
        return this.trigger(name, args);
    }
    /**
     * Dispatch
     */
    dispatch(name, args) {
        return this.trigger(name, args);
    }
    /**
     * Fire everything !
     * https://www.youtube.com/watch?v=1Io0OQ2zPS4
     */
    fire(name, args) {
        return this.trigger(name, args);
    }

    /**
     * Resolve events names
     * @param  {string} names Events names
     * @return {array}        Array of names (with namespace included in name)
     */
    resolve_names(names) {
        names = names.replace(/[^a-zA-Z0-9 ,\/.]/g, '');
        names = names.replace(/[,\/]+/g, ' ');
        names = names.split(' ');

        return names;
    }

    /**
     * Resolve event name
     * @param  {string} name Event name
     * @return {object}      Event object containing original name, real event name and namespace
     */
    resolve_name(name) {
        var new_name = {}, parts = name.split('.');

        new_name.original = name;
        new_name.value = parts[0];
        new_name.namespace = 'base';

        if (parts.length > 1 && parts[1] === '')
            new_name.namespace = parts[1];

        return new_name;
    }
}
/**
 * @class  Detector
 * @author Ariel Saldana / http://ariel.io
 */
let detectorInstance = null;

class Detector {
    constructor (options) {
        // super(options);
        if (!detectorInstance) {
            detectorInstance = this;
        }
        
        this.options = {};
        this.options.targets = ['html'];
        
        // Init
        this.init_detection();
        this.init_classes();
        
        return detectorInstance;
    }
    
    init_detection () {
        // Prepare
        var engine = {
            ie      : 0,
            gecko   : 0,
            webkit  : 0,
            khtml   : 0,
            opera   : 0,
            version : 0,
        };

        var browser = {
            ie      : 0,
            firefox : 0,
            safari  : 0,
            konq    : 0,
            opera   : 0,
            chrome  : 0,
            version : 0,
        };

        var system = {
            windows        : false,
            mac            : false,
            osx            : false,
            iphone         : false,
            ipod           : false,
            ipad           : false,
            ios            : false,
            blackberry     : false,
            android        : false,
            opera_mini     : false,
            windows_mobile : false,
            wii            : false,
            ps             : false,
        };

        var features = {
            touch       : false,
            media_query : false
        };
        
        var user_agent = navigator.userAgent;
        
        if (window.opera) 
        {
            engine.version = browser.version = window.opera.version();
            engine.opera   = browser.opera   = parseInt( engine.version );
        }
        
        else if( /AppleWebKit\/(\S+)/.test( user_agent ) || /AppleWebkit\/(\S+)/.test( user_agent ) )
        {
            engine.version = RegExp.$1;
            engine.webkit  = parseInt( engine.version );

            // figure out if it's Chrome or Safari
            if( /Chrome\/(\S+)/.test( user_agent ) )
            {
                browser.version = RegExp.$1;
                browser.chrome  = parseInt( browser.version );
            }
            else if( /Version\/(\S+)/.test( user_agent ) )
            {
                browser.version = RegExp.$1;
                browser.safari  = parseInt( browser.version );
            }
            else
            {
                // Approximate version
                var safariVersion = 1;

                if( engine.webkit < 100 )
                    safariVersion = 1;
                else if( engine.webkit < 312 )
                    safariVersion = 1.2;
                else if( engine.webkit < 412 )
                    safariVersion = 1.3;
                else
                    safariVersion = 2;

                browser.safari = browser.version = safariVersion;
            }
        }
        else if( /KHTML\/(\S+)/.test( user_agent ) || /Konqueror\/([^;]+)/.test( user_agent ) )
        {
            engine.version = browser.version = RegExp.$1;
            engine.khtml   = browser.konq    = parseInt( engine.version );
        }
        else if( /rv:([^\)]+)\) Gecko\/\d{8}/.test( user_agent ) )
        {
            engine.version = RegExp.$1;
            engine.gecko   = parseInt( engine.version );

            // Determine if it's Firefox
            if ( /Firefox\/(\S+)/.test( user_agent ) )
            {
                browser.version = RegExp.$1;
                browser.firefox = parseInt( browser.version );
            }
        }
        else if( /MSIE ([^;]+)/.test( user_agent ) )
        {
            engine.version = browser.version = RegExp.$1;
            engine.ie      = browser.ie      = parseInt( engine.version );
        }
        else if( /Trident.*rv[ :]*(11[\.\d]+)/.test( user_agent ) )
        {
            engine.version = browser.version = RegExp.$1;
            engine.ie      = browser.ie      = parseInt( engine.version );
        }

        // Detect browsers
        browser.ie    = engine.ie;
        browser.opera = engine.opera;

        // Detect platform (using navigator.plateform)
        var plateform  = navigator.platform;
        // system.windows = plateform.indexOf( 'Win' ) === 0;
        // system.mac     = plateform.indexOf( 'Mac' ) === 0;
        // system.x11     = ( plateform === 'X11' ) || ( plateform.indexOf( 'Linux' ) === 0);

        // Detect platform (using navigator.userAgent)
        system.windows = !!user_agent.match( /Win/ );
        system.mac     = !!user_agent.match( /Mac/ );
        // system.x11     = ( plateform === 'X11' ) || ( plateform.indexOf( 'Linux' ) === 0);

        // Detect windows operating systems
        if( system.windows )
        {
            if( /Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test( user_agent ) )
            {
                if( RegExp.$1 === 'NT' )
                {
                    switch( RegExp.$2 )
                    {
                        case '5.0':
                            system.windows = '2000';
                            break;

                        case '5.1':
                            system.windows = 'XP';
                            break;

                        case '6.0':
                            system.windows = 'Vista';
                            break;

                        default:
                            system.windows = 'NT';
                            break;
                    }
                }
                else if( RegExp.$1 === '9x' )
                {
                    system.windows = 'ME';
                }
                else
                {
                    system.windows = RegExp.$1;
                }
            }
        }

        // Detect mobile (mix between OS and device)
        system.nokia          = !!user_agent.match( /Nokia/i );
        system.kindle_fire    = !!user_agent.match( /Silk/ );
        system.iphone         = !!user_agent.match( /iPhone/ );
        system.ipod           = !!user_agent.match( /iPod/ );
        system.ipad           = !!user_agent.match( /iPad/ );
        system.blackberry     = !!user_agent.match( /BlackBerry/ ) || !!user_agent.match( /BB[0-9]+/ ) || !!user_agent.match( /PlayBook/ );
        system.android        = !!user_agent.match( /Android/ );
        system.opera_mini     = !!user_agent.match( /Opera Mini/i );
        system.windows_mobile = !!user_agent.match( /IEMobile/i );

        // iOS / OS X exception
        system.ios = system.iphone || system.ipod || system.ipad;
        system.osx = !system.ios && !!user_agent.match( /OS X/ );

        // Detect gaming systems
        system.wii         = user_agent.indexOf( 'Wii' ) > -1;
        system.playstation = /playstation/i.test( user_agent );

        //Detect features (Not as reliable as Modernizr)
        features.touch       = !!( ( 'ontouchstart' in window ) || window.DocumentTouch && document instanceof DocumentTouch );
        features.media_query = !!( window.matchMedia || window.msMatchMedia );

        // Set up
        this.user_agent = user_agent;
        this.plateform  = plateform;
        this.browser    = browser;
        this.engine     = engine;
        this.system     = system;
        this.features   = features;
        this.categories = [ 'engine', 'browser', 'system', 'features' ]; 
    }
    
    init_classes() {
        // Don't add
        if( !this.options.targets || this.options.targets.length === 0 )
            return false;

        // Set up
        var targets = [],
            target  = null;

        // Each element that need to add classes
        for( var i = 0, len = this.options.targets.length; i < len; i++ )
        {
            // Target
            target = this.options.targets[ i ];

            // String
            if( typeof target === 'string' )
            {
                // Target
                switch( target )
                {
                    case 'html' :
                        targets.push( document.documentElement );
                        break;

                    case 'body' :
                        targets.push( document.body );
                        break;

                    default :
                        var temp_targets = document.querySelectorAll( target );

                        for( var j = 0; j < temp_targets.length; j++ )
                            targets.push( temp_targets[ j ] );

                        break;
                }
            }
            // DOM Element
            else if( target instanceof Element )
            {
                targets.push( target );
            }

            // Targets found
            if( targets.length )
            {
                this.classes = [];

                // Each category
                for( var category in this )
                {
                    // Allowed
                    if( this.categories.indexOf( category ) !== -1 )
                    {
                        // Each property in category
                        for( var property in this[ category ] )
                        {
                            var value = this[ category ][ property ];

                            // Ignore version
                            if( property !== 'version' )
                            {
                                // Feature
                                if( category === 'features' )
                                {
                                    this.classes.push( category + '-' + ( value ? '' : 'no-' ) + property );
                                }

                                // Not feature
                                else
                                {
                                    if( value )
                                    {
                                        this.classes.push( category + '-' + property );
                                        if( category === 'browser'  )
                                            this.classes.push( category + '-' + property + '-' + value );
                                    }
                                }
                            }
                        }
                    }
                }

                // Add classes
                for( var j = 0; j < targets.length; j++ )
                    targets[ j ].classList.add.apply( targets[ j ].classList, this.classes );
            }
        }

        return this;
    }
}
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
     is_down (input) {
         return this.are_down([input]);
     }
    
}
/**
 * @class    Mouse
 * @author   Ariel Saldana / http://ariel.io
 * @fires    down
 * @fires    up
 * @fires    move
 * @fires    wheel
 * @requires Viewport
 */
let mouseInstance = null;

class Mouse extends EventEmitter {
    constructor ( options )
    {
        super(options);
        
        if (!mouseInstance) {
            mouseInstance = this;
        }
        
        this.options = {};
        
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
/**
 * @class    Ticker
 * @author   Ariel Saldana / http://ariel.io
 */
let tickerInstance = null;

class Ticker extends EventEmitter {
    constructor() {
        super();
        
        if (!tickerInstance) {
            tickerInstance = this;
        }
        
        this.reseted                = false;
        this.running                = false;
        this.time                   = {};
        this.time.start             = 0;
        this.time.elapsed           = 0;
        this.time.delta             = 0;
        this.time.current           = 0;
        this.waits                  = {};
        this.waits.before           = [];
        this.waits.after            = [];
        this.intervals              = {};
        
        
        this.run();
        // this.initial_triggers = ['moo', 'scroll'];
        
        return tickerInstance;
    }
    
    /**
     * Reset the ticker by setting time infos to 0
     * @param  {boolean} run Start the ticker
     * @param  {ticker}  reset a ticker completely, by default reseting keeps the next interval date.
     * @return {object}      Context
     */
    
    reset (run, interval) {
        this.reseted = true;

        this.time.start   = + ( new Date() );
        this.time.current = this.time.start;
        this.time.elapsed = 0;
        this.time.delta   = 0;

        if( run )
            this.run();

        if (interval) {
          that.destroy_interval(interval);
          that.create_interval(interval);
        }
        
        return this;
    }
    
    run () {
        if (this.running)
        return;
        
        this.running = true;
        
        
        var loop = () => {
            if (this.running)
                window.requestAnimationFrame(loop);
                
            this.tick();
        }
        
        
        loop();
        
        return this;
    }
    
    /**
     * Stop ticking
     * @return {object} Context
     */
    stop () {
        this.running = false;
        return this;
    }
    
    /**
     * Tick (or is it tack ?)
     * @return {object} Context
     */
    tick (){
        if( !this.reseted )
            this.reset();
            
        this.time.current = + ( new Date() );
        this.time.delta   = this.time.current - this.time.start - this.time.elapsed;
        this.time.elapsed = this.time.current - this.time.start;
        
        var i    = 0,
            len  = this.waits.before.length,
            wait = null;
            
        for( ; i < len; i++ )
        {
            // Set up
            wait = this.waits.before[ i ];

            // Frame count down to 0
            if( --wait.frames_count === 0 )
            {
                // Apply action
                wait.action.apply( this, [ this.time ] );

                // Remove from actions
                this.waits.before.splice( i, 1 );

                // Update loop indexes
                i--;
                len--;
            }
        }
        
        this.trigger( 'tick', [ this.time ] );
        // Trigger intervals
        this.trigger_intervals();
        
        // Do next (after trigger)
        i   = 0;
        len = this.waits.after.length;
        for( ; i < len; i++ )
        {
            // Set up
            wait = this.waits.after[ i ];

            // Frame count down to 0
            if( --wait.frames_count === 0 )
            {
                // Apply action
                wait.action.apply( this, [ this.time ] );

                // Remove from actions
                this.waits.after.splice( i, 1 );

                // Update loop indexes
                i--;
                len--;
            }
        }

        return this;
    }
    
    /**
     * Apply function on X frames
     * @param  {number}   frames_count How many frames before applying the function
     * @param  {function} action       Function to apply
     * @param  {boolean}  after        Should apply the function after the 'tick' event is triggered
     * @return {object}                Context
     */
    wait( frames_count, action, after ) {
        // Errors
        if( typeof action !== 'function' )
            return false;

        if( typeof frames_count !== 'number' )
            return false;

        this.waits[ after ? 'after' : 'before' ].push( {
            frames_count : frames_count,
            action       : action
        } );

        return this;
    }
    
    /**
     * Create interval
     * @param  {integer} interval Milliseconds between each tick
     * @return {object}           Context
     */
    create_interval (interval ) {
        this.intervals[ interval ] = {
            interval     : interval,
            next_trigger : interval,
            start        : this.time.elapsed,
            last_trigger : this.time.elapsed,
        };

        return this;
    }
    
    /**
     * Destroy interval
     * @param  {integer} interval Milliseconds between each tick
     * @return {object}           Context
     */
    destroy_interval(interval ) {
        delete this.intervals[ interval ];
        return this;
    }
    
    /**
     * Trigger intervals
     * @return {object}           Context
     */
    trigger_intervals () {
        // Each interval
        for( var _key in this.intervals )
        {
            var interval = this.intervals[ _key ];

            // Test if interval should trigger
            if( this.time.elapsed - interval.last_trigger > interval.next_trigger  )
            {
                // Update next trigger to stay as close as possible to the interval
                interval.next_trigger = interval.interval - ( this.time.elapsed - interval.start ) % interval.interval;

                interval.last_trigger = this.time.elapsed;
                this.trigger( 'tick-' + interval.interval, [ this.time, interval ] );
            }
        }
        
        return this;
    }
    
    /**
     * Start listening specified events
     * @param  {string}   names    Events names (can contain namespace)
     * @param  {function} callback Function to apply if events are triggered
     * @return {object}            Context
     */
    
    on (names, callback) {
        super.on(names, callback);
        var resolved_names = this.resolve_names( names );

        // Each resolved name
        // resolved_names.forEach( function( name )
        resolved_names.forEach(name =>
        {
            // Has interval interval
            if( name.match( /^tick([0-9]+)$/) )
            {
                // Extract interval interval
                var interval = parseInt( name.replace( /^tick([0-9]+)$/, '$1' ) );

                // Create interval
                if( interval )
                    this.create_interval( interval );
            }
        } );

        // return this._super( names, callback );
    }
    
    off(names) {
        super.off(names);
        // Set up
        var resolved_names = this.resolve_names( names );
        

        // Each resolved name
        resolved_names.forEach( name =>
        {
            // Has interval interval
            if( name.match( /^tick([0-9]+)$/) )
            {
                // Extract interval interval
                var interval = parseInt( name.replace( /^tick([0-9]+)$/, '$1' ) );

                // Create interval
                if( interval )
                    this.destroy_interval( interval );
            }
        } );

        // super();
        // return this._super( names );
    }
}
/**
 * @class    Viewport
 * @author   Ariel Saldana / http://ariel.io
 * @fires    resize
 * @fires    scroll
 * @requires Ticker
 */
let viewportInstance = null;

class Viewport extends EventEmitter {
    constructor(options) {
        super(options);
        
        if (!viewportInstance) {
            viewportInstance = this;
        }
        
        this.options = {};
        this.options.disable_hover_on_scroll = false;
        this.options.initial_triggers = [ 'resize', 'scroll'];
        
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

/**
 * @class    pan
 * @author   Ariel Saldana / http://ariel.io
 */
var Pan = {};

Pan.enableMouse = function(){
    Pan.mouse = new Mouse();
}

Pan.enableKeyboard = function(){
    Pan.keyboard = new Keyboard();
}

Pan.enableViewport = function(){
    Pan.viewport = new Viewport();
}

Pan.enableTicker = function(){
    Pan.ticker = new Ticker();
}


Pan.enableTools = function() {
    Pan.viewport = new Viewport();
    Pan.keyboard = new Keyboard();
    Pan.mouse = new Mouse();
    Pan.ticker = new Ticker();
}