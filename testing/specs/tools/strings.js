/**
 * Strings
 */
describe( 'Strings', function()
{
    // Init
    var strings = null;

    // Before all
    beforeAll( function( done )
    {
        // Set up
        Pan.Statics = {};
        strings   = new Pan.Tools.Strings( {} );

        // // Wait
        // window.setTimeout( function()
        // {
        //     done();
        // }, 50 );

        // // Spies
        // spyOn( strings, 'method' ).and.callThrough();
    } );

    // After all
    afterAll( function()
    {

    } );

    // // Expectations
    // it( 'method() called', function()
    // {
    //     expect( strings.method ).toHaveBeenCalled();
    // } );
} );
