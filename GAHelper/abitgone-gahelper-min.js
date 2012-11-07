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

*/!function(){var e=function(e,t){this.$element=$(e);this.options=$.extend({},$.fn.gaHelper.defaults,t)};e.prototype={triggerEvent:function(e){var t=["_trackEvent",this.options.gahelperEventCategory,this.options.gahelperEvent],n=typeof this.options.gahelperEventLabel!="undefined",r=typeof this.$element.attr("data-gahelper-event-value")!="undefined"&&typeof (parseInt(this.$element.attr("data-gahelper-event-value"))==="number"),i=typeof this.options.gahelperEventNoninteraction!="undefined";if(n||r||i){n?t.push(this.options.gahelperEventLabel):t.push(null);if(r||i){r?t.push(parseInt(this.$element.attr("data-gahelper-event-value"))):t.push(null);i&&t.push(this.options.gahelperEventNoninteraction)}}_gaq.push(t);!typeof this.options.gahelperPreventdefault==="undefined"&&this.options.gahelperPreventdefault&&e.preventDefault()},triggerUrl:function(){var e=["_trackPageview",this.options.gahelperUrl];_gaq.push(e)}};$.fn.gaHelper=function(t){return this.each(function(){var n=$(this),r=n.data("gaHelper"),i=typeof t=="object"&&t;r||n.data("gaHelper",r=new e(this,i));typeof t=="string"&&typeof r[t]=="function"&&r[t]()})};$.fn.gaHelper.defaults={gaHelper:!0};$.fn.gaHelper.Constructor=e;$(function(){$(document).on("click.gahelper.data-api","[data-gahelper-event][data-gahelper-event-category], [data-gahelper-url]",function(e){var t,n=$(this),r=n.data("gaHelper")?"gaHelper":n.data();if(typeof _gaq!="array"&&typeof _gaq!="object"&&!!console){t="Google Analytics tracking script does not appear to be loaded (_gaq is not an object nor an array).";console.warn?console.warn(t):console.log("Warning: "+t)}n.gaHelper(r);n.is("[data-gahelper-event]")&&n.gaHelper("triggerEvent");n.is("[data-gahelper-url]")&&n.gaHelper("triggerUrl");n.is("[data-gahelper-preventdefault]")&&e.preventDefault()})})}(window.jQuery);