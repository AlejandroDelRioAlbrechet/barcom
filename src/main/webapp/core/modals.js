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
    ,   onCloseDialog   = null

    // The modal dialog trigger elements
    //
    ,   $alert      = $( "<a href='#alert'  rel='#iqModalAlert'></a>"  )
    ,   $confirm    = $( "<a href='#choice' rel='#iqModalChoice'></a>" )
    ;

    // Add default modal settings but don't override existing values
    //
    theApp.settings = $.extend( {   dialogMask: {
                                        color:          "#333"
                                    ,   loadSpeed:      100
                                    ,   opacity:        0.7
                                    }
                                ,   dialogSettings: {
                                        fixed:          false
                                    ,   top:            "10%"
                                    ,   closeOnClick:   false
                                    }
                                }, ( theApp.settings || {} ) );

    // Create the overlays
    //
    $( document ).ready( function()
    {
        $alert.overlay(
        {
            close:        "> .close, [href$='#close']"
        ,   mask:         theApp.settings.dialogMask
        ,   top:          theApp.settings.dialogSettings.top
        ,   fixed:        theApp.settings.dialogSettings.fixed
        ,   closeOnClick: theApp.settings.dialogSettings.closeOnClick
        ,   onClose:      function()
                          {
                              if ( $.isFunction( onCloseDialog ) )
                              {
                                  onCloseDialog();
                              }
                              onCloseDialog = null;
                          }
        } );

        $confirm.overlay(
        {
            close:        "> .close, [href$='#close']"
        ,   mask:         theApp.settings.dialogMask
        ,   top:          theApp.settings.dialogSettings.top
        ,   fixed:        theApp.settings.dialogSettings.fixed
        ,   closeOnClick: theApp.settings.dialogSettings.closeOnClick
        ,   onClose:      function()
                          {
                              if ( $.isFunction( onCloseDialog ) )
                              {
                                  onCloseDialog();
                              }
                              onCloseDialog = null;
                          }
        } );

        // Disable default link behaviour
        //
        $( "#iqModalAlert [href$='#close'], #iqModalChoice [href$='#close']" ).click( function( e ){e.preventDefault();} );
    } );

    theApp.alert = function( params )
    {
        if ( !params ) { return; }

        $( "#iqModalAlert .heading" ).text( params[ "title"   ] || "Notice" );
        $( "#iqModalAlert .content" ).text( params[ "message" ] || "Something bad happened" );

        // Check if the overlay has been created
        //
        if ( $alert.data( "overlay" ) )
        {
            // Check if a modal is active
            // If so then que this dialog using the onCloseDialog support
            //
            if ( _isModalActive() )
            {
                onCloseDialog = function() { $alert.data( "overlay" ).load() };
                _closeModals();
            }
            else
            {
                $alert.data( "overlay" ).load();
            }
        }
        else
        {
            // Fallback to default alert dialog
            //
            alert( params[ "message" ] || "Something bad happened" );
        }
    };

    theApp.confirm = function( params )
    {
        if ( !params ) { return; }

        $( "#iqModalChoice .heading" ).text( params[ "title"   ] || "Please choose" );
        $( "#iqModalChoice .content" ).text( params[ "message" ] || "Are you sure?" );

        // Setup event handler for yes/no click
        //
        $( "#iqModalChoice [href$='#yes'], #iqModalChoice [href$='#no']" )
            .unbind( "click" )
            .bind( "click", function( e )
            {
                e.preventDefault();

                if ( $.isFunction( params[ "callback" ] ) )
                {
                    params.callback( $( this ).attr( "href" ).match( "#yes" ) ? true : false );
                }

                $( "#iqModalChoice [href$='#yes'], #iqModalChoice [href$='#no']" ).unbind( "click" );
                $confirm.data( "overlay" ).close();
            } );

        // Check if the overlay has been created
        //
        if ( $confirm.data( "overlay" ) )
        {
            if ( _isModalActive() )
            {
                onCloseDialog = function() { $confirm.data( "overlay" ).load() };
                _closeModals();
            }
            else
            {
                $confirm.data( "overlay" ).load();
            }
        }
        else
        {
            // Fallback to default confirm dialog
            //
            // Not usefull to call confirm without a callback
            //
            if ( $.isFunction( params[ "callback" ] ) )
            {
                params.callback( confirm( params[ "message" ] || "Are you sure?" ) );
            }
        }
    };

    function _isModalActive()
    {
        return $confirm.data( "overlay" ).isOpened() ||
               $alert.data(   "overlay" ).isOpened();
    }

    function _closeModals()
    {
        $confirm.data( "overlay" ).close();
        $alert.data(   "overlay" ).close();
    }
} )( jQuery, window, "barcom" );