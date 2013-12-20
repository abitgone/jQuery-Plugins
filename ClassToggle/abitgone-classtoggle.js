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
    var ClassToggle = function(element, options) {

        this.$element = $(element);
        this.options = $.extend({}, $.fn.classToggle.defaults, options);

        if (this.options.parent) {
            this.$parent = $(this.options.parent);                
        }

        this.options.classToggle && this.classToggle();

    }

    ClassToggle.prototype = {

        constructor: ClassToggle,

        classToggle: function() {

            var $trigger = $(this.options.trigger),
                $triggerTarget = $(this.options.triggerTarget);

            var tcClass = this.options.classtoggleClass,
                tcClassAlt = this.options.classtoggleAltclass,
                tcTriggerClass = this.options.classtoggleTriggerActiveclass,
                tcTriggerSelector = this.options.classtoggleTriggerSelector,
                tcTarget = this.options.classtoggleTarget;

            if (tcTarget == undefined) {
                tcTarget = $trigger.attr('href') == undefined ? $trigger.attr('href') : this.options.trigger.href;
                tcTarget = tcTarget.replace(/.*(?=#[^\s]+$)/, ''); // Strip for IE7
            }
            if (tcTarget == undefined) return;
            var $tcTarget = $(tcTarget);

            if (tcClass == undefined || $tcTarget == undefined) return;
            tcClass = tcClass.split(',');

            var targetMain = false;
            for (var i=0;i<tcClass.length && !targetMain; i++) {
                targetMain = $tcTarget.hasClass(tcClass[i]);
            }
            var targetAlt = tcClassAlt == undefined ? false : $tcTarget.hasClass(tcClassAlt);

            var triggerNode = $trigger[0];

            var tcOptions = {
                "triggerNode":          triggerNode,
                "$tcTarget":            $tcTarget,
                "$trigger":             $trigger,
                "tcClass":              tcClass,
                "tcClassAlt":           tcClassAlt,
                "tcTriggerClass":       tcTriggerClass,
                "tcTriggerSelector":    tcTriggerSelector,
                "targetMain":           targetMain,
                "targetAlt":            targetAlt,
                "tcThis":               this
            };

            if (triggerNode.nodeName.toLowerCase() == "input") {
                switch(triggerNode.type.toLowerCase()) {
                    case "radio":
                        // A radiobutton triggered the toggle 
                        this.toggleClassesFromInput(tcOptions, true);
                        break;
                    case "checkbox":
                        // A checkbox triggered the toggle
                        this.toggleClassesFromInput(tcOptions, false);
                        break;
                    default:
                        // Another input element triggered the toggle -- treat as normal
                        this.toggleClassesFromElement(tcOptions, true);
                        break;
                }
            }
            else {
                // A non-input element triggered the toggle -- treat as normal
                this.toggleClassesFromElement(tcOptions, false);
            }

        },

        toggleClassesFromElement: function(tcOptions, isInputElement) {

            // Normal behaviour -- this will just indiscriminately toggle classes on a per-click basis, though for input
            // elements, 

            if (tcOptions.tcClassAlt == undefined || isInputElement) {
                tcOptions.tcThis.toggleClasses(tcOptions.$tcTarget, tcOptions.tcClass);
            } else {
                if ((tcOptions.targetMain && tcOptions.targetAlt) || (!tcOptions.targetMain && !tcOptions.targetAlt)) {
                    tcOptions.$tcTarget.toggleClass(tcOptions.tcClassAlt);
                } else {
                    tcOptions.$tcTarget.toggleClass(tcOptions.tcClassAlt);
                    tcOptions.tcThis.toggleClasses(tcOptions.$tcTarget, tcOptions.tcClass);
                }
            }

            if (tcOptions.tcTriggerClass == undefined) return;

            var $tcTriggers;
            if (tcOptions.tcTriggerSelector == undefined) {
                $tcTriggers = tcOptions.$trigger;
            } else {
                $tcTriggers = $(tcOptions.tcTriggerSelector);
            }
            $tcTriggers.toggleClass(tcOptions.tcTriggerClass);

        },
        toggleClassesFromInput: function(tcOptions, isRadioButton) {

            // Checkbox behaviour -- this is different to the normal behaviour and attempts to modify the classes that
            // are toggled when clicked. The class list to toggle - tcClassList - will be rewritten as follows:
            // 
            //     element.checked  |  original class name  |  modified class name
            //     =================|=======================|==============================================
            //     false (default)  |  class-name           |  --class-name (thus explicitly removing it)
            //     false (default)  |  ++class-name         |  --class-name (thus explicitly removing it)
            //     false (default)  |  --class-name         |  --class-name (no change)
            //     -----------------|-----------------------|----------------------------------------------
            //     true             |  class-name           |  ++class-name (thus explicitly adding it)
            //     true             |  ++class-name         |  ++class-name (no change)
            //     true             |  --class-name         |  ++class-name (thus explicitly adding it)
            
            var tcBaseRegex = /([+-]{2})?([^\s,$]+)/g;

            tcOptions.tcClassOriginal = tcOptions.tcClass;
            tcOptions.tcClass = tcOptions.tcClass.join(",").replace(tcBaseRegex, (tcOptions.triggerNode.checked ? "++" : "--") + "$2").split(",");
            this.toggleClassesFromElement(tcOptions);

            if (isRadioButton) {
                var $tcRadioButtons = $("input[type=radio][name=" + tcOptions.triggerNode.name + "]").not($(tcOptions.triggerNode)),
                    tcOtherInputClass = tcOptions.tcClassOriginal.join(",").replace(tcBaseRegex, (tcOptions.triggerNode.checked ? "--" : "++") + "$2").split(",");

                for (var i = 0; i < $tcRadioButtons.length; i++) {
                    tcOtherTargets = $($tcRadioButtons[i]).attr("data-classtoggle-target");
                    this.toggleClasses($(tcOtherTargets), tcOtherInputClass);
                };

            }

        },

        toggleClasses: function ($element, tcClassList) {
            for (var i=0;i<tcClassList.length;i++) {
                var match = tcClassList[i].match(/([-+]{2})?(\S+)/);
                switch(match[1]) {
                    case '--':
                        $element.removeClass(match[2]);
                        break;
                    case '++':
                        $element.addClass(match[2]);
                        break;
                    default:
                        $element.toggleClass(match[2]);
                        break;
                }
            }
        }

    }

    // ClassToggle Plugin Definition
    $.fn.classToggle = function (option) {
        this.each(function () {
            // $this is the jQuery wrapped link that is clicked
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
    $(function () {
        $('body').on('click.classtoggle.data-api', '[data-classtoggle-class]', function (e) {
            var $this = $(this),
                href,
                target = $this.attr('data-classtoggle-target')
                    || e.preventDefault()
                    || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''),
                option = $this.data('classToggle') ? 'classToggle' : $this.data();
            option.trigger = e.target;
            option.triggerTarget = target;
            $(this).classToggle(option);
            if ($this.attr('data-classtoggle-target') && $this.attr('href')) e.preventDefault();
        });
    })

}(window.jQuery);
