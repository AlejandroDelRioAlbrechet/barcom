/**
 * @description Pluggable analytics support.
 *
 * The application settings can be provided through the .settings member of your application context.
 * You could do this in the &lt;head&gt; section of your wrapper page like so:
 *
 * <code><pre>
 * &lt;script type="text/javascript"&gt;
 *     window.barcom || ( window.barcom = {} );
 *     window.barcom.settings = {
 *         analyticsAccount: "ABC123XYZ",
 *         analyticsBaseURL: "/barcom/",
 *         analyticsDomain: ".cessniq.com",
 *         foo:              "bar"
 *     };
 * &lt;/script&gt;
 * </pre></code>
 *
 * Below are the settings that are related to analytics support.
 * Currently HBX and Google Analytics are supported.
 * Please note that you will need to configure the location of your hbx.js file before Hitbox support will function.
 *
 * If your developing and testing from localhost the GA tracker will not send any actual hits to GA. Setting a localhost alias can get you around this protection against developer hits in your analytics
 *
 * <h2>Settings:</h2>
 * <dl>
 * <dt>pageSuccess</dt>         <dd>(boolean) Used for form abandonment tracking. As long as this setting is false a page unload will register as an abandon. Used for both GA and HBX.</dd>
 * <dt>abandonTracking</dt>     <dd>(boolean) Indicates if form abandon tracking should be performed. Defaults to 'false'.</dd>
 *
 * <dt>analyticsAccount</dt>    <dd>(string) The google analytics account to use. If provided the controller will automatically load the required javascript file to add GA support</dd>
 * <dt>analyticsBaseURL</dt>    <dd>(string) The base URL to use for Google Analytics tracking. Leave empty for the current page url.</dd>
 * <dt>analyticsAbort</dt>      <dd>(string) Category name for form abandonment event in Google Analytics. Default is 'abandon'.</dd>
 * <dt>analyticsError</dt>      <dd>(string) Category name for error event in Google Analytics. Default is 'error'.</dd>
 *
 * <dt>hbxSourceURL</dt>        <dd>(string) The URL to the hbx.js file for your environment. Defaults to 'lib/hbx.js'</dd>
 * <dt>hbxAccount</dt>          <dd>(string) The Hitbox account name to use.  If provided the controller will automatically load the required javascript file to add HBX support. It will also declare a number of global variables as required by HBX.</dd>
 * <dt>hbxPagename</dt>         <dd>(string) The default HBX pagename. Maps to the 'pn' variable
 * <dt>hbxBaseURL</dt>          <dd>(string) The base URL for HBX tracking. Used together with MLC and usually stored in the 'vcon' variable</dd>
 * <dt>hbxMLC</dt>              <dd>(string) The multi level content group value. Used together with BaseURL and usually stored in the 'vcon' variable</dd>
 * <dt>hbxAbort</dt>            <dd>(string) Category name for form abandonment event in HBX. Default is 'abandon'.</dd>
 * <dt>hbxNoFieldActive</dt>    <dd>(string) Value used in form abandonment for HBX when no field is active. Default is 'no field selected'.</dd>
 *
 * <dt>waTracking</dt>          <dd>(boolean) Enabled waTracking by setting this to true</dd>
 * <dt>scodeSourceURL</dt>      <dd>(string) Location of the external s_code.js library</dd>
 * <dt>waPagename</dt>          <dd>(string) Override the pagename</dd>
 * <dt>waUN</dt>                <dd>(string) Override the un (username)</dd>
 * </dl>
 *
 * @namespace
 * @name analytics
 * @version 1.0
 * @author mdoeswijk
 */
