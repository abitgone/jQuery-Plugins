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

        this.element  = element;
        this.$element = $(element);
        this.options  = $.extend({}, $.fn.classToggle.defaults, options);

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
                tcTarget = this.options.classtoggleTarget,
                $tcTarget;

            //  ClassToggle behaves differently depending on the type of element that it is applied to
            switch (this.element.nodeName.toLowerCase()) {
                case "input":
                    switch (this.$element.attr("type").toLowerCase()) {
                        case "radio":
                            this.options.tcMode = "radio";
                            break;
                        case "checkbox":
                            this.options.tcMode = "checkbox";
                            break;
                        default:
                            this.options.tcMode = "input";
                            break;
                    }
                    break;
                case "select":
                    this.options.tcMode = "select";
                    break;
                default:
                    this.options.tcMode = "";
                    break;
            }

            //  We only need to obtain target information if we're not in "select" mode
            if (this.options.tcMode != "select") {
                //  If there's no target and a href exists, use that instead
                if (!tcTarget) {
                    tcTarget = $trigger.attr('href') == undefined ? $trigger.attr('href') : this.options.trigger.href;
                    tcTarget = tcTarget && tcTarget.replace(/.*(?=#[^\s]+$)/, ''); // Strip for IE7
                }
                if (tcTarget == undefined) return;
                $tcTarget = $(tcTarget);
            }
            
            if (tcClass == undefined || $tcTarget == undefined && this.options.tcMode != "select") return;
            tcClass = tcClass.split(',');

            var targetMain = false;
            for (var i=0;i<tcClass.length && !targetMain; i++) {
                targetMain = $tcTarget && $tcTarget.hasClass(tcClass[i]);
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

            switch (this.options.tcMode) {
                case "radio":
                    this.toggleClassesFromInput(tcOptions, true);
                    break;
                case "checkbox":
                    this.toggleClassesFromInput(tcOptions, false);
                    break;
                case "input":
                    this.toggleClassesFromElement(tcOptions, true);
                    break;
                case "select":
                    this.toggleClassesFromSelect(tcOptions, true);
                    break;
                default:
                    this.toggleClassesFromElement(tcOptions, false);
                    break;
            }
        },

        toggleClassesFromElement: function(tcOptions, isInputElement) {

            // Normal behaviour -- this will just indiscriminately toggle classes on a per-click basis, though for input
            // elements, toggling a class on the trigger is not yet available (I haven't had a chance to test it well
            // enough yet to include it right now).

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

            // If there is no trigger class, or if the trigger is an input element, don't bother with the triggers

            if (tcOptions.tcTriggerClass == undefined || isInputElement) return;

            var $tcTriggers;
            if (tcOptions.tcTriggerSelector == undefined) {
                $tcTriggers = tcOptions.$trigger;
            } else {
                $tcTriggers = $(tcOptions.tcTriggerSelector);
            }

            var triggerClass = tcOptions.tcTriggerClass.split(",");
            tcOptions.tcThis.toggleClasses($tcTriggers, triggerClass);

        },

        toggleClassRegex: /([\+-]{2})?([^\s,$]+)/g,

        toggleClassesFromInput: function(tcOptions, isRadioButton) {

            // Checkbox behaviour -- this is different to the normal behaviour and attempts to modify the classes that
            // are toggled when clicked. The class list to toggle - tcClassList - will be rewritten as follows:
            // 
            //     element.checked  |  original class name  |  modified class name
            //     =================|=======================|==============================================
            //     false (default)  |  class-name           |  --class-name (thus explicitly removing it)
            //     false (default)  |  ++class-name         |  --class-name (thus explicitly removing it)
            //     false (default)  |  --class-name         |  ++class-name (thus explicitly adding it)
            //     -----------------|-----------------------|----------------------------------------------
            //     true             |  class-name           |  ++class-name (thus explicitly adding it)
            //     true             |  ++class-name         |  ++class-name (no change)
            //     true             |  --class-name         |  --class-name (thus explicitly removing it)
            
            tcOptions.tcClassOriginal = tcOptions.tcClass;
            tcOptions.tcClass = tcOptions.tcClass.join(",").replace(this.toggleClassRegex, tcOptions.triggerNode.checked ? this.toggleClassEvaluator_Checked : this.toggleClassEvaluator_Unchecked).split(",");
            this.toggleClassesFromElement(tcOptions);
            
            if (isRadioButton) {
                var $tcRadioButtons = $("input[type=radio][name=" + tcOptions.triggerNode.name + "]").not($(tcOptions.triggerNode)),
                    tcOtherInputClass = tcOptions.tcClassOriginal.join(",").replace(this.toggleClassRegex, tcOptions.triggerNode.checked ? this.toggleClassEvaluator_Unchecked : this.toggleClassEvaluator_Checked).split(",");

                for (var i = 0; i < $tcRadioButtons.length; i++) {
                    tcOtherTargets = $($tcRadioButtons[i]).attr("data-classtoggle-target");
                    this.toggleClasses($(tcOtherTargets), tcOtherInputClass);
                };

            }

        },
        toggleClassesFromSelect: function(tcOptions) {
            var $allOptions = this.$element.find("option[data-classtoggle-target]");

            for (var i = 0; i < $allOptions.length; i++) {
                var selectOption = $allOptions[i];
                var $selectOption = $(selectOption);

                var optionClass = $selectOption.attr("data-classtoggle-class");

                optionClass = (optionClass && optionClass.split(",")) || tcOptions.tcClass;
                optionClass = optionClass.join(",").replace(this.toggleClassRegex, selectOption.selected ? this.toggleClassEvaluator_Checked : this.toggleClassEvaluator_Unchecked).split(",");
                this.toggleClasses($($selectOption.attr("data-classtoggle-target")), optionClass);
            }
        },
        toggleClassEvaluator_Checked: function(match, p1, p2) {
            if (p1 == "--") {
                return "--" + p2;
            }
            else {
                return "++" + p2;
            }
        },
        toggleClassEvaluator_Unchecked: function(match, p1, p2) {
            if (p1 == "--") {
                return "++" + p2;
            }
            else {
                return "--" + p2;
            }
        },

        toggleClasses: function($element, tcClassList) {
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
