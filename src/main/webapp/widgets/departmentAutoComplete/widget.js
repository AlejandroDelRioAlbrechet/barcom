;( function( $, context, appName )
{
    var theApp = $.getAndCreateContext( appName, context );

    /*
     * @author Alejandro Del Rio
     */
    $.widget( "barcom.departmentAutoComplete",
    {
        options:
        {
            widgetClass:            "departmentAutoComplete"
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
            theApp.services.getAllDepartments(
            {
                successHandler: function( data )
                {
                    if ( data.response )
                    {
                        var departaments = data.response
                        var source =       [];

                        $.each( departaments, function( index, result )
                        {                         
                            source.push(
                            {
                                id: result.id
                            ,   name: result.name
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