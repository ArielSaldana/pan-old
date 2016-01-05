/**
 * @class  Abstract
 * @author Ariel Saldana / http://ahhriel.com
 */
P.Core.Abstract = P.Class.extend(
{
    options : {},
    static  : false,

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        if( typeof options === 'undefined' )
            options = {};

        P.merge( this.options, options );

        this.$ = {};

        // Create statics container
        if( typeof P.Statics !== 'object' )
            P.Statics = {};

        // Register
        if( options.register && typeof options.register === 'string' )
        {
            var registry = new P.Tools.Registry();
            registry.set( options.register, this );
        }

        // Static
        if( this.static && typeof this.static === 'string' )
        {
            // Add instance to statics
            P.Statics[ this.static ] = this;
        }
    },

    /**
     * True constructur used first to return class if static
     * @return {class|null} Return class if static or null if default
     */
    static_instantiate : function()
    {
        if( P.Statics && P.Statics[ this.static ] )
            return P.Statics[ this.static ];
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
