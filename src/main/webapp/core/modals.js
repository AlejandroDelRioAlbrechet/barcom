/**
 * @description Standard modal dialog support
 *
 * @namespace
 * @name modals
 * @version 1.0
 * @author Alejandro Del Rio
 */
;( function( $, context, appName )
{
    var theApp          = $.getAndCreateContext( appName, context )
    ;

    theApp.popupInfo = function( params )
    {
        if ( !params ) {return;}
        
        var $modal = $( "#infoModal" );
        
        var options = $.extend(
        {
            title: "Make a choice",
            content: "",
            width: 500
        }, params );
        
        $modal.css( "width", options.width + "px" );
        $modal.find( ".modal-header h3" ).text( options[ "title"   ] || "Make a choice" );
        $modal.find( ".modal-body"      ).html( options[ "content" ] || "No text available" );
        
        // Setup event handler for yes/no click
        //
        $modal.find( ".modal-footer .btn-primary" ).unbind( "click" ).bind( "click", function( e )
        {
            e.preventDefault();
            
            $modal.modal( 'hide' );
        } );

        $modal.modal( 'show' );
    };

    theApp.confirm = function( params )
    {
        if ( !params ) {return;}
        
        var $modal = $( "#confirmModal" );
        
        var options = $.extend(
        {
            title: "Make a choice",
            content: "",
            width: 500
        }, params );
        
        $modal.css( "width", options.width + "px" );
        $modal.find( ".btn-primary"     ).text( options[ "yes" ] || "Save"  ).button();
        $modal.find( ".btn-cancel"      ).text( options[ "no"  ] || "Cancel" );
        $modal.find( ".modal-header h3" ).text( options[ "title"   ] || "Make a choice" );
        $modal.find( ".modal-body"      ).html( options[ "content" ] || "No text available" );
        $modal.find( ".modal-footer .btn-primary" ).removeAttr( 'disabled' ).removeClass( 'disabled' );
        $modal.unbind( 'hidden' ).on( 'hidden', options[ 'afterHide' ] );
        
        $modal.unbind( 'shown' ).on( 'shown', function(  ) 
        {
            $( '.modal-backdrop' ).each( function( index ) 
            {
                if( $( '.modal-backdrop' ).size(  ) > 1 ) 
                {
                    $( this ).hide(  ).remove(  );
                }
            } );
        } );
        
        // Setup event handler for yes/no click
        //
        $modal.find( ".modal-footer .btn-primary" ).unbind( "click" ).bind( "click", function( e )
        {
            e.preventDefault();
            
            $modal.find( ".modal-footer .btn-primary" ).button( 'loading' );

            if ( $.isFunction( params[ "callback" ] ) )
            {
                params.callback( $( this ).attr( "class" ).match( "btn-primary" ) ? true : false, function(  ) 
                {
                    $modal.find( ".modal-footer .btn-primary" ).button( 'complete' );                
                    $modal.modal( 'hide' );
                    $modal.find( ".modal-footer .btn-primary" ).unbind( "click" );   
                });                
            }
        } );

        $modal.modal( 'show' );
    };
    
    theApp.popup = function( params )
    {
        if ( !params ) {return;}
        
        var $modal = $( "#confirmModal" );
        
        var options = $.extend(
        {
            title: "Make a choice"
        ,   content: ""
        }, params );
        
        $modal.find( ".btn-primary"     ).text( options[ "yes" ] || "Save"  ).button();
        $modal.find( ".btn-cancel"      ).text( options[ "no"  ] || "Cancel" );
        $modal.find( ".modal-header h4" ).text( options[ "title"   ] || "Make a choice" );
        $modal.find( ".modal-body"      ).html( options[ "content" ] || "No text available" );
        $modal.find( ".modal-footer .btn-primary" ).removeAttr( 'disabled' ).removeClass( 'disabled' );
        $modal.unbind( 'hidden' ).on( 'hidden', options[ 'afterHide' ] );
        
        $modal.unbind( 'shown' ).on( 'shown', function(  ) 
        {
            $( '.modal-backdrop' ).each( function( index ) 
            {
                if( $( '.modal-backdrop' ).size(  ) > 1 ) 
                {
                    $( this ).hide(  ).remove(  );
                }
            } );
        } );
        
        // Setup event handler for yes/no click
        //
        $modal.find( ".modal-footer .btn-primary" ).unbind( "click" ).bind( "click", function( e )
        {
            e.preventDefault();
            
            $modal.find( ".modal-footer .btn-primary" ).button( 'loading' );

            if ( $.isFunction( params[ "callback" ] ) )
            {
                params.callback( $( this ).attr( "class" ).match( "btn-primary" ) ? true : false, function(  ) 
                {
                    $modal.find( ".modal-footer .btn-primary" ).button( 'complete' );                
                    $modal.modal( 'hide' );
                    $modal.find( ".modal-footer .btn-primary" ).unbind( "click" );   
                });                
            }
        } );

        $modal.modal( { show: true, backdrop: false } );
    };
    
} )( jQuery, window, "barcom" );