/**
 * @class  Resizer
 * @author Ariel Saldana / http://ahhriel.com
 */
P.Components.App = P.Core.Abstract.extend(
{
    options:
    {

    },

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    construct : function( options )
    {
        this._super( options );

        this.ticker   = new P.Tools.Ticker();
        this.viewport = new P.Tools.Viewport();
        this.css      = new P.Tools.Css();
        this.keyboard = new P.Tools.Keyboard();
        this.mouse    = new P.Tools.Mouse();
        this.ga_tags  = new P.Tools.GA_Tags();

        console.log( 'All good' );
    }
} );
