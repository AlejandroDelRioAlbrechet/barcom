/**
 * @description Pluggable translation support.
 * HTML tags must marked with the i18n CSS class and an attribute called data-translateKey
 * for them to be translatable.
 * Language catalogs are XML files stored in the catalog/ folder.
 *
 * Below as an example translation from the XML catalog:
 * <code><pre>
 *  h?xml version="1.0" encoding="UTF-8"?>
 *  &lt;catalog lang="nl"&gt;
 *      &lt;text id="txtMyApp"&gt;Mijn applicatie&lt;/text&gt;
 *      ...
 *  &lt;/catalog&gt;
 * </pre></code>
 *
 * The translatable element would look like this:
 * <code><pre>&lt;div class="i18n" data-translateKey="txtMyApp">...</pre></code>
 *
 * Translate will fille the tags text.
 * For &lt;img&gt; tabs the alt attribute will be filled.
 *
 * <h2>Settings:</h2>
 * <dl>
 * <dt>lang</dt><dd>(string) Language catalog to load during initialization (optional)</dd>
 * </dl>
 *
 * @namespace
 * @name i18n
 * @version 1.0
 * @author mdoeswijk
 */
;(function( $, context, appName )
{
    var theApp  = $.getAndCreateContext( appName, context )
    ,   buildNr = /* @@build-nr-start@@*/ new Date().getTime()/* @@build-nr-end@@*/
    ,   i18n    = { build: buildNr }
    ;

    theApp.i18n = i18n;

    // Extend the settings with language defaults
    //
    theApp.settings = $.extend( {  language: ""
                      },  ( theApp.settings || {} ) );

    // The active language catalog
    //
    var $xmlCatalog = null;

    $( document ).ready( function()
    {
        if ( theApp.settings.language )
        {
            i18n.switchLanguage( theApp.settings.language );
        }
    } );

    /**
     * This function stores the current language catalog in a local cache
     *
     * @param data  (Document)  An XML document
     */
    i18n.storeLanguageCatalog = function( data )
    {
        $xmlCatalog = $( data );
    };

    /**
     * Retrieves the current translation catalog
     *
     * @return (Array) The language catalog in jQuery object array format
     */
    i18n.getCatalog = function()
    {
        return $xmlCatalog ? $xmlCatalog.find( "catalog" ) : null;
    };

    /**
     * This function changes the currently loaded application language
     *
     * @param language  (string)    The language code for the language that is to be loaded
     */
    i18n.switchLanguage = function( language )
    {
        // Load the new language catalog
        //
        $.ajax(
        {
            url: "catalogs/ui/" + language + ".xml?" + buildNr,
            success: function( data, status, xhr )
            {
                i18n.storeLanguageCatalog( data );
                i18n.translate( "body" );

                $( "body" ).find( "label.error" ).each( function( index, textItem )
                {
                    i18n.translateFormError( textItem );
                } );
            },
            error: function( xhr, status, error )
            {
                console && console.log( "Failed to load the '" + language + "' catalog. " + ( error ? error.message: status ) );
            },
            contentType: "text/xml"
        } );
    };

    /**
     * Updates the text content of html elements based on the current language.
     * Translatable tags are marked with an i18n class.
     * The "data-translateKey" attribute contains the lookup value for the catalog
     * If no translation can be found the text content will remain unaltered.
     *
     * @param startElement  (String/Object) jQuery selector or jQuery object that will be the starting point of the translation. All child nodes will be translated.
     */
    i18n.translate = function( startElement )
    {
        var $catalog = i18n.getCatalog();

        // Element translations
        //
        $( startElement ).find( ".i18n" ).each( function( index, textItem )
        {
            // We have to do this before we wrap it in a jQuery object
            //
            var tagName     = textItem.nodeName;
            var $textItem   = $( textItem );

            var key         = $textItem.attr( "data-translateKey" );
            var translated  = $catalog ? $catalog.find( "text[id='" + key + "']:first" ).text() : null;

            if ( translated )
            {
                switch ( tagName.toLowerCase() )
                {
                    case "img":
                        $textItem.attr( "alt", translated );
                    break;

                    default:
                        $textItem.text( translated );
                    break;
                }
            }
        } );
    };

    /**
     * Updates the form error text based on the current language setting.
     * Used in conjunction with the jQuery.validate plugin error labels.
     * Translatable labels are marked with an i18n class.
     * The "data-translateKey" attribute contains the lookup value for the catalog
     * If no translation can be found the label content will remain unaltered.
     *
     * @param textItem (Object) jQuery object representing the form error label
     */
    i18n.translateFormError = function( textItem )
    {
        // Form validation translations
        //
        var $textItem = $( textItem );
        var key       = $textItem.attr( "data-translateKey" );

        var translated = i18n.getFormError( key );
        if ( translated )
        {
            $textItem.text( translated );
        }
    };

    /**
     * Retrieves a single form error translation form the current language catalog
     *
     * @param key   (String)    The identifier of the form eror
     */
    i18n.getFormError = function( key )
    {
        var $catalog = i18n.getCatalog();

        return $catalog.find( "text[id='" + key + "']:first" ).text();
    };
} )( jQuery, window, "barcom" );