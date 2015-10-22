/**
 * @class  Resizer
 * @author Ariel Saldana / http://ahhriel.com
 */
(function()
{
    'use strict';

    Pan.Core.Abstract = Pan.Class.extend(
    {
        register : false,
        static : false,

        /**
         * Initialise and merge options
         * @constructor
         * @param {object} options Properties to merge with defaults
         */
        construct : function( options )
        {
            if( typeof options === 'undefined' )
                options = {};

            Pan.merge( this.options, options );

            this.$ = {}

            // Create statics container
            if( typeof Pan.Statics !== 'object' )
                Pan.Statics = {};

            // Register
            if( this.register && typeof this.register === 'string' )
            {
                var registry = new Pan.Tools.Registry();
                registry.set( this.register, this );
            }

            // Static
            if( this.static && typeof this.static === 'string')
            {
                // Add instance to statics
                Pan.Statics[ this.static ] = this;
            }
        },

        /**
         * True constructur used first to return class if static
         * @return {class|null} Return class if static or null if default
         */
        static_instantiate : function()
        {
            if( Pan.Statics && Pan.Statics[ this.static ] )
                return Pan.Statics[ this.static ];
            else
                return null;
        },

        /**
         * Destroy
         */
        destroy : function()
        {

        }
    } );
} )();
