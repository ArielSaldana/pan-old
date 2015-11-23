// Modules
var gulp   = require( 'gulp' ),
    concat = require( 'gulp-concat-util' ),
    uglify = require( 'gulp-uglify' ),
    watch  = require( 'gulp-watch' ),
    rename = require( 'gulp-rename' ),
    addsrc = require( 'gulp-add-src' );

// Options
var options =
{
    version : '0.3',
    paths   :
    {
        sources     : '../src/',
        destination : '../builds/'
    }
};

/**
 * JS
 */
gulp.task( 'js', function()
{
    var signature = [
        '/**',
        '\n * Pan.js v', options.version,
        '\n * https://github.com/arielsaldana/pan',
        '\n *',
        '\n * Released under the MIT license',
        '\n * https://github.com/arielsaldana/pan/blob/dev/LICENSE.txt',
        '\n *',
        '\n * Date: ', new Date(),
        '\n */',
        '\n',
    ].join( '' );

    var before = [
        //'\nvar pan = { Core : {}, Tools : {}, Components : {} };',
        '\nvar Pan = P = ( function( window, document, undefined )',
        '\n{',
        '\n    \'use strict\';',
        '\n',
    ].join( '' );

    var after = [
        '\nreturn P;',
        '\n} )( window, document );',
        '\n'
    ].join( '' );

    // With polyfill
    // gulp.src( [
    //     options.paths.sources + 'polyfills/classlist.js',
    //     options.paths.sources + 'polyfills/foreach.js',
    //     options.paths.sources + 'polyfills/getcomputedstyle.js',
    //     options.paths.sources + 'polyfills/indexof.js',
    //     options.paths.sources + 'polyfills/object-keys.js',
    //     options.paths.sources + 'polyfills/object-create.js',
    //     options.paths.sources + 'polyfills/requestanimationframe.js',

    //     options.paths.sources + 'core/pan.class.js',
    //     options.paths.sources + 'core/abstract.class.js',
    //     options.paths.sources + 'core/event_emitter.class.js',

    //     options.paths.sources + 'components/tooltip.class.js',

    //     options.paths.sources + 'tools/breakpoints.class.js',
    //     options.paths.sources + 'tools/browser.class.js',
    //     options.paths.sources + 'tools/colors.class.js',
    //     options.paths.sources + 'tools/css.class.js',
    //     options.paths.sources + 'tools/detector.class.js',
    //     options.paths.sources + 'tools/ga_tags.class.js',
    //     options.paths.sources + 'tools/keyboard.class.js',
    //     options.paths.sources + 'tools/konami_code.class.js',
    //     options.paths.sources + 'tools/mouse.class.js',
    //     options.paths.sources + 'tools/offline.class.js',
    //     options.paths.sources + 'tools/registry.class.js',
    //     options.paths.sources + 'tools/resizer.class.js',
    //     options.paths.sources + 'tools/strings.class.js',
    //     options.paths.sources + 'tools/ticker.class.js',
    //     options.paths.sources + 'tools/viewport.class.js',
    //     options.paths.sources + 'tools/queue.class.js',
    //     options.paths.sources + 'tools/html_serializer.class.js',
    //     options.paths.sources + 'tools/ajax.class.js',
    gulp.src( [
        options.paths.sources + 'polyfills/classlist.js',
        options.paths.sources + 'polyfills/foreach.js',
        options.paths.sources + 'polyfills/getcomputedstyle.js',
        options.paths.sources + 'polyfills/htmlelement.js',
        options.paths.sources + 'polyfills/indexof.js',
        options.paths.sources + 'polyfills/object-create.js',
        options.paths.sources + 'polyfills/object-keys.js',
        options.paths.sources + 'polyfills/requestanimationframe.js',

        options.paths.sources + 'core/pan.class.js',
        options.paths.sources + 'core/abstract.class.js',
        options.paths.sources + 'core/event_emitter.class.js',

        options.paths.sources + 'tools/breakpoints.class.js',
        options.paths.sources + 'tools/colors.class.js',
        options.paths.sources + 'tools/css.class.js',
        options.paths.sources + 'tools/detector.class.js',
        options.paths.sources + 'tools/ga_tags.class.js',
        options.paths.sources + 'tools/keyboard.class.js',
        options.paths.sources + 'tools/konami_code.class.js',
        options.paths.sources + 'tools/mouse.class.js',
        options.paths.sources + 'tools/offline.class.js',
        options.paths.sources + 'tools/registry.class.js',
        options.paths.sources + 'tools/resizer.class.js',
        options.paths.sources + 'tools/strings.class.js',
        options.paths.sources + 'tools/ticker.class.js',
        options.paths.sources + 'tools/viewport.class.js',
        options.paths.sources + 'tools/queue.class.js',
    ] )
    .pipe( concat( 'pan-' + options.version + '.js' ) )
    .pipe( concat.header( before ) )
    .pipe( concat.footer( after ) )
    .pipe( concat.header( signature ) )
    .pipe( gulp.dest( options.paths.destination ) )
    .pipe( uglify() )
    .pipe( concat.header( signature ) )
    .pipe( rename( { extname : '.min.js' } ) )
    .pipe( gulp.dest( options.paths.destination ) );

    // Without polyfill
    // gulp.src( [
    //     options.paths.sources + 'core/pan.class.js',
    //     options.paths.sources + 'core/abstract.class.js',
    //     options.paths.sources + 'core/event_emitter.class.js',

    //     options.paths.sources + 'components/tooltip.class.js',

    //     options.paths.sources + 'tools/browser.class.js',
    //     options.paths.sources + 'tools/colors.class.js',
    //     options.paths.sources + 'tools/css.class.js',
    //     options.paths.sources + 'tools/ga_tags.class.js',
    //     options.paths.sources + 'tools/keyboard.class.js',
    //     options.paths.sources + 'tools/konami_code.class.js',
    //     options.paths.sources + 'tools/mouse.class.js',
    //     options.paths.sources + 'tools/offline.class.js',
    //     options.paths.sources + 'tools/registry.class.js',
    //     options.paths.sources + 'tools/resizer.class.js',
    //     options.paths.sources + 'tools/strings.class.js',
    //     options.paths.sources + 'tools/ticker.class.js',
    //     options.paths.sources + 'tools/queue.class.js',
    // ] )
    gulp.src( [
        options.paths.sources + 'core/pan.class.js',
        options.paths.sources + 'core/abstract.class.js',
        options.paths.sources + 'core/event_emitter.class.js',
        
        options.paths.sources + 'components/tooltip.class.js',

        // options.paths.sources + 'tools/browser.class.js',
        options.paths.sources + 'tools/colors.class.js',
        options.paths.sources + 'tools/css.class.js',
        options.paths.sources + 'tools/ga_tags.class.js',
        options.paths.sources + 'tools/keyboard.class.js',
        options.paths.sources + 'tools/konami_code.class.js',
        options.paths.sources + 'tools/mouse.class.js',
        options.paths.sources + 'tools/offline.class.js',
        options.paths.sources + 'tools/registry.class.js',
        options.paths.sources + 'tools/resizer.class.js',
        options.paths.sources + 'tools/strings.class.js',
        options.paths.sources + 'tools/ticker.class.js',
        options.paths.sources + 'tools/queue.class.js',
    ] )
    .pipe( concat( 'pan-' + options.version + '-no-compatibility.js' ) )
    .pipe( concat.header( before ) )
    .pipe( concat.footer( after ) )
    .pipe( concat.header( signature ) )
    .pipe( gulp.dest( options.paths.destination ) )
    .pipe( uglify() )
    .pipe( concat.header( signature ) )
    .pipe( rename( { extname : '.min.js' } ) )
    .pipe( gulp.dest( options.paths.destination ) );
} );

/**
 * WATCH
 */
gulp.task( 'watch', [ 'js' ], function()
{
    // JS
    watch( [ options.paths.sources + '**' ], function()
    {
        gulp.start( 'js' );
    } );
} );

gulp.task( 'default', [ 'js' ] );
gulp.task( 'start', [ 'watch', 'js' ] );
