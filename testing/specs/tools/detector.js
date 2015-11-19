/**
 * Detector
 */
describe( 'Detector', function()
{
    // Init
    var detector = null;

    // Before all
    beforeAll( function( done )
    {
        // Set up
        Pan.Statics = {};
        detector   = new Pan.Tools.Detector( {} );

        // // Wait
        // window.setTimeout( function()
        // {
        //     done();
        // }, 50 );

        // // Spies
        // spyOn( detector, 'method' ).and.callThrough();
    } );

    // After all
    afterAll( function()
    {

    } );

    // // Expectations
    // it( 'method() called', function()
    // {
    //     expect( detector.method ).toHaveBeenCalled();
    // } );
} );
