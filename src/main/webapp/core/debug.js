/**
 * @description This adds a browser safe version of console.log to the main
 * application context. It does not override or enhance console.log itself but
 * merely uses it when available.
 *
 * @namespace
 * @name debug
 * @version 1.0
 * @author Alejandro Del Rio
 */
;( function( $, context, appName )
{
    var theApp = $.getAndCreateContext( appName, context );

    /**
     * Wrapper call for console.log( .. ) to prevent errors on browsers that do
     * not support this call
     *
     * @name        log
     * @memberOf    debug
     * @param       any     (any)   All parameters are passed using apply(...)
     */
    theApp.log = function()
    {
        if ( !window[ "console" ] || typeof console.log !== "function" )
        {
            return;
        }

        console.log.apply( console, arguments );
    };

    /**
     * Wrapper call for console.warn( .. ) to prevent errors on browsers that do
     * not support this call
     *
     * @name        warn
     * @memberOf    debug
     * @param       any     (any)   All parameters are passed using apply(...)
     */
    theApp.warn = function()
    {
        if ( !window[ "console" ] || typeof console.warn !== "function" )
        {
            return;
        }

        console.warn.apply( console, arguments );
    };

    /**
     * Wrapper call for console.error( .. ) to prevent errors on browsers that do
     * not support this call
     *
     * @name        error
     * @memberOf    debug
     * @param       any     (any)   All parameters are passed using apply(...)
     */
    theApp.error = function()
    {
        if ( !window[ "console" ] || typeof console.error !== "function" )
        {
            return;
        }

        console.error.apply( console, arguments );
    };
} )( jQuery, window, "barcom" );