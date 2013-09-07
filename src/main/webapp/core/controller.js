/**
 * @description The application controller manages the application state and all user interaction.
 *
 * The application settings can be provided through the .settings member of your application context.
 * You could do this in the &lt;head&gt; section of your wrapper page like so:
 *
 * <code><pre>
 * &lt;script type="text/javascript"&gt;
 *     window.myAppName || ( window.myAppName = {} );
 *     window.myAppName.settings = {
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
                            language:   "en"
                        },  ( theApp.settings || {} ) );

    $( document ).ready( function()
    {
        // Intialize the services by loading their message templates
        // If your application does not need XML message templates or your
        // service calls are organised in a different fashion then just remove
        // the whole initialisation call
        //
        theApp.services.initialize(
        {
            successHandler: function()
            {
                // Startup language selection (based on settings)
                // If your application does not require multi-language support
                // you can remove the catalog folder, the core/i18n.js file and
                // include statement along with this piece of code
                //
                if ( theApp.settings.language )
                {
                    theApp.i18n.switchLanguage( theApp.settings.language );
                }

                // Start the application by triggering the initial hash change event
                //
                $( window ).triggerHandler( "hashchange" );
            },

            errorHandler: function()
            {
                alert( "Failed to initialize the application" );
            }
        } );
    } );

    // Setup navigation and back button support using the excellent BBQ
    // library
    //
    // Our navigation approach is comprised of 2 pieces of code:
    // * link handling delegate
    // * hashchange event handler
    //
    $( document ).delegate( "a", "click", function( e )
    {
        var $link = $( this )
        ,   href, urlParams;

        // Old-skool removal of the dotted focus bracket around links in IE
        //
        $link.blur();

        // If a hyperlink has a class disabled it will not be clickable
        //
        if ( $link.hasClass( "disabled" ) )
        {
            return false;
        }

        // External links need to behave as normal
        // External means not part of this web application so they could
        // still link to pages inside our domain
        //
        if ( "external" === $link.attr( "rel" ) )
        {
            return true;
        }

        // All internal links are handled by hashchange event handler
        // Only a small number of special links are handled here
        //
        href = $link.attr( "href" );
        if ( !href )
        {
            return false;
        }
        else
        {
            // Keep in mind IE will return the full link in the attr() call
            // so strip of everything before the #
            //
            href = href.split( "#" )[ 1 ] || ""
        }

        theApp.log( "[link delegate handler]", href );

        // Below we will handle special href's that are not part of the
        // normal navigation structure. So special href like '#logout' or
        // maybe '#next' and 'previous'. Opening modal dialogs can also be
        // something you don't want to be added to your navigation stack.
        // So these are links you don't want to trigger an url change.
        //
        switch( href )
        {
            case "logout":
                // Perform your logout here
                //
                return false;
            break;

            case "close":
            case "more":
            case "next":
            case "previous":
            case "yes":
            case "no":
                // These are href's we tend to use for standard buttons
                // and functions so they are excluded from triggering
                // url changes
                //
                return false;
            break;
        }
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
} )( jQuery, window, "myAppName" );