/**
* Adds required markers to form fields (based on jquery.validate plugin).
* The markers are inserted with
*
* @param validator    (object) The form validator object
* @param marker       (string) The marker to add to the form label. Defaults to '*'.
* @param markerClass  (string) The CSS class set on the marker span. Defaults to 'marker'.
*
* @return None
*/
( function( $ ) {
    $.addRequiredMarkers = function( validator, marker, markerClass )
    {
        // Default required marker
        //
        marker = marker || "*";

        // Default marker class
        //
        markerClass = markerClass || "marker";

        if ( validator && validator[ "currentForm" ] )
        {
            var $myForm = $( validator.currentForm );

            for ( var key in validator.settings.rules )
            {
                var rule = validator.settings.rules[ key ];

                // Required is either:
                // *) a boolean
                // *) a jQuery object
                // *) a function
                //
                if ( true === rule.required ||
                     ( rule[ "required" ] && rule.required[ "length" ] > 0 ) ||
                     ( $.isFunction( rule.required ) && rule.required() ) )
                {
                    $myForm.find( "[for='" + key + "']" ).each( function( index, item )
                    {
                        var $label = $( item );
                        $label.find( "." + markerClass ).remove();

                        $label.append( "<span class='" + markerClass + "'>" + marker + "</span>" );
                    } );
                }
                else if ( $.isFunction( rule.required ) )
                {
                    $myForm.find( "[for='" + key + "']" ).each( function( index, item )
                    {
                        var $label = $( item );
                        $label.find( "." + markerClass ).remove();
                    } );
                }
            }
        }
    };
} )( jQuery );