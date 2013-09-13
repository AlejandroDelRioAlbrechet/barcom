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
                
                $context.find( ".userImage" ).attr( "action", "rest/file-upload/user-image/" + data.response.id );

                if ( data.response.imagePath ) 
                {
                    $(  ".highlight img" ).removeClass( "hidden" ).attr( "src", data.response.imagePath );
                }
                
                $context.find( "#login" ).val( data.response.login );
                $context.find( "#firstname" ).val( data.response.firstName );
                $context.find( "#lastname" ).val( data.response.lastName );
                $context.find( "#fathername" ).val( data.response.fatherName );
                $context.find( "#email" ).val( data.response.email );
                $context.find( "#telephone" ).val( data.response.phoneNumber );
                $context.find( "#adress" ).val( data.response.adress );
                $context.find( "#identicalCode" ).val( data.response.identationCode );
                $context.find( "#birthDate" ).val( data.response.birthDate );
                $context.find( "#pasportNumber" ).val( data.response.passportNumber );
                $context.find( "#registrationAdress" ).val( data.response.registaration );
                $context.find( "#homeTelephone" ).val( data.response.homePhoneNumber );
                $context.find( "#workTelephone" ).val( data.response.workPhoneNumber );
                $context.find( "#department" ).val( data.response.department );
                $context.find( "#director" ).val( data.response.director );
                $context.find( "#shclude" ).val( data.response.schludeOfWork );
                $context.find( "#startDate" ).val( data.response.startDate );
                $context.find( "#officialStartDate" ).val( data.response.dateOfFormalArrangment );
                
                $context.find( ".profileForm" ).validate( 
                {
                    rules : 
                    {
                        login : { required : true }
                    ,   email : { required : true }
                    ,   firstname :  { required : true }
                    ,   lastname :  { required : true }
                    ,   telephone :  { required : true }
                    ,   adress :  { required : true }
                    ,   password :  { required : true }
                    ,   password2 :  { required : true ,    equalTo: "#password" }
                    ,   fathername :  { required : true }
                    ,   officialStartDate :  { required : true }
                    ,   startDate :  { required : true }
                    ,   shclude : { required : true }
                    ,   director :  { required : true }
                    ,   department :  { required : true }
                    ,   workTelephone :  { required : true }
                    ,   homeTelephone :  { required : true }
                    ,   registrationAdress :  { required : true }
                    ,   pasportNumber :  { required : true }
                    ,   birthDate :     { required : true }
                    ,   identicalCode : { required : true }
                    }
                ,   submitHandler : function( form ) 
                    {
                        var updatedUser                     = data.response;
                        updatedUser.adress                  = $context.find( "#adress" ).val().trim();
                        updatedUser.birthDate               = $context.find( "#birthDate" ).val().trim();
                        updatedUser.dateOfFormalArrangment  = $context.find( "#officialStartDate" ).val().trim();
                        updatedUser.department              = $context.find( "#department" ).val().trim();
                        updatedUser.director                = $context.find( "#director" ).val().trim();
                        updatedUser.email                   = $context.find( "#email" ).val().trim();
                        updatedUser.fatherName              = $context.find( "#fathername" ).val().trim();
                        updatedUser.firstName               = $context.find( "#firstname" ).val().trim();
                        updatedUser.homePhoneNumber         = $context.find( "#homeTelephone" ).val().trim();
                        updatedUser.identationCode          = $context.find( "#identicalCode" ).val().trim();
                        updatedUser.lastName                = $context.find( "#lastname" ).val().trim();
                        updatedUser.login                   = $context.find( "#login" ).val().trim();
                        updatedUser.passportNumber          = $context.find( "#pasportNumber" ).val().trim();
                        updatedUser.password                = $context.find( "#login" ).val().trim();
                        updatedUser.phoneNumber             = $context.find( "#telephone" ).val().trim();
                        updatedUser.registaration           = $context.find( "#registrationAdress" ).val().trim();
                        updatedUser.schludeOfWork           = $context.find( "#shclude" ).val().trim();
                        updatedUser.startDate               = $context.find( "#startDate" ).val().trim();
                        updatedUser.workPhoneNumber         = $context.find( "#officialStartDate" ).val().trim();
                        
                        theApp.services.updateUser( 
                        {
                            userId : data.response.id
                        ,   data :   updatedUser
                        ,   successHandler : function ( data )
                            {
                                // TODO : SUCCESS message
                                //
                            }
                        ,   errorHandler   : function ( data ) 
                            {
                            }
                        } );
                    }
                } );
                
                $context.find( ".userImage" ).validate( 
                {
                    rules : 
                    {
                        file : { required : true }
                    }
                ,   submitHandler : function( form ) 
                    {
                        $context.find( ".userImage" ).ajaxSubmit( 
                        {
                            success : function( responseText, statusText, xhr, $form )
                            {
                                // TODO: SHOW USER IMAGE
                                //
                                $(  ".highlight img" ).attr( "src", responseText );
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