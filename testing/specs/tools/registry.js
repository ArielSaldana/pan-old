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
        registry   = new Pan.Tools.Registry( {} );

        // // Wait
        // window.setTimeout( function()
        // {
        //     done();
        // }, 50 );

        // // Spies
        // spyOn( registry, 'method' ).and.callThrough();
    } );

    // After all
    afterAll( function()
    {

    } );

    // // Expectations
    // it( 'method() called', function()
    // {
    //     expect( registry.method ).toHaveBeenCalled();
    // } );
} );
