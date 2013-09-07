    /*
    Package: validators

    These are a number of custom validators that can be used with the jQuery validate plugin
*/
;(function( $ ) {
    /*
        Function: date

        Validates a string value as a date in the DD-MM-YYYY format
    */
    $.validator.addMethod( "date", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        // Input format is DD-MM-YYYY
        //
        var aSplit = value.split( "-" );
        var day   = parseInt( aSplit[ 0 ], 10 );
        var month = parseInt( aSplit[ 1 ], 10 ) - 1; // Months are 0-11
        var year  = parseInt( aSplit[ 2 ], 10 );

        var myDate = new Date( year, month, day, 0, 0 ,0 );

        // I'm using the JS date object to validate input.
        // If a day is bigger then 31 the date object will increment
        // the month. So if the year, month and day math input
        // the date can be accepted
        //
        return ( ( myDate.getFullYear() === year  ) &&
                 ( myDate.getMonth()    === month ) &&
                 ( myDate.getDate()     === day   ) );
    },
    "Please provide a valid date. Format is dd-mm-yyyy." );

    /*
        Function: 11proof

        Validates a numeric value to be 11 proof. Used primarily for bank accounts.
        The value needs to be 9 or 10 digits long and dividable by 11.
    */
    $.validator.addMethod( "11proof", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        // When 9 digits long it needs to be dividable by 11 (11-proof)
        //
        var valueLength = value.length;
        if ( ( 9 === valueLength ) || ( 10 === valueLength ) )
        {
            var total = 0;
            var i     = 0;

            if ( 0 == value.charAt( 0 ) )
            {
                for ( i = 0; i < value.length; i++ )
                {
                    total += parseInt( value.charAt( i ), 10 ) * ( i + 1 );
                }
            }
            else
            {
                for ( i = 0; i < value.length; i++ )
                {
                    total += parseInt( value.charAt( i ), 10 ) * ( valueLength  - i );
                }
            }

            if ( ( total % 11 !== 0 ) || ( total / 11 === 0 ) )
            {
                return false;
            }
        }

        return true;
    },
    "Failed 11-proof check" );

    /*
        Function: bankaccount

        Validates a numeric value to be a valid bank account number.
        A bank account needs to be between 3-7 or 9 digits long
    */
    $.validator.addMethod( "bankaccount", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        // Bank account has to be either between 3-7 numbers
        // or 9
        //
        return  !( !( value.length >= 3 && value.length < 8 ) && ( 9 != value.length ) && ( 10 != value.length ) );
    },
    "Bankaccount needs to be 3-7 or 9-10 digits." );

    /*
        Function: phonenumber

        Simple phone number check. Must begin with a 0, contain only digits and is 10 digits long
    */
    $.validator.addMethod( "phonenumber", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        return ( '0' === value.charAt( 0 ) ) && ( 10 === value.length ) &&  /^\d*$/.test( value );
    },
    "Invalid phone number" );

    /*
        Function: phonedutch

        Validates a dutch phone number.
        Without country codes a phone number is 10 digits
        A phone number has to begin with a 0
        The dutch country code is 0031

        Regular expression to evaluate dutch-style phone numbers.
        Possible example prefixes: +31, +31(0), (+31)(0), 0, 0031 followed by 9 numbers (which can contain a space or -).
    */
    $.validator.addMethod( "phonedutch", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        return /(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/.test( value );
    },
    "Invalid dutch phone number" );

    /*
        Function: postcode

        Validates a string value to be a dutch postal code.
        Only checks the format to be 4 digits and 2 characters not if the postalcode exists or not
    */
    $.validator.addMethod( "postcode", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        // Postcode must be 4 digits and 2 letters (case insensitive, optionally seperated by a space)
        //
        return /^([0-9]{4}\s?[a-zA-Z]{2})?$/.test( value );
    },
    "Please provide a valid postcode. Format is 1234AB" );

    /*
       eancode

       Checks if a provided value is a valid EAN-18

       http://www.morovia.com/education/utility/upc-ean.asp
     */
    $.validator.addMethod( "eancode", function( value, element )
    {
        if ( this.optional( element ) ) { return true; }

        if ( value === "" )
        {
            return true;
        }

        var sValue = new String( value );

        if ( sValue.length != 18 )
        {
            return false;
        }

        // The last digit is the control digit
        //
        var checkDigit = parseInt( sValue.charAt( 17 ), 10 );

        var total = 0;

        // Iterate over all digits, add them together and multiply the odd positions with 3
        //
        for ( var i = 0; i < 17; i++ )
        {
            var digit = parseInt( sValue.charAt( i ), 10 );

            total += i % 2 ? digit : digit * 3;
        }

        // If the total + the check digit is dividable by 10 it's a valid ean
        //
        return (( total + checkDigit ) % 10 === 0 );
    },
    "Invalid EAN code" );

    /*
        Function: notPobox

        This validator is placed on street name entry to check
        it does not equal 'postbus'
    */
    $.validator.addMethod( "notPobox", function( value, element, param )
    {
        // Check if dependency is met
        //
        if ( !this.depend( param, element ) )
        {
            return "dependency-mismatch";
        }

        return this.optional( element ) || ( value.toLowerCase() !== "postbus" );
    },
    "Provided address is a POBox" );

    /*
        Function: attributeEquals

        Does a generic comparison of a provided attribute and value
    */
    $.validator.addMethod( "attributeEquals", function( value, element, param )
    {
        var $element  = $( element );
        var attrValue = $element.attr( param.attribute );

        if ( "pending" === attrValue )
        {
            // Pending state is used for async callback validations
            //
            return attrValue;
        }

        return this.optional( element ) || ( param.value === attrValue );
    },
    "Attribute value does not match" );

    /*
       housenumbers exist of only digits, at least one non-zero number
     */
    $.validator.addMethod( "housenumber", function( value, element )
    {
        return this.optional( element ) || ( /^[0-9]+$/.test( value ) && /[1-9]/.test( value ) );
    },
    "Invalid housenumber" );

    /*
       Essent username validation (invalid characters)
     */
    $.validator.addMethod( "username", function( value, element )
    {
        return this.optional( element ) || /^[a-zA-Z0-9._@-]*$/.test( value );
    },
    "Invalid username" );

    /*
        Function: valueEquals

        Does a generic comparison of a provided value and the element value
    */
    $.validator.addMethod( "valueEquals", function( value, element, param )
    {
        if ( "pending" === value )
        {
            // Pending state is used for async callback validations
            //
            return value;
        }

        return this.optional( element ) || ( param.value === value );
    },
    "Element value does not match" );
} )( jQuery );