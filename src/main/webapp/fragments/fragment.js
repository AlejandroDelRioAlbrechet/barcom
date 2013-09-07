/**
 * <p>EXAMPLE: This is an example fragment for the jQuery sandbox.
 * It registers itself and it's location aware so it can be used multiple times on the same page.</p>
 *
 * @namespace
 * @name fragment
 * @version 1.0
 * @author mdoeswijk
 */
;( function( $, context, appName )
{
    var initialized  = false;
    var fragmentName = "fragment"; // **TODO** Change this to your fragment name
    var fragment     = {};
    var snippets     = {};
    var options      = {};

    /**
     * Fragment initialization function used for everything that only needs to be done once.
     * Once a fragment has been initialized this function will immediatly stop executing.
     */
    fragment.init = function()
    {
        if ( true === initialized ) { return; }

        // Setup history support. We will only handle the module
        // specific states we know about
        //
        $( window ).bind( "hashchange", function( e )
        {
            // Only intervene if the module is active
            // Be aware that multi-instance fragments and history might clash
            //
            if ( $( ".innerContent > .myFragment" ).length > 0 )
            {
                var state  = $.bbq.getState( "fragment" );
                fragment.navigate( state );
            }
        } );

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
     * @param state (string)    The new fragment state
     *
     * @return (boolean) Indicates the requested fragment state has been activated
     */
    fragment.navigate = function( state )
    {
        var success = true;

        switch ( state )
        {
            case "myState":
                // Handle whatever checks need to be done before changing the fragment state.
                // If this fragment is a wizard you could link the state to the current wizard page for example
                //
                success = true;
            break;
        }

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

        // Initial hash/history update
        //
        $( window ).trigger( "hashchange" );

        // Remember to remove snippets from the freshly (re)loaded fragment HTML as needed
        //
        $( ".snippet", options.context ).remove();

        // Do your updates/populates here
        //
        var newItem = snippets.exampleSnippet.clone();
        newItem.text( "I am a snippet in " + $( options.context ).attr( "className" ) );
        $( ".myFragment", options.context ).append( newItem );

        // Set the fragment history state
        //
        $.bbq.pushState( { fragment: "ready" } );
    };

    // Private methods
    //

    // Expose the fragment (html and js names must match)
    //
    context[ appName ].fragments.registerFragment( fragmentName, fragment );
} ( jQuery, window, "barcom" ) );