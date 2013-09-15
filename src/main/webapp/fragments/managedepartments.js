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
    ,   fragmentName = "managedepartments"
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
        snippets.rowItem = $( ".snippets tr", options.context ).remove();
        snippets.removeItemDialog = $( ".snippets .removeContent", options.context ).remove();
        snippets.addNewDepartment = $( ".snippets .addNewDepartment", options.context ).remove();
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
        
        $context.find( ".addDepartment" ).click( function( e ) 
        {
            e.preventDefault();
            var $content = snippets.addNewDepartment.clone();
            theApp.popup( 
            {
                title:      "Додати новий департамент"
            ,   content:    $content
            ,   yes :       "Додати"
            ,   callback: function( choice, success )
                {
                    if ( choice ) 
                    {
                        $content.removeData( "validator" ).validate( 
                        {
                            rules : 
                            {
                                deparmtentName : { required: true }
                            ,   deparmtentDirector : { required: true }
                            ,   deparmtentContactInfo : { required: true }
                            }
                        ,   invalidHandler : function() 
                            {
                                $( "#confirmModal .btn-primary" ).button( "reset" );
                            }
                        ,   submitHandler : function( form ) 
                            {
                                theApp.services.addDepartment( 
                                {
                                    data : 
                                    {
                                        contactInfo:    $content.find( "#deparmtentContactInfo" ).val().trim()
                                    ,   director:       $content.find( "#deparmtentDirector" ).val().trim()
                                    ,   name:           $content.find( "#deparmtentName" ).val().trim()
                                    }
                                ,   successHandler : function ( data )
                                    {
                                         success();
                                         $context.find( ".table tbody" ).append( createDepartmentItem( $context.find( ".table tbody" ).children().length, data.response, $context.find( ".table tbody" ) ) );
                                         $( "#confirmModal .btn-primary" ).button( "reset" );
                                         
                                    }
                                ,   errorHandler   : function ( data ) 
                                    {
                                        $( "#confirmModal .btn-primary" ).button( "reset" );
                                    }
                                } );
                            }
                        } );
                        
                        $content.submit();
                    }    
               }
            } );
           
            return false;
        } );
        
        theApp.services.getAllDepartments( 
        {
            successHandler : function ( data )
            {
                var $table = $context.find( ".table tbody" );
                
                $.each( data.response, function( index, department ) 
                {
                    $table.append( createDepartmentItem( index, department, $table ) );
                } );
            }
        ,   errorHandler   : function ( data ) 
            {
            }
        } );
        
        // Use the fragment navigate function to set the correct fragment state
        //
        fragment.navigate( params );
    };
    
    function createDepartmentItem( index, department, $container ) 
    {
        var $item = snippets.rowItem.clone();
        $item.find( ".index" ).text( index + 1 );
        $item.find( ".name" ).text( department.name );
        $item.find( ".director" ).text( department.director );
        $item.find( ".contactInfo" ).text( department.contactInfo );
        
        $item.find( ".actions .glyphicon-pencil" ).click( function( e ) 
        {
            e.preventDefault();
            var $content = snippets.addNewDepartment.clone();
            
            $content.find( "#deparmtentName" ).val( department.name );
            $content.find( "#deparmtentDirector" ).val( department.director );
            $content.find( "#deparmtentContactInfo" ).val( department.contactInfo );
            
            theApp.popup( 
            {
                title:      "Редагувати департамент " + department.name
            ,   content:    $content
            ,   yes :       "Редагувати"
            ,   callback: function( choice, success )
                {
                    if ( choice ) 
                    {
                        $content.removeData( "validator" ).validate( 
                        {
                            rules : 
                            {
                                deparmtentName : { required: true }
                            ,   deparmtentDirector : { required: true }
                            ,   deparmtentContactInfo : { required: true }
                            }
                        ,   invalidHandler : function() 
                            {
                                $( "#confirmModal .btn-primary" ).button( "reset" );
                            }
                        ,   submitHandler : function( form ) 
                            {
                                theApp.services.updateDepartment( 
                                {
                                    data : 
                                    {
                                        contactInfo:    $content.find( "#deparmtentContactInfo" ).val().trim()
                                    ,   director:       $content.find( "#deparmtentDirector" ).val().trim()
                                    ,   name:           $content.find( "#deparmtentName" ).val().trim()
                                    }
                                ,   departmentId : department.id
                                ,   successHandler : function ( data )
                                    {
                                        success();
                                         
                                        $item.find( ".name" ).text( data.response.name );
                                        $item.find( ".director" ).text( data.response.director );
                                        $item.find( ".contactInfo" ).text( data.response.contactInfo );
                                         
                                        $( "#confirmModal .btn-primary" ).button( "reset" );
                                    }
                                ,   errorHandler   : function ( data ) 
                                    {
                                        $( "#confirmModal .btn-primary" ).button( "reset" );
                                    }
                                } );
                            }
                        } );
                        
                        $content.submit();
                    }    
               }
            } );
            
            return false;
        } );
        
        $item.find( ".actions .glyphicon-remove" ).click( function( e ) 
        {
            e.preventDefault();
            var $content = snippets.removeItemDialog.clone();

            theApp.popup( 
            {
                title: "Видалити департамент " + department.name
            ,   content: $content
            ,   yes : "Видалити"
            ,   callback: function( choice, success )
                {
                   if ( choice ) 
                   {
                        theApp.services.removeDepartment(
                        {
                            departmentId : department.id
                        ,   successHandler : function ( data )
                            {
                                $item.hide().remove();
                                $container.children().each( function( index, element ) 
                                {
                                    $( element ).find( ".index" ).text( index + 1 );
                                } );
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
        
        return $item;
    }
    
    // Private methods
    //

    // Expose the fragment (html and js names must match)
    //
    theApp.fragments.registerFragment( fragmentName, fragment );
    
} )( jQuery, window, "barcom" );