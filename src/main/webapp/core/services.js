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
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );

        $.ajax(
        {
            type:   "POST"
        ,   url:    "rest/login/"
        ,   data:   JSON.stringify( options.data )
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
    
    services.logout = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );
        
        $.ajax(
        {
            type:   "DELETE"
        ,   url:    "rest/login/"
        ,   success: function( data, status, xhr )
            {
                theApp.cache.storeUser( undefined );
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
            successHandler: function(){}
        ,   errorHandler:   function(){}
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
    
    services.removeUser = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );
        
        $.ajax(
        {
            type:   "DELETE"
        ,   url:    "rest/user/" + options.userId
        ,   success: function( data, status, xhr )
            {
                theApp.cache.removeUser( options.userId );    
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.getAllUsers = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );
        
        if ( theApp.cache.getUsers() ) 
        {
            options.successHandler( { response: theApp.cache.getUsers() } );
            return;
        }
        
        $.ajax(
        {
            type:   "GET"
        ,   url:    "rest/user/"
        ,   success: function( data, status, xhr )
            {
                theApp.cache.storeUsers( data );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.updateUser = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );

        $.ajax(
        {
            type:   "PUT"
        ,   url:    "rest/user/" + options.userId
        ,   data:   JSON.stringify( options.data )
        ,   success: function( data, status, xhr )
            {
                theApp.cache.updateUser( options.userId, data );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.addUser = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );

        $.ajax(
        {
            type:   "POST"
        ,   url:    "rest/user/"
        ,   data:   JSON.stringify( options.data )
        ,   success: function( data, status, xhr )
            {
                theApp.cache.addUser( data );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.getAllDepartments = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );
        
        if ( theApp.cache.getDepartments() ) 
        {
            options.successHandler( { response: theApp.cache.getDepartments(), xhr: null } );
            return;
        }
        
        $.ajax(
        {
            type:   "GET"
        ,   url:    "rest/department/"
        ,   success: function( data, status, xhr )
            {
                theApp.cache.storeDepartments( data );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.removeDepartment = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );
        
        $.ajax(
        {
            type:   "DELETE"
        ,   url:    "rest/department/" + options.departmentId
        ,   success: function( data, status, xhr )
            {
                theApp.cache.removeDepartment( options.departmentId );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.addDepartment = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );
        
        $.ajax(
        {
            type:   "POST"
        ,   url:    "rest/department/"
        ,   data :  JSON.stringify( options.data )
        ,   success: function( data, status, xhr )
            {
                theApp.cache.addDepartment( data );
                options.successHandler( { response: data, xhr: xhr } );
            }
        ,   error: function( xhr, status, error )
            {
                options.errorHandler( { status : status, xhr: xhr } );
            }
        ,   contentType: "application/json"
        } );
    };
    
    services.updateDepartment = function( params ) 
    {
        var options = $.extend(
        {
            successHandler: function(){}
        ,   errorHandler:   function(){}
        }, params );

        $.ajax(
        {
            type:   "PUT"
        ,   url:    "rest/department/" + options.departmentId
        ,   data:   JSON.stringify( options.data )
        ,   success: function( data, status, xhr )
            {
                theApp.cache.updateDepartment( options.departmentId, data );
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