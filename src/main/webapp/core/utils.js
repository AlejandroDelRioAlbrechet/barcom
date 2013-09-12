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