/**
 * @description <p>A collection of reusable utility functions. Exposed on the application context as 'utils'.</p>
 *
 * @namespace
 * @name utils
 * @version 1.0
 * @author Alejandro Del Rio
 */
;( function( $, context, appName )
{
    var theApp   = $.getAndCreateContext( appName, context )
    ,   utils    = {}
    ;

    theApp.utils = utils;

    /**
    * Retrieves a single GET parameters for the document URL
    *
    * @param key The name of the parameter that is to be retrieved
    *
    * @return The value of the parameter or undefined if not found
    */
    utils.getQueryParameter = function( key )
    {
        var baseURL = decodeURI( document.location.href.replace( /\+/g, "%20" ) ).split( "#" )[ 0 ];
        var parts   = baseURL.split( "?" );
        if ( parts.length > 1 )
        {
            var params = parts[ 1 ].split( "&" );
            for( var i = 0; i < params.length; i++ )
            {
                var param = params[ i ].split( "=" );
                if ( key === param[ 0 ] )
                {
                    return decodeURIComponent( param[ 1 ] );
                }
            }
        }
        return undefined;
    };

   /**
    * Retrieves all GET parameters for the document URL
    *
    * @return A dictionary containing all the query parameters as key/value pairs
    */
    utils.getUrlParameters = function()
    {
        var baseURL = decodeURI( document.location.href.replace( /\+/g, "%20" ) ).split( "#" )[ 0 ];
        var vars = [], hash;
        var hashes = baseURL.slice( baseURL.indexOf( '?' ) + 1 ).split( "&" );
        for ( var i = 0; i < hashes.length; i++ )
        {
            hash = hashes[ i ].split( "=" );
            vars.push( hash[ 0 ] );
            vars[ hash[ 0 ] ] = decodeURIComponent( hash[ 1 ] );
        }
        return vars;
    };

   /**
    * Adds an iframe to document body and provides a cross-browser solution to
    * signal loading has completed
    *
    * Inspired by: http://www.nczonline.net/blog/2009/09/15/iframes-onload-and-documentdomain/
    *
    * @param params                   (object)    Parameter object for the function call
    * @param params.successHandler    (function)  Callback function when the call is succesful. The iframe is returned as a parameter
    * @param params.errorHandler      (function)  Callback function when the call fails
    * @param params.timeout           (integer)   The amount of time to wait for the iframe content to load
    * @param params.hidden            (boolean)   Set to show or hide the iframe. Default is 'false'
    * @param params.unique            (boolean)   Indicates if the iframe should be unique. Identification is based on className
    * @param params.className         (string)    The css class to assign to the iframe. Space separated if you want to add more then one
    * @param params.src               (string)    The iframe url to load
    */
    utils.loadIFrame = function( params )
    {
        var options = $.extend(
        {
            successHandler: function(){},
            errorHandler:   function(){},
            timeout:        10000,
            hidden:         true,
            unique:         false,
            className:      ""
        }, params );

        // Wait 10s before giving up retrieval of the iframe content
        //
        var timeoutActive = true;
        var timeout = setTimeout( function()
        {
            timeoutActive = false;
            options.errorHandler();
        }, options.timeout );

        if ( options.unique && options.className && $( "." + options.className ).length )
        {
            $( "." + options.className ).remove();
        }

        var iframe = document.createElement( "iframe" );
        iframe.src = options.src;
        iframe.className = options.className;

        if ( iframe.attachEvent )
        {
            iframe.attachEvent( "onload", function()
            {
                // Timeout already raised, ignore this
                //
                if ( false === timeoutActive )
                {
                    return;
                }

                clearTimeout( timeout );
                timeoutActive = false;
                options.successHandler( iframe );
            } );
        }
        else
        {
            iframe.onload = function()
            {
                // Timeout already raised, ignore this
                //
                if ( false === timeoutActive )
                {
                    return;
                }

                clearTimeout( timeout );
                timeoutActive = false;
                options.successHandler( iframe );
            };
        }
        document.body.appendChild( iframe );
        if ( options.hidden ) {$( iframe ).hide();}
    }

   /**
    * Parses an XML string and returns an XML Document objects
    * Used when doing ajax calls in text format for XML preprocessing like namespace removal
    *
    * @param xml The XML string
    *
    * @return An XML document object
    */
    utils.parseXML = function( xml )
    {
        if ( window.ActiveXObject && window.GetObject )
        {
            var dom = new ActiveXObject( 'Microsoft.XMLDOM' );
            dom.loadXML( xml );
            return dom;
        }

        if ( window.DOMParser )
        {
            return new DOMParser().parseFromString( xml, "text/xml" );
        }

        throw new Error( "No XML parser available" );
    };

    /**
     * Removes XML namespaces while preserving CDATA sections
     *
     * @param data The XML string
     *
     * @return An XML string with the namespaces removed
     */
    utils.cleanXML = function ( data )
    {
        if ( !data )
        {
            return "";
        }

        // Find all CDATA blocks and replace them with placeholders
        // so they don't get touched during the cleanup
        //
        // [\s\S] is used since there is no way to have . (dot) in javascript match newlines
        //
        var i;
        var cdata = data.match( /<!\[CDATA\[[\s\S]*?\]\]>/mg );

        if ( cdata )
        {
            for ( i = 0; i < cdata.length; i++ )
            {
              data = data.split( cdata[ i ] ).join( "__REPLACED_CDATA_"+ i +"__" );
            }
        }

        // Find all tags
        //
        var tags = data.match( /<[^?!][\s\S]*?>/mg );

        // Iterate over the found tags and replace them with the namespace-stripped version
        //
        for ( i = 0; i < tags.length; i++ )
        {
            data = data.split( tags[ i ] ).join( stripNS( tags[ i ] ));
        }

        // Put back the saved CDATA blocks
        //
        if ( cdata )
        {
            for ( i = 0; i < cdata.length; i++ )
            {
                data = data.split( "__REPLACED_CDATA_"+ i +"__" ).join( cdata[ i ] );
            }
        }

        return data;
    };

   /**
    * Private function used by stripNS to clean a single XML tag from namespace information
    *
    * @param tag A piece of an XML string containg one tag
    *
    * @return An XML string with the namespace removed
    */
    function stripNS( tag )
    {
        // Strip all namespace declarations
        // (also strip default namespace, otherwise Firefox adds a0: to tags)
        //
        tag = tag.replace( / xmlns(:\w+)?=(['"]).*?\2/g, "" );

        // Strip all namespace prefixes from tags
        //
        tag = tag.replace( /(<\/?)\w+?:/, "$1" );

        // Strip all namespace prefixes from attributes
        //
        tag = tag.replace( / \w+?:(\w+=(['"]).*?\2[ \/>])/, " $1" );

        return tag;
    }

   /**
    * Removes namespaces from keys and removes namespace declerations completely
    *
    * @param data javascript object
    *
    * @return The javascript object, but all fresh and uncluttered
    */
    utils.cleanJSON = function( data )
    {
        return stripNSJSON( undefined, data );
    }

   /**
    * Private function which itterates deeply over a JSON object and will remove all
    * namespaces (and their declerations). This function will be used recursively.
    *
    * @param key    (string) the key of the object, can be undefined for specifying the root node
    * @param value  (object or scalar) the value identified by the key, this can be an object, meaning it will have more 'children' or a scalar meaning it is a leaf (end)
    *
    * @return input object, but then removed from it's namespace clutter
    */
    function stripNSJSON( key, value )
    {
        // Inner private function for doing cleanups of the key itself
        //
        var cleanupKey = function( key )
        {
            if ( typeof key !== "undefined" )
            {
                var pos = key.indexOf( ":", 0 );

                if ( pos !== -1 )
                {
                    var ns = key.substr( 0, pos );

                    // Is it a declaration?
                    //
                    if ( "xmlns" === ns )
                    {
                        return undefined;
                    }

                    key = key.substr( pos + 1 );
                }
            }

            return key;
        }

        if ( typeof key !== "undefined" )
        {
            key = cleanupKey( key );

            if ( typeof key === "undefined" )
            {
                return undefined;
            }
        }

        var result;

        // If it is an object itterate over all it's attributes and request a cleanup
        //
        if ( typeof value === "object" )
        {
            result = {};

            var anyValidKey = false;

            for ( var i in value )
            {
                if ( value.hasOwnProperty( i ))
                {
                    // Recurse!
                    //
                    var cleaned     = stripNSJSON( i, value[ i ] );
                    var cleanedKey  = cleanupKey( i );

                    if ( typeof cleaned !== "undefined" && typeof cleanedKey !== "undefined" )
                    {
                        result[ cleanedKey ] = cleaned;

                        anyValidKey = true;
                    }
                }
            }

            if ( !anyValidKey )
            {
                return undefined;
            }
        }
        else
        {
            result = value;
        }

        return result;
    }

   /**
    * Converts a date string to a date object with the chosen format. Default is 'dd-mm-yyyy'
    *
    * @param strDate (string) Date in string format
    * @param format  (string) The input date format
    *
    * @return (date) Date object for the input string
    */
    utils.stringToDate = function( strDate, format )
    {
    	var aDate  = new String( strDate ).split( "-" );
        var result = undefined;

        if ( 3 === aDate.length )
        {
        	// Date constructor takes year, month, day, hour, minutes, seconds, milliseconds
        	//
            switch ( format )
            {
                case "ymd":
                case "yyyy-mm-dd":
                    result = new Date( aDate[ 0 ], parseInt( aDate[ 1 ], 10 ) - 1, aDate[ 2 ], 0, 0, 0, 0 );
                break;

                case "ydm":
                case "yyyy-dd-mm":
                    result = new Date( aDate[ 0 ], parseInt( aDate[ 2 ], 10 ) - 1, aDate[ 1 ], 0, 0, 0, 0 );
                break;

                case "mdy":
                case "mm-dd-yyyy":
                    result = new Date( aDate[ 2 ], parseInt( aDate[ 0 ], 10 ) - 1, aDate[ 1 ], 0, 0, 0, 0 );
                break;

                case "dmy":
                case "dd-mm-yyyy":
                default:
                    result = new Date( aDate[ 2 ], parseInt( aDate[ 1 ], 10 ) - 1, aDate[ 0 ], 0, 0, 0, 0 );
                break;
            }
        }

    	return result;
    }

   /**
    * Converts a date object to a string with the chosen format. Default is 'dd-mm-yyyy'
    *
    * @param date   (date)   Date object that is to be stringified
    * @param format (string) The output date format
    *
    * @return (string) Date in chosen string format
    */
    utils.dateToString = function( date, format )
    {
        var result = undefined;

        if ( "object" === typeof date )
        {
            var day =      date.getDate();
            var month =    date.getMonth() + 1;
            var year =     date.getFullYear();
            var hours =    date.getHours();
            var minutes =  date.getMinutes();
            var seconds =  date.getSeconds();
            var millisec = date.getMilliseconds();

            if ( month < 10   ){ month =   "0" + month   }
            if ( day   < 10   ){ day   =   "0" + day     }
            if ( hours < 10   ){ hours =   "0" + hours   }
            if ( minutes < 10 ){ minutes = "0" + minutes }
            if ( seconds < 10 ){ seconds = "0" + seconds }

            switch ( format )
            {
                case "ymd":
                case "yyyy-mm-dd":
                    result = year + "-" + month + "-" + day;
                break;

                case "ydm":
                case "yyyy-dd-mm":
                    result = year + "-" + day + "-" + month;
                break;

                case "mdy":
                case "mm-dd-yyyy":
                    result = month + "-" + day + "-" + day;
                break;

                case "dmy":
                case "dd-mm-yyyy":
                
                case "":
                default:
                    result = day + "-" + month + "-" + year;
                break;
            }
        }

        return result;
    };

   /**
    * Validates an string for a correct date in yyyy-mm-dd or dd-mm-yyyy format
    *
    * @param strDate    (string) The 'path' to the required attribute. Example 'company.id'
    * @param ymd        (boolean) When true it's validated against yyyy-mm-dd, when false dd-mm-yyyy
    *
    * @return (boolean) Whether the string is a valid date or not
    */
    utils.isValidDateString = function( strDate, ymd )
    {
        // Input format is DD-MM-YYYY
        //
        var aSplit = strDate.split( "-" );
        var day   = parseInt( aSplit[ ymd ? 2 : 0 ], 10 );
        var month = parseInt( aSplit[ 1 ], 10           ) - 1; // Months are 0-11
        var year  = parseInt( aSplit[ ymd ? 0 : 2 ], 10 );

        var myDate = new Date( year, month, day, 0, 0 ,0 );

        // I'm using the JS date object to validate input.
        // If a day is bigger then 31 the date object will increment
        // the month. So if the year, month and day math input
        // the date can be accepted
        //
        return ( ( myDate.getFullYear() === year  ) &&
                 ( myDate.getMonth()    === month ) &&
                 ( myDate.getDate()     === day   ) );
    };

   /**
    * Retrieves on object attribute using a path
    *
    * @param path   (string) The 'path' to the required attribute. Example 'company.id'
    * @param object (object) The object to retrieve the value from
    *
    * @return Requested value or undefined
    */
    utils.getJSONValue = function( path, object )
    {
        var aPath = path.split( "." );
        var value = object;
        var key   = aPath.shift();

        while( value && key )
        {
            value = value[ key ];
            key   = aPath.shift();
        }
        value = ( 0 === aPath.length ) ? value : undefined;

        return value;
    };

   /**
    * Retrieves an application context and creates all the intermediate steps
    *
    * @param path    (string) The 'path' to the required attribute. Example 'company.apps.data.something'
    * @param context (object) The root object to retrieve the value from. Defaults to the window object
    *
    * @return Requested context object
    */
    utils.getContext = function( path, context )
    {
        if ( !context ) {context = window;}

        var aPath = path.split( "." );
        var value = context;
        var key   = aPath.shift();

        while( key )
        {
            if ( !value[ key ] )
            {
                value[ key ] = {};
            }
            value = value[ key ];

            key = aPath.shift();
        }

        return value;
    };

    /**
     *  Check for JSON capability and if lacking fetch it (async)
     */
    utils._checkJSON = function()
    {
        // When JSON is not defined retrieve it (SYNCHRONOUS!)
        //
        if ( !window[ "JSON" ] )
        {
            $.ajax(
            {
                async:          false
            ,   url:            'lib/json/json2.js'
            ,   dataType:       "script"
            });
        }
    }

    /**
     *  Wrapper function around JSON.stringify and the capability test + optionally retrieval of json2.js
     *
     *  @param obj  (object)    Object the should be converted into a JSON string
     */
    utils.jsonStringify = function( obj )
    {
        utils._checkJSON();

        return JSON.stringify( obj );
    }

    /**
     *  Wrapper function around JSON.parse and the capability test + optionally retrieval of json2.js
     *
     *  @param str (string)    String that should be converted into an object
     */
    utils.jsonParse = function( str )
    {
        utils._checkJSON();

        return JSON.parse( str );
    }

} )( jQuery, window, "barcom" );