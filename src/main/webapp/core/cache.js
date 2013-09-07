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
    ;

    theApp.cache = cache;

    // The (private) cache data
    //
    var $xmlSomething = null;

   /**
    * EXAMPLE: This function would be used to store updated application data.
    * Events are sent to notify that the cache has been updated
    *
    * @param data   (Document)  XML Document
    */
    cache.storeSomething = function( data )
    {
        $xmlSomething = $( data );
    };

    /**
     * EXAMPLE: Retrieves a bit of data from the cache
     *
     * @return (Array) The requested "Something" data as a jQuery object array
     */
    cache.getSomething = function()
    {
        return $xmlSomething.find( "Something" );
    };

    /**
     * EXAMPLE: Retrieves a more specific bit of data from the cache
     *
     * @return (Array) The requested "Else" data as a jQuery object array
     */
    cache.getSomethingElse = function()
    {
        return $xmlSomething.find( "Something Else" );
    };
} )( jQuery, window, "barcom" );