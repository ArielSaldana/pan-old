/**
 * @class  Resizer
 * @author Bruno SIMON / http://bruno-simon.com
 */
(function()
{
    'use strict';

    Pan.Core.Abstract = Pan.Class.extend(
    {
        static : false,

        /**
         * Initialise and merge options
         * @constructor
         * @param {object} options Properties to merge with defaults
         */
        init : function( options )
        {
            if( typeof options === 'undefined' )
                options = {};

            Pan.merge( this.options, options );

            // Create statics container
            if( typeof Pan.Statics !== 'object' )
                Pan.Statics = {};

            // Static
            if( this.static )
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
