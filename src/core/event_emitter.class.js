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