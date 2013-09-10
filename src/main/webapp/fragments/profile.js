/**
 * <p>EXAMPLE: This is an example fragment for the jQuery sandbox.
 * It registers itself and it's location aware so it can be used multiple times on the same page.</p>
 *
 * @namespace
 * @name myFragment
 * @version 1.0
 * @author Alejandro Del Rio
 */
;( function( $, context, appName )
{
    var initialized  = false
    ,   fragmentName = "profile"
    ,   fragment     = {}
    ,   snippets     = {}
    ,   options      = {}
    ,   theApp       = context[ appName ];

    /**
     * Fragment initialization function used for everything that only needs to be done once.
     * Once a fragment has been initialized this function will immediatly stop executing.
     */
    fragment.init = function()
    {
        if ( true === initialized ) { return; }

        // Setup event handlers
        //

        // Copy the snippets
        //
        snippets.exampleSnippet = $( " .snippet", options.context ).clone();

        // Set the initialized flag
        //
        initialized = true;
    };

    /**
     * Fragment navigate function that can be called to change the current state of the fragment.
     * This function is used together with the browser history support plugin (BBQ).
     *
     * @return (boolean) Indicates the requested fragment state has been activated
     */
    fragment.navigate = function()
    {
        var success     = true
        ,   $context    = $( options.context )
        ;

        return success;
    };

    /**
     * Fragment update function that can be called multiple times to update the fragments HTML
     *
     * @param params   (structure) Any data that is needed by the module
     */
    fragment.update = function( params )
    {
        options = $.extend( options, params );

        if ( false === initialized )
        {
            fragment.init();
        }

        var $context        = $( options.context )
        ;
        
        theApp.services.getUser( 
        {
            successHandler : function ( data )
            {
                $( "#login" ).val( data.response.login );
                $( "#firstname" ).val( data.response.firstName );
                $( "#lastname" ).val( data.response.lastName );
                $( "#email" ).val( data.response.email );
                $( "#telephone" ).val( data.response.phoneNumber );
                $( "#adress" ).val( data.response.adress );
                
                $context.find( ".profileForm" ).validate( 
                {
                    rules : 
                    {
                        login : 
                        {
                            required : true
                        }
                    ,   email : 
                        {
                            required : true
                        }
                    ,   firstname : 
                        {
                            required : true
                        }
                    ,   lastname : 
                        {
                            required : true
                        }
                    ,   telephone : 
                        {
                            required : true
                        }
                    ,   adress : 
                        {
                            required : true
                        }
                    ,   password : 
                        {
                            required : true
                        }
                    ,   password2 : 
                        {
                            required : true
                        ,    equalTo: "#password"
                        }
                    }
                ,   submitHandler : function( form ) 
                    {
                        var updatedUser = data.response;
                        updatedUser.adress = $( "#adress" ).val().trim();
                        updatedUser.email = $( "#email" ).val().trim();
                        updatedUser.firstName = $( "#firstname" ).val().trim();
                        updatedUser.lastName = $( "#lastname" ).val().trim();
                        updatedUser.login = $( "#login" ).val().trim();
                        updatedUser.phoneNumber = $( "#telephone" ).val().trim();
                        updatedUser.password = $( "#password" ).val().trim();
                        
                        theApp.services.updateUser( 
                        {
                            userId : data.response.id
                        ,   data :   updatedUser
                        ,   successHandler : function ( data )
                            {
                               
                            }
                        ,   errorHandler   : function ( data ) 
                            {
                            }
                        } );
                    }
                } );
            }
        ,   errorHandler   : function ( data ) 
            {
                
            }
        } );
        
        var dropbox = document.getElementById( "dropbox" )
        ,   dragEventLeave = function( e ) 
            {
                e.stopPropagation();
                e.preventDefault();
            }
        ;

        dropbox.addEventListener( "dragenter", dragEventLeave, false);
        dropbox.addEventListener( "dragleave", dragEventLeave, false);
        dropbox.addEventListener( "dragover", function( e ) 
        {
            e.stopPropagation()
            e.preventDefault()
            var clazz = 'not-available';
            var ok = e.dataTransfer && e.dataTransfer.types && e.dataTransfer.types.indexOf( 'Files' ) >= 0
            if ( ok ) 
            {
                $( "#dropbox span" ).text( "Кинь файли у цей регіон" ).removeClass( "not-available" ).addClass( "over" ); 
            }
            else 
            {
                $( "#dropbox span" ).text( "Дозволено додавати лише файли" ).removeClass( "over" ).addClass( "not-available" );
            }

        }, false );
        
        dropbox.addEventListener( "drop", function(evt) 
        {
            console.log('drop evt:', JSON.parse(JSON.stringify(evt.dataTransfer)))
            evt.stopPropagation()
            evt.preventDefault()
//        scope.$apply(function(){
//            scope.dropText = 'Drop files here...'
//            scope.dropClass = ''
//        })
            var files = evt.dataTransfer.files;
            if ( files.length > 0 ) 
            {
//            scope.$apply(function(){
//                scope.files = []
                for ( var i = 0; i < files.length; i++ ) 
                {
//                    scope.files.push(files[i])
                }
//            })
            }
        }, false)
        
        // Use the fragment navigate function to set the correct fragment state
        //
        fragment.navigate( params );
    };

    // Private methods
    //

    // Expose the fragment (html and js names must match)
    //
    theApp.fragments.registerFragment( fragmentName, fragment );
} )( jQuery, window, "barcom" );