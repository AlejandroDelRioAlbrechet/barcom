/**
 * @description Pluggable fragment loading support.
 * Uses i18n translation support if available.
 * You can load your custom fragments as follows:
 * <code><pre>$( ".innerContent"  ).loadFragment( "fragment" );</pre></code>
 *
 * Fragments should be placed in the fragments folder. They come in two variants:
 * <ul><li>Static (html only)</li>
 * <li>Normal (html and javascript)</li></ul>
 *
 * Filenames for the javascript and HTML file must match.
 * If the first DOM element in the fragment HTML has the 'noJS' class it will be a static fragment:
 * <code><pre>&lt;div class="myFragment noJS"&gt; ... &lt;div&gt;</pre></code>
 *
 * @namespace
 * @name fragments
 * @version 1.0
 * @author Alejandro Del Rio
 */
;(function( $, context, appName )
{
    // The fragment build number is used to flush content
    // In production settings this will be the bamboo build number
    //
    var buildNr   = /* @@build-nr-start@@*/ new Date().getTime()/* @@build-nr-end@@*/
    ,   fragments = { build: buildNr, loadedFragments: {} }
    ,   theApp    = $.getAndCreateContext( appName, context )
    ;

    theApp.fragments = fragments;

    /**
     * Calls the update function for a loaded fragment
     *
     * @param name      (string)    The name of the fragment that will be updated
     * @param options   (struct)    Any options that need to be passed along to the fragment
     */
    fragments.update = function( name, options )
    {
        if ( fragments.loadedFragments[ name ] )
        {
            fragments.loadedFragments[ name ].update( options );
        }
    };

    /**
     * Calls the navigate function for a loaded fragment
     *
     * @param name      (string)    The name of the fragment that will be navigated
     * @param options   (struct)    Any options that need to be passed along to the fragment
     */
    fragments.navigate = function( name, options )
    {
        if ( fragments.loadedFragments[ name ] )
        {
            fragments.loadedFragments[ name ].navigate( options );
        }
    };

    /**
     * Registers a fragment
     *
     * @param name      (string)    The name of the fragment that will be updated
     * @param fragment  (object)    A reference to the fragment object containing the init() and update(...) methods
     */
    fragments.registerFragment = function( name, fragment )
    {
        if ( !fragments.loadedFragments[ name ] )
        {
            fragments.loadedFragments[ name ] = fragment;
        }
    };

    /**
     * jQuery function to load a fragment into the selected object(s).
     * Can be called as any other jQuery method:
     * <code>$( ".myElement" ).loadFrament( "myFragment", { foo: "bar" } );</code>
     *
     * Fragments come with or without a javascript file.
     * If the first HTML element of the fragment has a ".noJS" class then no javascript file will be loaded.
     *
     * @param name      (string)    The name of the fragment that will be loaded
     * @param params    (struct)    Any options that need to be passed along to the fragment
     * @param callback  (function)  Function that is called when fragment is loaded. Returns the dom element that was originally selected to recieve the fragment as it's first parameter
     *
     * @memberOf fragments
     */
    $.fn.loadFragment = function( name, params, success, error )
    {
        $( this ).each( function( index, item )
        {
            // Store the fragment context so multi-instance fragments
            // can use it to update the right DOM element
            //
            var $item   = $( item )
            ,   options = $.extend( { context: $item.context }, ( params || {} ) );

            // Load the fragment HTML
            //
            $item.load( "fragments/" + name + ".html?__b=" + fragments.build, null, function( response, status, xhr )
            {
                if ( "error" === status )
                {
                    $item.triggerHandler( "fragmentError" );

                    if ( $.isFunction( error ) )
                    {
                        error( $item );
                    }
                }
                else
                {
                    // Check if the fragment needs to load javascript
                    //
                    if ( 0 === $item.find( " > .noJS" ).length )
                    {
                        // Check if the fragment script is already loaded
                        //
                        if ( undefined !== fragments.loadedFragments[ name ] )
                        {
                            fragments.update( name, options );
                            if ( $.isFunction( success ) )
                            {
                                success( $item );
                                $item.triggerHandler( "fragmentLoaded" );
                            }
                        }
                        else
                        {
                            $.ajax(
                            {
                                async:      false
                            ,   dataType:   "script"
                            ,   type:       "GET"
                            ,   url:        "fragments/" + name + ".js?__b=" + fragments.build
                            ,   data:       null
                            ,   success:    function( data, status, xhr )
                                            {
                                                fragments.update( name, options );

                                                if ( $.isFunction( success ) )
                                                {
                                                    success( $item );
                                                    $item.triggerHandler( "fragmentLoaded" );
                                                }
                                            }
                            } );
                        }

                        // Translate fragment content if translate support is available
                        //
                        if ( theApp.i18n &&
                             theApp.i18n.translate &&
                             $.isFunction( theApp.i18n.translate ) )
                        {
                            theApp.i18n.translate( $item );
                        }
                    }
                    else
                    {
                        if ( $.isFunction( success ) )
                        {
                            success( $item );
                            $item.triggerHandler( "fragmentLoaded" );
                        }
                    }
                }
            } );
        } );

        return this;
    };
} )( jQuery, window, "barcom" );