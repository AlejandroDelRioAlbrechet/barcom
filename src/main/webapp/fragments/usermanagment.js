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
    ,   fragmentName = "usermanagment"
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
        snippets.userRowSnippet = $( ".snippets .userRowSnippet tr", options.context ).remove();

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
        ,   formRules       = 
            {
                login : { required : true }
            ,   email : { required : true, email: true }
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
            ,   identicalCode : { required : true, digits : true }
            }
        ;   

        fragment.afterValidate  =
        {
            addUser : 
            { 
                active : true 
            ,   execute : function( form ) 
                {
                    theApp.services.addUser( 
                    {
                        data : getUserEntiryFromForm()
                    ,   successHandler : function ( data )
                        {
                            data.response.department = $context.find( "#department" ).val().trim();

                            clearFields( $context );

                            $( form ).find( "button" ).popover( { placement : "top", title : "Інформація", content: "Користувача успішно додано!", animation : true } );

                            $( form ).find( "button" ).popover( "show" );
                            setTimeout( function(  ) { $( form ).find( "button" ).popover( "hide" ); }, 3000 );

                            $context.find( ".table-responsive .table tbody" ).append( createUserRow( data.response, $context ) );

                            // TODO: files upload logic
                            //
                        }
                    ,   errorHandler   : function ( data ) 
                        {
                            $( form ).find( "button" ).popover( { placement : "top", title : "Інформація", content: "Користувача успішно не додано логін: '" + $context.find( "#login" ).val() + " вже існує!", animation : true } );

                            $( form ).find( "button" ).popover( "show" );
                            setTimeout( function(  ) { $( form ).find( "button" ).popover( "hide" ); }, 3000 );
                        }
                    } );
                }
            }
        ,   updateUser :
            {
                active : false
            ,   execute : function( form ) 
                {
                    var _this = this;
                    theApp.services.updateUser( 
                    {
                        userId :    _this.userId
                    ,   data :      getUserEntiryFromForm()
                    ,   successHandler : function ( data )
                        {
                            fragment.afterValidate.updateUser.active    = false;
                            fragment.afterValidate.addUser.active       = true;

                            $context.find( ".searchForm"     ).removeClass( "hidden" );
                            $context.find( ".usersContainer" ).removeClass( "hidden" );
                            $context.find( ".addUser"        ).addClass( "hidden" );
                            $context.find( ".addUser .btn-primary" ).text( "Додати" );
                            $( this ).addClass( "hidden" );
                            clearFields( $context );
                            updateUserTableRow( _this.rowItem, data.response );
                        }
                    ,   errorHandler   : function ( data ) 
                        {
                        }
                    } );
                }
            }
        };
        
        $context.find( ".nav.nav-tabs li" ).click( function( e ) 
        {
            e.preventDefault();
            $context.find( ".nav.nav-tabs li" ).removeClass( "active" );
            $( this ).addClass( "active" );
            
            if ( $( this ).hasClass( "add" ) ) 
            {
                $context.find( ".searchForm"     ).addClass( "hidden" );
                $context.find( ".usersContainer" ).addClass( "hidden" );
                $context.find( ".addUser"        ).removeClass( "hidden" );
            }
            else 
            {
                $context.find( ".searchForm"     ).removeClass( "hidden" );
                $context.find( ".usersContainer" ).removeClass( "hidden" );
                $context.find( ".addUser"        ).addClass( "hidden" );
            }
            
            return false;
        } ); 
        
        $context.find( ".nav.nav-tabs a" ).click( function( e ) 
        {
            e.preventDefault();
            $context.find( ".nav.nav-tabs li" ).removeClass( "active" );
            $( this ).parent().addClass( "active" );
            
            if ( $( this ).parent().hasClass( "add" ) ) 
            {
                $context.find( ".searchForm"     ).addClass( "hidden" );
                $context.find( ".usersContainer" ).addClass( "hidden" );
                $context.find( ".addUser"        ).removeClass( "hidden" );
            }
            else 
            {
                $context.find( ".searchForm"     ).removeClass( "hidden" );
                $context.find( ".usersContainer" ).removeClass( "hidden" );
                $context.find( ".addUser"        ).addClass( "hidden" );
            }
            return false;
        } ); 
        
        theApp.services.getAllUsers( 
        {
            successHandler : function ( data )
            {
                $.each( data.response, function() 
                {
                    $context.find( ".table-responsive .table tbody" ).append( createUserRow( this, $context ) );
                } );
            }
        ,   errorHandler   : function ( data ) 
            {
            }
        } );
        
        $context.find( "#department" ).departmentAutoComplete( 
        {
            onSelect : function( item, val, text ) 
            {
                $context.find( "#department" ).attr( "data-department-id", val );
            }
        } );
        $context.find( "#director" ).usersAutoComplete();
        
        $context.find( ".profileForm" ).validate( 
        {
            rules : formRules
        ,   submitHandler : function( form ) 
            {               
                if ( fragment.afterValidate.addUser.active ) 
                {
                    fragment.afterValidate.addUser.execute( form );
                }
                else 
                {
                    fragment.afterValidate.updateUser.execute( form );
                }
                
                return false;
            } 
        } );
        
        function getUserEntiryFromForm() 
        {
            var newUser = {};
            newUser.adress                  = $context.find( "#adress" ).val().trim();
            newUser.birthDate               = $context.find( "#birthDate" ).val().trim();
            newUser.dateOfFormalArrangment  = $context.find( "#officialStartDate" ).val().trim();
            newUser.departmentId            = $context.find( "#department" ).attr( "data-department-id" );
            newUser.department              = $context.find( "#department" ).val().trim();
            newUser.director                = $context.find( "#director" ).val().trim();
            newUser.email                   = $context.find( "#email" ).val().trim();
            newUser.fatherName              = $context.find( "#fathername" ).val().trim();
            newUser.firstName               = $context.find( "#firstname" ).val().trim();
            newUser.homePhoneNumber         = $context.find( "#homeTelephone" ).val().trim();
            newUser.identationCode          = $context.find( "#identicalCode" ).val().trim();
            newUser.lastName                = $context.find( "#lastname" ).val().trim();
            newUser.login                   = $context.find( "#login" ).val().trim();
            newUser.passportNumber          = $context.find( "#pasportNumber" ).val().trim();
            newUser.password                = $context.find( "#login" ).val().trim();
            newUser.phoneNumber             = $context.find( "#telephone" ).val().trim();
            newUser.registaration           = $context.find( "#registrationAdress" ).val().trim();
            newUser.schludeOfWork           = $context.find( "#shclude" ).val().trim();
            newUser.startDate               = $context.find( "#startDate" ).val().trim();
            newUser.workPhoneNumber         = $context.find( "#workTelephone" ).val().trim();
            return newUser;
        }
        
        // Use the fragment navigate function to set the correct fragment state
        //
        fragment.navigate( params );
    };
    
    function clearFields( $context ) 
    {
        $context.find( "#login" ).val( "" );
        $context.find( "#firstname" ).val( "" );
        $context.find( "#lastname" ).val( "" );
        $context.find( "#fathername" ).val( "" );
        $context.find( "#email" ).val( "" );
        $context.find( "#telephone" ).val( "" );
        $context.find( "#adress" ).val( "" );
        $context.find( "#identicalCode" ).val( "" );
        $context.find( "#birthDate" ).val( "" );
        $context.find( "#pasportNumber" ).val( "" );
        $context.find( "#registrationAdress" ).val( "" );
        $context.find( "#homeTelephone" ).val( "" );
        $context.find( "#workTelephone" ).val( "" );
        $context.find( "#department" ).val( "" );
        $context.find( "#director" ).val( "" );
        $context.find( "#shclude" ).val( "" );
        $context.find( "#startDate" ).val( "" );
        $context.find( "#officialStartDate" ).val( "" );
        $context.find( "#officialStartDate" ).val( "" );
        $context.find( "#password2" ).val( "" );
        $context.find( "#password" ).val( "" );
    }
    
    function createUserRow( user, $context ) 
    {
        var $userSnippet = snippets.userRowSnippet.clone();
        
        updateUserTableRow( $userSnippet, user );
        
        $userSnippet.find( ".view" ).click( function( e ) 
        {
            e.preventDefault();
            return false;
        } );
        
        $userSnippet.find( ".edit" ).click( function( e ) 
        {
            e.preventDefault();
            
            fragment.afterValidate.updateUser.active    = true;
            fragment.afterValidate.addUser.active       = false;
            fragment.afterValidate.updateUser.userId    = user.id;
            fragment.afterValidate.updateUser.rowItem   = $userSnippet;
            
            $context.find( "#login" ).val(              user.login );
            $context.find( "#firstname" ).val(          user.firstName );
            $context.find( "#lastname" ).val(           user.lastName );
            $context.find( "#fathername" ).val(         user.fatherName );
            $context.find( "#email" ).val(              user.email );
            $context.find( "#telephone" ).val(          user.phoneNumber );
            $context.find( "#adress" ).val(             user.adress );
            $context.find( "#identicalCode" ).val(      user.identationCode );
            $context.find( "#birthDate" ).val(          user.birthDate );
            $context.find( "#pasportNumber" ).val(      user.passportNumber );
            $context.find( "#registrationAdress" ).val( user.registaration );
            $context.find( "#homeTelephone" ).val(      user.homePhoneNumber );
            $context.find( "#workTelephone" ).val(      user.workPhoneNumber );
            $context.find( "#department" ).val(         user.department ).attr( "data-department-id", user.departmentId );
            $context.find( "#director" ).val(           user.director );
            $context.find( "#shclude" ).val(            user.schludeOfWork );
            $context.find( "#startDate" ).val(          user.startDate );
            $context.find( "#officialStartDate" ).val(  user.dateOfFormalArrangment );
            
            $context.find( ".searchForm"     ).addClass( "hidden" );
            $context.find( ".usersContainer" ).addClass( "hidden" );
            $context.find( ".addUser .btn-primary" ).text( "Редагувати користувача" );
            $context.find( ".addUser"        ).removeClass( "hidden" )
                    .find( "button.btn-default" ).removeClass( "hidden" )
                    .unbind( "click" ).click( function( e ) 
            {
                e.preventDefault();
                
                fragment.afterValidate.updateUser.active    = false;
                fragment.afterValidate.addUser.active       = true;
                
                $context.find( ".searchForm"     ).removeClass( "hidden" );
                $context.find( ".usersContainer" ).removeClass( "hidden" );
                $context.find( ".addUser"        ).addClass( "hidden" );
                $context.find( ".addUser .btn-primary" ).text( "Додати" );
                $( this ).addClass( "hidden" );
                clearFields( $context );
                return false;
            } );
            
            return false;
        } );
        
        $userSnippet.find( ".remove" ).click( function( e ) 
        {
            e.preventDefault();
            theApp.popup( 
            {
                title:      "Видалення департамент"
            ,   content:    "<span>Ви дійсно хочете видалити користувача, " + user.firstName + " " + user.lastName + " " + user.fatherName + "</span>" 
            ,   yes :       "Видалити"
            ,   callback: function( choice, success )
                {
                    if ( choice ) 
                    {
                        $userSnippet.find( ".remove i" )
                                    .removeClass( "glyphicon-remove" )
                                    .addClass( "glyphicon-repeat" )
                                    .addClass( "loadingIcon" );
                        theApp.services.removeUser( 
                        {
                            userId : user.id
                        ,   successHandler : function ( data )
                            {
                                $userSnippet.find( ".remove i" )
                                    .removeClass( "glyphicon-repeat" )
                                    .addClass( "glyphicon-remove" )
                                    .removeClass( "loadingIcon" );
                                
                                $userSnippet.remove();
                                
                                success();
                            }
                        ,   errorHandler   : function ( data ) 
                            {
                            }
                        } );
                    }
                }
            } );
            return false;
        } );
        
        return $userSnippet;
    }
    
    function updateUserTableRow( $userRowItem, user ) 
    {
        $userRowItem.find( ".index"           ).html( user.id );
        $userRowItem.find( ".name"            ).html( user.firstName + " " + user.lastName + " " + user.fatherName );
        $userRowItem.find( ".department"      ).html( user.department );
        $userRowItem.find( ".homePhoneNumber" ).html( user.homePhoneNumber );
        $userRowItem.find( ".workPhoneNumber" ).html( user.workPhoneNumber );
        $userRowItem.find( ".homeAdress"      ).html( user.adress );
        $userRowItem.find( ".email"           ).html( user.email );
        $userRowItem.find( ".birthData"       ).html( user.birthDate );
        $userRowItem.find( ".index"           ).html( user.id );
        $userRowItem.find( ".dateOfOfficialArrangment" ).html( user.dateOfFormalArrangment );
    }
    
    // Private methods
    //

    // Expose the fragment (html and js names must match)
    //
    theApp.fragments.registerFragment( fragmentName, fragment );
    
} )( jQuery, window, "barcom" );