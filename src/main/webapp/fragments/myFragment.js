/**
 * <p>EXAMPLE: This is an example fragment for the jQuery sandbox.
 * It registers itself and it's location aware so it can be used multiple times on the same page.</p>
 *
 * @namespace
 * @name myFragment
 * @version 1.0
 * @author mdoeswijk
 */
;( function( $, context, appName )
{
    var initialized  = false
    ,   fragmentName = "myFragment" // **TODO** Change this to your fragment name
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

        // We're using a custom url fragment called 'step' for sub-navigation
        // This can be anything you want depending on your application needs
        //
        // And you know about the radix 10 with parseInt, right? ;)
        //
        ,   stepNr      = parseInt( $.bbq.getState( "step" ), 10 ) || 1
        ,   $myWizard   = $context.find( ".myWizard" )
        ;

        if ( 0 == $myWizard.length )
        {
            success = false;
        }
        else
        {
            switch ( stepNr )
            {
                case 1:
                case 2:
                case 3:
                    // iqWizard step numbers are 0-based
                    //
                    $myWizard.iqWizard( "changePage", ( stepNr - 1 ) )
                break;

                default:
                    success = false;
                break;
            }
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

        var $context        = $( options.context )
        ,   $myWizard       = $context.find( ".myWizard" )
        ,   $myForm         = $context.find( "form[name='myForm']" )
        ,   $btnPrevious    = $context.find( ".buttons a[href$='#previous']" )
        ,   $btnNext        = $context.find( ".buttons a[href$='#next']" )
        ;

        // Show where this fragment has been loaded
        //
        $context.find( ".myContext" ).text( $context.attr( "className" ) );

        // Create the iqWizard instance
        //
        $myWizard.iqWizard();

        // Setup the wizard next/previous button handling
        //
        $btnPrevious.click( function( e )
        {
            e.preventDefault();

            $myWizard.iqWizard( "previous" );

            // Push the new step number on the navigation stack
            //
            $.bbq.pushState( { "step": $myWizard.iqWizard( "getCurrentPage" ) + 1 } );
        } );

        $btnNext.click( function( e )
        {
            e.preventDefault();

            switch( $myWizard.iqWizard( "getCurrentPage" ) )
            {
                case 1:
                    if ( $myForm.valid() )
                    {
                        $myWizard.iqWizard( "next" );

                        // Push the new step number on the navigation stack
                        //
                        $.bbq.pushState( { "step": $myWizard.iqWizard( "getCurrentPage" ) + 1 } );
                    }
                break;

                default:
                    $myWizard.iqWizard( "next" );

                    // Push the new step number on the navigation stack
                    //
                        $.bbq.pushState( { "step": $myWizard.iqWizard( "getCurrentPage" ) + 1 } );
                break;
            }
        } );

        // Disble default form submit
        //
        $myForm.submit( function() { return false; } );

        // Setup form validation
        //
        $myForm.validate(
        {
            invalidHandler: function( form, validator )
            {
                if ( validator.errorList.length > 0 )
                {
                    var $firstError = $( validator.errorList[ 0 ].element );
                    var offset      = $firstError.offset();

                    // Scroll to the first invalid entry
                    //
                    $( "html, body" ).animate( { scrollTop: offset.top - 10 }, 500 );
                }
            }

         ,  rules:
            {
                requiredValue:
                {
                    required: true
                },
                numberValue:
                {
                    required: true,
                    digits:   true
                },
                postalcode:
                {
                    required: true,
                    postcode: true  // Custom validator method added in core/validators.js
                }
            }

        ,   messages:
            {
                requiredValue:
                {
                    required: "This text field is required"
                },
                numberValue:
                {
                    required: "This number field is required",
                    digits:   "This field has to be a number"
                },
                postalcode:
                {
                    postcode: "This field has to be a valid dutch postalcode without spaces. Example: 1234AA."
                }
            }

        ,   submitHandler: function( form )
            {
                return false;
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