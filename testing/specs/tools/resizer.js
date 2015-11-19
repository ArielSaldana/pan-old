/**
 * Resizer
 */
describe( 'Resizer', function()
{
    // Init
    var resizer = null;

    // Before all
    beforeAll( function( done )
    {
        // Set up
        Pan.Statics = {};
        resizer   = new Pan.Tools.Resizer( {} );

        // // Wait
        // window.setTimeout( function()
        // {
        //     done();
        // }, 50 );

        // // Spies
        // spyOn( resizer, 'method' ).and.callThrough();
    } );

    // After all
    afterAll( function()
    {

    } );

    // // Expectations
    // it( 'method() called', function()
    // {
    //     expect( resizer.method ).toHaveBeenCalled();
    // } );
} );
