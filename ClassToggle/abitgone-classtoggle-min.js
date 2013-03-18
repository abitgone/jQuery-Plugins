/*
    abitgone-classtoggle.js
    =======================
    ClassToggle toggles, on a target element, a single class on and off or between two classes.
    
    Usage
    -----
    As a bare minimum, your trigger element must have the following attributes:
    
    -   **href** (for anchors) or **data-classtoggle-target**  
        This specifies the target element
        
    -   **data-classtoggle-class**  
        The class, or comma-separated classes, to be toggled, on and off, by the trigger
        
    Additionally, you may specify the following additional class names:
    
    -   **data-classtoggle-altclass**  
        The class you'd like to alternate with the main class. For example, data-classtoggle-class="Red" and 
        data-classtoggle-altclass="Green" will alternate the .Red and .Green classes each time the trigger element 
        is activated. Unlike multiple classes, this will check for the existence of data-classtoggle-class and
        data-classtoggle-altclass before toggling the main class or alternate class.
        
    -   **data-classtoggle-trigger-activeclass**  
        Specifies a class to be added to the trigger when it activates the ClassToggle.
        
    -   **data-classtoggle-trigger-selector**  
        Specifies a jQuery selector which data-classtoggle-trigger-activeclass will be toggled on when the trigger 
        elements are activated. Useful if you have more than one trigger which could trigger the target element.
        
    For more information on how to use this plugin and for live examples, visit 
    http://abitgone.github.com/jQuery-Plugins/ClassToggle
    
    License
    -------
    Author: Anthony Williams
    Web: http://abitgone.github.com/jQuery-Plugins/ClassToggle
    
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
    
*/!function(){var e=function(e,t){this.$element=$(e);this.options=$.extend({},$.fn.classToggle.defaults,t);this.options.parent&&(this.$parent=$(this.options.parent));this.options.classToggle&&this.classToggle()};e.prototype={constructor:e,classToggle:function(){var e,t,n,r,i,s,o,u,a,f,l;$sender=$(this.options.sender);e=this.options.classtoggleClass;t=this.options.classtoggleAltclass;n=$sender.is("[data-classtoggle-showtarget]");r=this.options.classtoggleTriggerActiveclass;i=this.options.classtoggleTriggerSelector;s=this.options.classtoggleTarget;if(s==undefined){s=$sender.attr("href")==undefined?$sender.attr("href"):$sender[0].href;s=s.replace(/.*(?=#[^\s]+$)/,"")}if(s==undefined)return;o=$(s);if(e==undefined||o==undefined)return;e=e.split(",");u=!1;for(a=0;a<e.length&&u==0;a++)u=o.hasClass(e);f=t==undefined?!1:o.hasClass(t);if(t==undefined)for(a=0;a<e.length;a++)o.toggleClass(e);else if(u&&f||!u&&!f)o.toggleClass(t);else{o.toggleClass(t);for(a=0;a<e.length;a++)o.toggleClass(e)}n&&o[0].scrollIntoView();if(r==undefined)return;i==undefined?l=$sender:l=$(i);l.toggleClass(r)}};$.fn.classToggle=function(t){return this.each(function(){var n=$(this),r=n.data("classToggle"),i=typeof t=="object"&&t;r||n.data("classToggle",r=new e(this,i));typeof t=="string"&&r[t]()})};$.fn.classToggle.defaults={classToggle:!0};$.fn.classToggle.Constructor=e;$(function(){$("body").on("click.classtoggle.data-api","[data-classtoggle-class]",function(e){var t,n=$(this),r=n.attr("data-classtoggle-target")||e.preventDefault()||(t=n.attr("href"))&&t.replace(/.*(?=#[^\s]+$)/,""),i=$(r).data("classToggle")?"classToggle":n.data();i.sender=e.target;$(r).classToggle(i);n.attr("data-classtoggle-target")&&n.attr("href")&&e.preventDefault()})})}(window.jQuery);