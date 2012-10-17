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
        The class to be toggled, on and off, by the trigger
        
    Additionally, you may specify the following additional class names:
    
    -   **data-classtoggle-altclass**  
        The class you'd like to alternate with the main class. For example, data-classtoggle-class="Red" and 
        data-classtoggle-altclass="Green" will alternate the .Red and .Green classes each time the trigger element 
        is activated.
        
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
    
*/
!function (jQuery) {
    
    // ClassToggle Public Class Definition
    var ClassToggle = function (element, options) {
        
        this.$element = $(element)
        this.options = $.extend({}, $.fn.classToggle.defaults, options)
        
        if (this.options.parent) {
          this.$parent = $(this.options.parent)
        }
        
        this.options.classToggle && this.classToggle()
        
    }
    
    ClassToggle.prototype = {
        
        constructor: ClassToggle,
        
        classToggle: function (option) {
            
            $sender = $(this.options.sender);
            
            var tcClass = this.options.classtoggleClass;
            var tcClassAlt = this.options.classtoggleAltclass;
            var tcTriggerClass = this.options.classtoggleTriggerActiveclass;
            var tcTriggerSelector = this.options.classtoggleTriggerSelector;
            var target = this.options.classtoggleTarget;
            
            if (target == undefined) {
                target = $sender.attr('href') == undefined ? $sender.attr('href') : $sender[0].href;
                target = target.replace(/.*(?=#[^\s]+$)/, ''); // Strip for IE7
            }
            if (target == undefined) return;
            var $target = $(target);
            
            if (tcClass == undefined || $target == undefined) return;
            
            var targetMain = $target.hasClass(tcClass);
            var targetAlt = tcClassAlt == undefined ? false : $target.hasClass(tcClassAlt);
            
            if (tcClassAlt == undefined) {
                $target.toggleClass(tcClass);
            } else {
                if((targetMain && targetAlt) || (!targetMain && !targetAlt)) {
                    $target.toggleClass(tcClassAlt);
                } else {
                    $target.toggleClass(tcClassAlt);
                    $target.toggleClass(tcClass);
                }
            }
            
            if (tcTriggerClass == undefined) return;
            
            var $triggers;
            if (tcTriggerSelector == undefined) {
                $triggers = $sender;
            } else {
                $triggers = $(tcTriggerSelector)
            }
            $triggers.toggleClass(tcTriggerClass);
            
        }
    }
    
    // ClassToggle Plugin definition
    $.fn.classToggle = function(option) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data('classToggle'),
                options = typeof option == 'object' && option;
                if (!data) $this.data('classToggle', (data = new ClassToggle(this, options)));
            if (typeof option == 'string') data[option]();
        });
    }
    
    $.fn.classToggle.defaults = {
        classToggle: true
    };
    
    $.fn.classToggle.Constructor = ClassToggle;
    
    // ClassToggle Data-Api
    $(function (){
        $('body').on('click.classtoggle.data-api', '[data-classtoggle-class]', function (e) { 
            var $this = $(this)
              , href
              , target = $this.attr('data-classtoggle-target')
                || e.preventDefault()
                || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // Strip for IE7
              , option = $(target).data('classToggle') ? 'classToggle' : $this.data();
            option.sender = e.target;
            $(target).classToggle(option);
            if ($this.attr('data-classtoggle-target') && $this.attr('href')) e.preventDefault();
        });
    });
    
}(window.jQuery);
