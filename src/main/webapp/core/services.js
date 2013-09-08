/**
 * The collection of backend service functions.
 *
 * @namespace
 * @name services
 * @version 1.0
 * @author Alejandro Del Rio
 */
;( function( $, context, appName )
{
    var theApp          = $.getAndCreateContext( appName, context )
    ,   services        = {}
    ;

    theApp.services     = services;

    services.login = function( params )
    {
        var options = $.extend(
        {
            successHandler: function(){},
            errorHandler:   function(){},
        }, params );

        $.ajax(
        {
            type:   "POST"
        ,   url:    "rest/login/"
        ,   data:   JSON.stringify( options.data )
        ,   success: function( data, status, xhr )
            {
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.logout = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){},
            errorHandler:   function(){},
        }, params );
        
        $.ajax(
        {
            type:   "DELETE"
        ,   url:    "rest/login/"
        ,   success: function( data, status, xhr )
            {
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.getUser = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){},
            errorHandler:   function(){},
        }, params );
        
        if ( theApp.cache.getUser() ) 
        {
            options.successHandler( { response: theApp.cache.getUser() } );
            return;
        }
        
        $.ajax(
        {
            type:   "GET"
        ,   url:    "rest/login/"
        ,   success: function( data, status, xhr )
            {
                theApp.cache.storeUser( data );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
})( jQuery, window, "barcom" );