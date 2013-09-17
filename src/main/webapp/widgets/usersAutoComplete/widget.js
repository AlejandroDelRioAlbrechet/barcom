;( function( $, context, appName )
{
    var theApp = $.getAndCreateContext( appName, context );

    /*
     * @author Alejandro Del Rio
     */
    $.widget( "barcom.usersAutoComplete",
    {
        options:
        {
            widgetClass:            "usersAutoComplete"
        ,   onSelect:               function() {}
        ,   onChange:               function() {}
        }

        /*  Creates an instance of the selectTeam widget
         *
         * @param params            (Object)    Widget construction parameters
         */
    ,   _create: function( params )
        {
            var widget  = this;
            var $item   = widget.element;

            widget.options = $.extend( widget.options, params );
            var options  = widget.options;

            $item.addClass( options.widgetClass );

            // Retrieve the list of competitions
            //
            theApp.services.getAllUsers(
            {
                successHandler: function( data )
                {
                    if ( data.response )
                    {
                        var users = data.response
                        var source =       [];

                        $.each( users, function( index, result )
                        {                    
                            source.push(
                            {
                                id: result.id
                            ,   name: result.firstName + " " + result.lastName
                            } );                          
                        } );

                        // Setup competitions  autocomplete
                        //
                        $item.typeahead(
                        {
                            // Retrieve the list from the (JSON) service getTeamNamesByBigram
                            //
                            source: source
                        ,   items : 8
                        ,   itemSelected : options.onSelect
                        } );
                    }
                }
            } );
                            }
    } );
} )( jQuery, window, "barcom" );