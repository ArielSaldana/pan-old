/**
 * Registry
 */
describe( 'Registry', function()
{
    // Init
    var registry = null;

    // Before all
    beforeAll( function( done )
    {
        // Set up
        Pan.Statics = {};
        registry  = new Pan.Tools.Registry( {} );

        // Wait
        window.setTimeout( function()
        {
            done();
        }, 50 );

        // Spies
        spyOn( registry, 'trigger' ).and.callThrough();

        // Use class
        registry.set( 'key', 'value' );
    } );

    // After all
    afterAll( function()
    {

    } );

    it( 'trigger() called', function()
    {
        expect( registry.trigger ).toHaveBeenCalled();
    } );

    it( 'get( \'key\' ) = \'value\'', function()
    {
        expect( registry.get( 'key' ) ).toEqual( 'value' );
    } );
} );
