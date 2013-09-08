/**
 * @description The client-side cache (page-persistant)
 *
 * <p>The cache contains any data that is (temporarily) stored in the client.
 * Backend calls can store their data here to prevent excessive service calling.
 * Ultimately the controller calls the services and determines when and what
 * is cached.</p>
 *
 * @namespace
 * @name cache
 * @version 1.0
 * @author Alejandro Del Rio
 */
;( function( $, context, appName )
{
    var theApp   = $.getAndCreateContext( appName, context )
    ,   cache    = {}
    ,   user     = undefined
    ;

    theApp.cache = cache;
    
    cache.storeUser = function( userData ) 
    {
        user = userData;
    };

    cache.getUser = function() 
    {
        return user;
    };

} )( jQuery, window, "barcom" );