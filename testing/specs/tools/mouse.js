/**
 * Mouse
 */
describe( 'Mouse', function()
{
    // Init
    var mouse = null;

    // Before all
    beforeAll( function( done )
    {
        // Set up
        Pan.Statics = {};
        mouse   = new Pan.Tools.Mouse( {} );

        // // Wait
        // window.setTimeout( function()
        // {
        //     done();
        // }, 50 );

        // // Spies
        // spyOn( mouse, 'method' ).and.callThrough();
    } );

    // After all
    afterAll( function()
    {

    } );

    // // Expectations
    // it( 'method() called', function()
    // {
    //     expect( mouse.method ).toHaveBeenCalled();
    // } );
} );
