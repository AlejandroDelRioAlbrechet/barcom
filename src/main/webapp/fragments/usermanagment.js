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
        ;
        
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
                $.each( data.response, function( index ) 
                {
                    // TODO: Build user row.
                    // 
                    $context.find( ".table-responsive .table tbody" ).append( createUserRow( this ) );
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
            rules : 
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
        ,   submitHandler : function( form ) 
            {               
                theApp.services.addUser( 
                {
                    data : getUserEntiryFromForm()
                ,   successHandler : function ( data )
                    {
                        data.response.department = $context.find( "#department" ).val().trim();
                        
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
                        
                        $( form ).find( "button" ).popover( { placement : "top", title : "Інформація", content: "Користувача успішно додано!", animation : true } );
                        
                        $( form ).find( "button" ).popover( "show" );
                        setTimeout( function(  ) { $( form ).find( "button" ).popover( "hide" ); }, 3000 );
                        
                        $context.find( ".table-responsive .table tbody" ).append( createUserRow( data.response ) );
                        
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
        } );
        
        function getUserEntiryFromForm() 
        {
            var newUser = {};
            newUser.adress                  = $context.find( "#adress" ).val().trim();
            newUser.birthDate               = $context.find( "#birthDate" ).val().trim();
            newUser.dateOfFormalArrangment  = $context.find( "#officialStartDate" ).val().trim();
            newUser.department              = $context.find( "#department" ).attr( "data-department-id" );
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
    
    function createUserRow( user ) 
    {
        var $userSnippet = snippets.userRowSnippet.clone();
        $userSnippet.find( ".index"           ).html( user.id );
        $userSnippet.find( ".name"            ).html( user.firstName + " " + user.lastName + " " + user.fatherName );
        $userSnippet.find( ".department"      ).html( user.department );
        $userSnippet.find( ".homePhoneNumber" ).html( user.homePhoneNumber );
        $userSnippet.find( ".workPhoneNumber" ).html( user.workPhoneNumber );
        $userSnippet.find( ".homeAdress"      ).html( user.adress );
        $userSnippet.find( ".email"           ).html( user.email );
        $userSnippet.find( ".birthData"       ).html( user.birthDate );
        $userSnippet.find( ".index"           ).html( user.id );
        $userSnippet.find( ".dateOfOfficialArrangment" ).html( user.dateOfFormalArrangment );
        
        $userSnippet.find( "a" ).click( function( e ) 
        {
            e.preventDefault();
            return false;
        } );
        
        return $userSnippet;
    }
    
    // Private methods
    //

    // Expose the fragment (html and js names must match)
    //
    theApp.fragments.registerFragment( fragmentName, fragment );
    
} )( jQuery, window, "barcom" );