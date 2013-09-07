/**
 * The collection of backend service functions.
 *
 * <p>XML can be cleaned and parsed here before it is sent to the cache
 * Set the datatype to 'text' if you want to do this</p>
 *
 * @see utils.cleanXML
 *
 * @namespace
 * @name services
 * @version 1.0
 * @author mdoeswijk
 */
;( function( $, context, appName )
{
    var theApp          = $.getAndCreateContext( appName, context )
    ,   services        = {}

    // Message templates
    //
    ,   $messages
    ;

    theApp.services     = services;

    /**
     * Required initialization call for the services to function.
     * Loads the messages.xml file from the fragments folder.
     * This file contains the call templates for all the other service calls
     *
     * @param params               (object)    Parameter object for the service call
     * @param params.successHandler (function)  Callback function when the call is succesful
     * @param params.errorHandler   (function)  Callback function when the call fails
     */
    services.initialize = function( params )
    {
        var options = $.extend(
        {
            successHandler: function(){},
            errorHandler:   function(){}
        }, params );

        // Load the XML message templates
        //
        $.ajax(
        {
            url: "fragments/messages.xml",
            success: function( data, status, xhr )
            {
                $messages = $( data );
                options.successHandler( { request: null, response: data, xhr: xhr } );
            },
            error: function( xhr, status, error )
            {
                options.errorHandler( { request: null, response: ( error ? error.message: status ), xhr: xhr } );
            },
            dataType: "xml"
        } );
    };

    /**
     * EXAMPLE: This function could be used to login an application user
     *
     * @param params                  (object)    Parameter object for the service call
     * @param params.successHandler    (function)  Callback function when the call is succesful
     * @param params.errorHandler      (function)  Callback function when the call fails
     * @param params.username          (string)    The user's login name
     * @param params.password          (string)    The user's password
     */
    services.login = function( params )
    {
        var options = $.extend(
        {
            successHandler: function(){},
            errorHandler:   function(){},
            username:       "",
            password:       ""
        }, params );

        // Example service call using the XML messages
        //
        var $xmlData = $messages.find( "authenticateUser" ).clone();
        $xmlData.find( "username" ).text( options.username );
        $xmlData.find( "password" ).text( options.password );

        $.ajax(
        {
            type:   "POST",
            url:    "/my/api/generic/xml/authenticateUser",
            data:   $xmlData.toXML(),
            success: function( data, status, xhr )
            {
                // If your backend returns XML with namespaces you can set dataType
                // to 'text' instead and use the utils to clean the XML
                //
                // theApp.utils.parseXML( theApp.utils.cleanXML( data ) )
                //
                options.successHandler( { request: $xmlData, response: data, xhr: xhr } );
            },
            error: function( xhr, status, error )
            {
                options.errorHandler( { request: $xmlData, response: ( error ? error.message: status ), xhr: xhr } );
            },
            contentType: "text/xml",
            dataType:    "xml"
        } );
    };
})( jQuery, window, "myAppName" );