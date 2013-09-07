/**
 * @description Reusable wizard plugin (jquery ui widget based)
 *
 * @namespace
 * @name marv.iqWizard
 * @version 1.0
 * @author Alejandro Del Rio
*/
;(function( $ )
{
    /*
        Function: marv.iqWizard

        Used to create a wizard.
        This widget assumes the following CSS classes for its functional bits:

        - indicators > steps
        - pages > page
        - buttons

        Parameters:
            getCurrentPage   - Return currently active page number
            next             - Activate the next wizard page
            previous         - Activate the previous wizard page
            getPage          - Gets a page element by its number
            getStepIndicator - Gets a step element indicator by its number
            getNextPage      - Gets the next page number
            getPreviousPage  - Gets the previous page number

        Returns:
            None
    */
    $.widget( "marv.iqWizard",
    {
        options: {
            widgetClass:    "iqWizard"
        ,   pages:          ".pages"
        ,   page:           ".page"
        ,   indicator:      ".indicator"
        ,   step:           ".step"
        ,   visitedClass:   "visited"
        ,   currentClass:   "current"
        ,   disabledClass:  "disabled"
        ,   animation:      "show"
        ,   animationSpeed: "normal"
        }

    ,   _create: function( params )
        {
            var widget  = this;
            var $item   = widget.element;

            widget.options = $.extend( widget.options, params );
            var options    = widget.options;

            $item.addClass( options.widgetClass );

            // Hide all pages
            //
            $item.find( options.pages + " " + options.page ).hide();

            widget.next();
        }

    ,   currentPage: -1
    ,   getCurrentPage: function() { return this.currentPage }

    ,   enable: function( pageNr )
        {
            var widget  = this;
            var options = widget.options;

            widget.getPage( pageNr ).removeClass( options.disabledClass );
            widget.getStepIndicator( pageNr ).removeClass( options.disabledClass );
        }

    ,   disable: function( pageNr )
        {
            var widget  = this;
            var options = widget.options;

            widget.getPage( pageNr ).addClass( options.disabledClass );
            widget.getStepIndicator( pageNr ).addClass( options.disabledClass );
        }

    ,   getPage: function( pageNr )
        {
            var widget  = this;
            var $item   = widget.element;
            var options = widget.options;

            var selPage = options.pages + " " + options.page;
            return $item.find( selPage + ":eq(" + pageNr + ")" );
        }

    ,   getStepIndicator: function( pageNr )
        {
            var widget  = this;
            var $item   = widget.element;
            var options = widget.options;

            var selStep = options.indicator + " " + options.step;
            return $item.find( selStep + ":eq(" + pageNr +")" );
        }

    ,   next: function()
        {
            var widget  = this;
            var $item   = widget.element;
            var options = widget.options;

            var nextPageNr = widget.getNextPage();
            var maxPageNr  = $item.find( options.pages + " " + options.page ).length;

            if ( nextPageNr < maxPageNr )
            {
                widget.changePage( nextPageNr );
            }
        }

    ,   previous: function()
        {
            var widget     = this;
            var prevPageNr = widget.getPreviousPage();

            if ( prevPageNr >= 0 )
            {
                widget.changePage( prevPageNr );
            }
        }

    ,   changePage: function( newPageNr )
        {
            var widget   = this;
            var options  = widget.options;

            var curPageNr = widget.currentPage;

            var $curPage = widget.getPage( curPageNr );
            var $curStep = widget.getStepIndicator( curPageNr );

            var $newPage = widget.getPage( newPageNr );
            var $newStep = widget.getStepIndicator( newPageNr );

            if ( $curPage && $newPage )
            {
                // Change the page based on animation setting
                //
                switch( options.animation )
                {
                    case "slide":
                        $curPage.slideUp(   options.animationSpeed );
                        $newPage.slideDown( options.animationSpeed );
                    break;

                    case "fade":
                        $curPage.fadeOut( options.animationSpeed );
                        $newPage.fadeIn(  options.animationSpeed );
                    break;

                    case "show":
                        $curPage.hide();
                        $newPage.show();
                    break;
                }

                // Update step indicators (not animated)
                //
                $curStep.removeClass( options.currentClass );
                $newStep.addClass(    options.currentClass );

                // Set visited markers
                //
                $curPage.addClass( options.visitedClass );
                $curStep.addClass( options.visitedClass );

                // Update the currentPage value
                //
                widget.currentPage = newPageNr;
            }
        }

    ,   getNextPage: function()
        {
            var widget   = this;
            var $item    = widget.element;
            var options  = widget.options;

            var nextPageNr = widget.currentPage + 1;
            var maxPageNr  = $item.find( options.pages + " " + options.page ).length - 1;
            var $nextPage  = widget.getPage( nextPageNr );

            while( ( nextPageNr <= maxPageNr ) && $nextPage.hasClass( options.disabledClass ) )
            {
                nextPageNr++;
                $nextPage = widget.getPage( nextPageNr );
            }

            return Math.min( maxPageNr, nextPageNr );
        }

    ,   getPreviousPage: function()
        {
            var widget   = this;
            var $item    = widget.element;
            var options  = widget.options;

            var prevPageNr = widget.currentPage - 1;
            var $prevPage  = widget.getPage( prevPageNr );

            while( ( prevPageNr > 0 ) && $prevPage.hasClass( options.disabledClass ) )
            {
                prevPageNr--;
                $prevPage = widget.getPage( prevPageNr );
            }

            return Math.max( 0, prevPageNr );
        }
    } );
} )( jQuery );