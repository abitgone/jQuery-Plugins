/*
    abitgone-gahelper.js
    =======================
    A suite of Google Analytics triggers to help non-developers use page- and event-tracking beyond the default 
    tracking offered by Google Analytics.
    
    For information on how to use this plugin and for code examples, visit 
    http://abitgone.github.com/jQuery-Plugins/GA-Helper
    
    License
    -------
    Author: Anthony Williams
    Web: http://abitgone.github.com/jQuery-Plugins/Carousel

    Copyright (c) 2012 Anthony Williams

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
    documentation files (the "Software"), to deal in the Software without restriction, including without limitation the 
    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to 
    permit persons to whom the Software is furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all copies or substantial portions of
    the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO 
    THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 
    THE SOFTWARE.

*/
!function (jQuery) {

    //GaHelper Public Class Definition
    var GAHelper = function(element, options) {
        this.$element = $(element);
        this.options = $.extend({}, $.fn.gaHelper.defaults, options);
    }

    GAHelper.prototype = {

        triggerEvent: function(e) {
            var pushData = ['_trackEvent', this.options.gahelperEventCategory, this.options.gahelperEvent];

            var hasLabel = !(typeof this.options.gahelperEventLabel === "undefined"),
                hasValue = !(typeof this.$element.attr("data-gahelper-event-value") === "undefined") && 
                           typeof(parseInt(this.$element.attr("data-gahelper-event-value")) === "number"),
                hasNoninteraction = !(typeof this.options.gahelperEventNoninteraction === "undefined");

            // Variables must be passed in a specific order - push a null if a value doesn hasn't been passed
            if (hasLabel || hasValue || hasNoninteraction) {
                if (hasLabel) {
                    pushData.push(this.options.gahelperEventLabel);
                } else {
                    pushData.push(null); // Placeholder null for Event label, if hasValue or hasNoninteraction
                }
                if (hasValue || hasNoninteraction) {
                    if (hasValue) {
                        pushData.push(parseInt(this.$element.attr("data-gahelper-event-value")));
                    } else {
                        pushData.push(null); // Placeholder null for Event Value, if hasNoninteraction
                    }
                    if (hasNoninteraction) {
                        pushData.push(this.options.gahelperEventNoninteraction);
                    }
                }
            }
            _gaq.push(pushData);            

            if (!typeof this.options.gahelperPreventdefault === "undefined") {
                if (this.options.gahelperPreventdefault) {
                    e.preventDefault();
                }
            }
        },

        triggerUrl: function(e) {
            var pushData = ['_trackPageview', this.options.gahelperUrl];
            _gaq.push(pushData);
        }

    }

    // GAHelper Plugin Definition
    $.fn.gaHelper = function(option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('gaHelper'),
                options = typeof option == 'object' && option;
            if (!data) $this.data('gaHelper', (data = new GAHelper(this, options)));
            if (typeof option === 'string' && typeof data[option] === 'function') data[option]();
        });
    }

    $.fn.gaHelper.defaults = {
        gaHelper: true
    }

    $.fn.gaHelper.Constructor = GAHelper;

    // GAHelper Data-Api
    $(function () {
        $(document).on('click.gahelper.data-api', '[data-gahelper-event][data-gahelper-event-category], [data-gahelper-url]', function (e) {
            var $this = $(this),
                option = $this.data('gaHelper') ? 'gaHelper' : $this.data();
            if (!(typeof _gaq === "array" || typeof _gaq === "object")) {
                if (!!console) {
                    var errMsg = "Google Analytics tracking script does not appear to be loaded (_gaq is not an object nor an array).";
                    if (!!console.warn) {
                        console.warn(errMsg)
                    } else {
                        console.log("Warning: " + errMsg);
                    }
                }
            }
            $this.gaHelper(option);
            if ($this.is("[data-gahelper-event]")) {
                $this.gaHelper("triggerEvent");
            }
            if ($this.is("[data-gahelper-url]")) {
                $this.gaHelper("triggerUrl");
            }
            if ($this.is("[data-gahelper-preventdefault]")) {
                e.preventDefault();
            }
        });
    });

}(window.jQuery);