;(function( $, context, appName )
{
    var theApp      = $.getAndCreateContext( appName, context )
    ,   analytics   = {}
    ,   backlog     = [];
    ;

    theApp.analytics = analytics;

    // Add default analytics settings but don't override
    // existing values
    //
    theApp.settings = $.extend( { pageSuccess:      false,
                                  abandonTracking:  false,

                                  analyticsAccount: "",
                                  analyticsBaseURL: "",
                                  analyticsAbort:   "abandon",
                                  analyticsError:   "error",

                                  hbxSourceURL:     "lib/hbx.js",
                                  hbxAccount:       "",
                                  hbxPagename:      "",
                                  hbxBaseURL:       "",
                                  hbxMLC:           "",
                                  hbxAbort:         "abandon",
                                  hbxNoFieldActive: "no field selected",

                                  waTracking:       false,
                                  scodeSourceURL:   "lib/s_code.js",
                                  waPagename:       "",
                                  waUN:             ""

                                }, ( theApp.settings || {} ) );

    // Setup analytics support when the DOM is ready
    //
    $( document ).ready( function()
    {
        setupAnalytics();
    } );

    /**
     * Loads required scripts and sets up the needed event handlers for analytics tracking.
     */
    function setupAnalytics()
    {
        // Google analytics support
        //
        if ( "" !== theApp.settings.analyticsAccount )
        {
            var gaJsHost = ( ( "https:" === document.location.protocol ) ? "https://ssl." : "http://www." );

            backlog = [];

            $.ajax(
            {
                async:      false
            ,   type:       "GET"
            ,   url:        gaJsHost + "google-analytics.com/ga.js"
            ,   data:       null
            ,   dataType:   "script"
            ,   success:
                    function ()
                {
                    //  Even if async is false, trackPageEvent() and trackPageAbandon() may get called sooner than we are up and running.
                    //
                    //  So, to cope, any such page events are put in a backlog first, and then processed as soon as we get here.
                    //
                    analytics._gaTrackPageEvent =
                        function( event )
                    {
                        try
                        {
                            var pageTracker = _gat._getTracker( theApp.settings.analyticsAccount );
                            pageTracker._trackPageview( theApp.settings.analyticsBaseURL + event );
                        }
                        catch( err ) { }
                    };

                    analytics._gaTrackPageAbandon =
                        function( event, label, value )
                    {
                        try
                        {
                            var pageTracker = _gat._getTracker( theApp.settings.analyticsAccount );
                            pageTracker._trackEvent( theApp.settings.analyticsAbort, event, label, value );
                        }
                        catch( err ) { }
                    }

                    for( var i = backlog.length; i-- ; )
                    {
                        var log = backlog.shift();
                        analytics[ log.type ].apply( null, log.params );
                    }
                }
            } );
        }

        // HBX analytics support
        //
        if ( "" !== theApp.settings.hbxAccount )
        {
			window.hbx_acct  = theApp.settings.hbxAccount;
			window.hbx_pndef = "index";
			window.hbx_ctdef = "full";
			window.hbx_lt    = "none";
			window.hbx_pn    = theApp.settings.hbxPagename;
			window.hbx_mlc   = theApp.settings.hbxBaseURL + theApp.settings.hbxMLC;

            $.ajax(
            {
                async:      false
            ,   type:       "GET"
            ,   url:        theApp.settings.hbxSourceURL
            ,   data:       null
            ,   dataType:   "script"
            } );
        }

        // Retrieve the s_code file when SiteCatalyst tracking is enabled
        //
        if ( theApp.settings.waTracking )
        {
            $.ajax(
            {
                async:      false
            ,   type:       "GET"
            ,   url:        theApp.settings.scodeSourceURL
            ,   data:       null
            ,   dataType:   "script"
            } );

            // Set default pagename and username
            //
            if ( window[ "wa" ] )
            {
                if ( theApp.settings.waPagename )
                {
                    wa.pagename = theApp.settings.waPagename;
                }

                if ( theApp.settings.waUN )
                {
                    wa.un       = theApp.settings.waUN;
                }
            }
        }


        // Setup form abandonment tracking
        //
        if ( theApp.settings.abandonTracking &&
            ( ( "" !== theApp.settings.analyticsAccount ) ||
              ( "" !== theApp.settings.hbxAccount ) ) )
        {
            var lastField;

            $( "input, select, textarea" ).blur( function( event )
            {
                // The last blurred field will be tracked in the lastField variable
                // but only if its the first time we see the field
                //
                var $field = $( this );

                if ( false === $field.data( "abandonTracked" ) )
                {
                    $field.data( "abandonTracked", true );
                    lastField = $field;
                }

            } );

            $( window ).unload( function( event )
            {
                if ( false === theApp.settings.pageSuccess )
                {
                    var abandonField = ( lastField && lastField.attr( "name" ) ) || theApp.settings.hbxNoFieldActive;
                    analytics.trackPageAbandon( theApp.settings.hbxPagename, abandonField );
                }
            } );
        }
    }

    /**
     * Used to update the page name for HBX tracking. Most likely used to determine the current pagename for form abandonment.
     *
     * @param pagename  (string)  The new pagename
     */
    analytics.setTrackingPagename = function( pagename )
    {
        theApp.settings.hbxPagename = pagename;
    };

    /**
     * Used to indicate the applications purpose has been fulfilled.
     * This will be used to disable form abandonment tracking from firing if the window is closed
     *
     * @param success   (boolean)   The new page success state. Needs to explicitly be set to 'false' to re-enable form abandonment tracking
     */
    analytics.setPageSuccess = function( success )
    {
        if ( false !== success )
        {
            theApp.settings.pageSuccess = true;
        }
        else
        {
            theApp.settings.pageSuccess = false;
        }
    };

    /**
     * Register a page event using Google Analytics or HBX.
     * Will only work if an analytics account has been set in the application theApp.settings.
     *
     * @param event   (string)    The name of the event to register
     */
    analytics.trackPageEvent = function( event )
    {
        if ( "" !== theApp.settings.analyticsAccount )
        {
            analytics._gaTrackPageEvent( event );
        }

        if ( "" !== theApp.settings.hbxAccount )
        {
            _hbPageView( event, theApp.settings.hbxBaseURL + theApp.settings.hbxMLC );

            // Update the pagename for form abandonment tracking
            //
            analytics.setTrackingPagename( event );
        }
    };

    /**
     * Register a page abandonment event using Google Analytics or HBX.
     * Will only work if an analytics account has been set in the application theApp.settings.
     *
     * @param event     (string)    The name of the event to register
     * @param label     (string)    (Optional) a custom label for the event
     * @param value     (string)    (Optional) a custum value for the event
     */
    analytics.trackPageAbandon = function( event, label, value )
    {
        if ( "" !== theApp.settings.analyticsAccount )
        {
            analytics._gaTrackPageAbandon( event, label, value );
        }

        if ( "" !== theApp.settings.hbxAccount )
        {
			_hbSet("n",    theApp.settings.hbxAbort );
			_hbSet("vcon", theApp.settings.hbxBaseURL );
			_hbSet("c4",   theApp.settings.hbxMLC + "|" + event + ":" + ( label || theApp.settings.hbxNoFieldActive ) );
			_hbSend();
        }
    };

    //  Put any events on a backlog until these functions are replaced in the success-handler of the Google analytics load in setupAnalytics..
    //
    analytics._gaTrackPageEvent = function( event )
    {
        backlog.push( { type: "_gaTrackPageEvent", params: [ event ] } );
    }

    analytics._gaTrackPageAbandon = function( event, label, value )
    {
        backlog.push( { type: "_gaTrackPageAbandon", params: [ event, label, value ] } );
    }

    /**
     * Register a page error event using Google Analytics or HBX.
     * Will only work if an analytics account has been set in the application theApp.settings.
     *
     * @param event     (string)    The name of the event to register
     * @param label     (string)    (Optional) a custom label for the event (only used for Google Analytics)
     * @param value     (string)    (Optional) a custum value for the event (only used for Google Analytics)
     *
     */
    analytics.trackPageError = function( event, label, value )
    {
        if ( "" !== theApp.settings.analyticsAccount )
        {
            try
            {
                var pageTracker = _gat._getTracker( theApp.settings.analyticsAccount );
                pageTracker._trackEvent( theApp.settings.analyticsError, event, label, value );
            }
            catch( err ) { }
        }

        if ( "" !== theApp.settings.hbxAccount )
        {
			_hbSet("n",    theApp.settings.hbxPagename );
			_hbSet("vcon", theApp.settings.hbxBaseURL + theApp.settings.hbxMLC );
			_hbSet("pec",  event );
			_hbSend();
        }
    };

    /**
     *  Perform SiteCatalyst tracking
     *
     *  @param formName     (string)    The name of the form this track request is done for. This should be different than the application name.
     *  @param formStep     (number)    The number of the step within the form, 0-based, so when loading the form it should fire a 0. The track between the first and the second step is formStep 1
     *  @param data         (object)    (optional) An object of which it's own properties are used as tracking fields
     */
    analytics.trackWA = function( formName, formStep, data )
    {
        if ( !window[ "wa" ] )
        {
            return;
        }

        wa.appname  = appName;
        wa.formname = formName || "";
        wa.formstep = formStep || "";

        if ( data )
        {
            for ( var k in data )
            {
                if ( data.hasOwnProperty( k ))
                {
                    wa[ k ] = data[ k ];
                }
            }
        }

        wa.track();
    }
} )( jQuery, window, "barcom" );