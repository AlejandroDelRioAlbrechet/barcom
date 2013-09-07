/**
 * @description The application controller manages the application state and all user interaction.
 *
 * The application settings can be provided through the .settings member of your application context.
 * You could do this in the &lt;head&gt; section of your wrapper page like so:
 *
 * <code><pre>
 * &lt;script type="text/javascript"&gt;
 *     window.barcom || ( window.barcom = {} );
 *     window.barcom.settings = {
 *         foo:              "bar"
 *     };
 * &lt;/script&gt;
 * </pre></code>
 *
 * @namespace
 * @name controller
 * @version 1.0
 * @author mdoeswijk
 */
;( function( $, context, appName )
{
    var theApp          = $.getAndCreateContext( appName, context )
    ,   controller      = {}
    ;

    theApp.controller   = controller;

    // Extend the settings with any defaults you might have
    //
    theApp.settings     = $.extend(  {
                            language:   "ua"
                        },  ( theApp.settings || {} ) );

    $( document ).ready( function()
    {
        
    } );

    $( window ).bind( "hashchange", function( e )
    {
        theApp.log( "[hashchange]", document.location.href );

        // As an example I'm using a URL that would look like this:
        // #main=welcome
        //
        // The easiest way is to just put the fragment name you want to load
        // in the main variable. If you need to translate a simple
        // switch/case will sort you out
        //
        var main = $.bbq.getState( "main" );

        switch( main )
        {
            case "example":
                controller._loadContent( ".innerContent", "myFragment" );
            break;

            case "static": // Fall-through
            default:
                controller._loadContent( ".innerContent", "htmlonly" );
            break;
        }
    } );

    // A handy function for creating unique application id's
    //
    controller._generateId = function()
    {
        return appName + new Date().getTime() + "X" + Math.floor( Math.random() * 10000000 );
    }

    // Private functions
    //
    controller._loadContent = function( target, fragmentName, params, success, error )
    {
        // This would be an ideal place to do your loadFragment(...) calls.
        // Afterwards you might want to do any re-usable content setup like
        // adding special CSS classes, adding tooltips, applying polyfills
        // and so on.
        //
        // Also when the requested fragment is already loaded you will want
        // to call the fragment.navigate(..) function for state changes
        // within a fragment
        //
        var $target = $( target );

        // As a convention each fragment sets a class on it root element
        // that is the same as the fragment name. Using this we can detect
        // if the fragment has been loaded in the target html element
        //
        if ( $target.children().first().hasClass( fragmentName ) )
        {
            // The fragment navigate call return true of false depening on
            // if the navigation was succesfull
            //
            if( theApp.fragments.navigate( fragmentName, params ) )
            {
                if ( $.isFunction( success ) )
                {
                    success( $target.find( "." + fragmentName ) );
                }
            }
            else
            {
                if ( $.isFunction( error ) )
                {
                    error( $target.find( "." + fragmentName ) );
                }
            }
        }
        else
        {
            $target.loadFragment( fragmentName, params, function( $html )
            {
                controller._setupContent( $html );

                if ( $.isFunction( success ) )
                {
                    success( $html );
                }
            },
            function( $html )
            {
                if ( $.isFunction( error ) )
                {
                    error( $html );
                }
            } );
        }
    }

    // Reuasble operations performed on newly loaded content
    //
    controller._setupContent = function( context )
    {
        var $context = $( context );

        // Set appriopriate CSS class on inputs based on their type
        //
        $context.find( "input" ).each( function( index, input )
        {
            var $input    = $( input );
            var inputType = $input.attr( "type" )
            $input.addClass( "input-" + inputType );

            switch ( inputType )
            {
                case "radio":
                case "checkbox":
                    // Setup label clicking by adding id's on the labels
                    // We're assuming the next label relates to this input
                    //
                    var $label = $input.next( "label" );

                    if ( $label.length > 0 )
                    {
                        // If the input already has an id use that
                        //
                        var id = $input.attr( "id" );
                        if ( id )
                        {
                            $label.attr( "for", id );
                        }
                        else
                        {
                            id = controller._generateId();

                            $input.attr( "id",  id );
                            $label.attr( "for", id );
                        }
                    }
                break;
            }
        } );

        // Set autofocus if defined (detect html5 autofocus support)
        //
        if ( !( "autofocus" in document.createElement( "input" ) ) )
        {
            // The :first selector does not work here!
            //
            $context.find( "[autofocus]" ).first().focus();
        }
    }
} )( jQuery, window, "barcom" );