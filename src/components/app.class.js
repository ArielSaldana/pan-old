/**
 * @class  Resizer
 * @author Ariel Saldana / http://ahhriel.com
 */
Pan.Components.App = Pan.Core.Abstract.extend(
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

        this.ticker   = new Pan.Tools.Ticker();
        this.viewport = new Pan.Tools.Viewport();
        this.css      = new Pan.Tools.Css();
        this.keyboard = new Pan.Tools.Keyboard();
        this.mouse    = new Pan.Tools.Mouse();
        this.ga_tags  = new Pan.Tools.GA_Tags();

        console.log( 'All good' );
    }
} );
