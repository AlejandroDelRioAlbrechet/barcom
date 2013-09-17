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
    var theApp          = $.getAndCreateContext( appName, context )
    ,   cache           = {}
    ,   user            = undefined
    ,   users           = undefined
    ,   departments     = undefined
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

    cache.storeUsers = function( data ) 
    {
        users = data;
    };
    
    cache.getUsers = function() 
    {
        return users;
    };

    cache.updateUser = function( id, updatedUser ) 
    {
        for ( var i = 0; i < users.length; i++ ) 
        {
            if ( users[ i ].id === id ) 
            {
                users[ i ] = updatedUser;
                break;
            }
        }
    };

    cache.addUser = function( newUser ) 
    {
        users.push( newUser );
    };

    cache.removeUser = function( id ) 
    {
        for ( var i = 0; i < users.length; i++ ) 
        {
            if ( users[ i ].id === id ) 
            {
                users.remove( i );
                break;
            }
        }
    };
    
    cache.storeDepartments = function( data ) 
    {
        departments = data;
    };
    
    cache.getDepartments = function() 
    {
        return departments;
    };
    
    cache.addDepartment = function( newUser ) 
    {
        departments.add( newUser );
    };
    
    cache.updateDepartment = function( id, updatedDepartment ) 
    {
        for ( var i = 0; i < departments.length; i++ ) 
        {
            if ( departments[ i ].id === id ) 
            {
                departments[ i ] = updatedDepartment;
                break;
            }
        }
    };
    
    cache.removeDepartment = function( id ) 
    {
        for ( var i = 0; i < departments.length; i++ ) 
        {
            if ( departments[ i ].id === id ) 
            {
                departments.remove( i );
                break;
            }
        }
    };
    
} )( jQuery, window, "barcom" );