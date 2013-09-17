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
                $.each( data, function( index ) 
                {
                    // TODO: Build user row.
                    // 
                    
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
                
            }
        } );
        
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
                
            } 
        } );
        
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