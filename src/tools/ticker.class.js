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