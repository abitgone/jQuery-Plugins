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

*/!function(){var e=function(e,t){this.element=e;this.$element=$(e);this.options=$.extend({},$.fn.classToggle.defaults,t);this.options.parent&&(this.$parent=$(this.options.parent));this.options.classToggle&&this.classToggle()};e.prototype={constructor:e,classToggle:function(){var e,t,n,r,i,s,o=$(this.options.trigger),u=$(this.options.triggerTarget),a=this.options.classtoggleClass,f=this.options.classtoggleAltclass,l=this.options.classtoggleTriggerActiveclass,c=this.options.classtoggleTriggerSelector,h=this.options.classtoggleTarget;switch(this.element.nodeName.toLowerCase()){case"input":switch(this.$element.attr("type").toLowerCase()){case"radio":this.options.tcMode="radio";break;case"checkbox":this.options.tcMode="checkbox";break;default:this.options.tcMode="input"}break;case"select":this.options.tcMode="select";break;default:this.options.tcMode=""}if(this.options.tcMode!="select"){if(!h){h=o.attr("href")==undefined?o.attr("href"):this.options.trigger.href;h=h&&h.replace(/.*(?=#[^\s]+$)/,"")}if(h==undefined)return;e=$(h)}if(a==undefined||e==undefined&&this.options.tcMode!="select")return;a=a.split(",");t=!1;for(n=0;n<a.length&&!t;n++)t=e&&e.hasClass(a[n]);r=f==undefined?!1:e.hasClass(f);i=o[0];s={triggerNode:i,$tcTarget:e,$trigger:o,tcClass:a,tcClassAlt:f,tcTriggerClass:l,tcTriggerSelector:c,targetMain:t,targetAlt:r,tcThis:this};switch(this.options.tcMode){case"radio":this.toggleClassesFromInput(s,!0);break;case"checkbox":this.toggleClassesFromInput(s,!1);break;case"input":this.toggleClassesFromElement(s,!0);break;case"select":this.toggleClassesFromSelect(s,!0);break;default:this.toggleClassesFromElement(s,!1)}},toggleClassesFromElement:function(e,t){var n,r;if(e.tcClassAlt==undefined||t)e.tcThis.toggleClasses(e.$tcTarget,e.tcClass);else if(e.targetMain&&e.targetAlt||!e.targetMain&&!e.targetAlt)e.$tcTarget.toggleClass(e.tcClassAlt);else{e.$tcTarget.toggleClass(e.tcClassAlt);e.tcThis.toggleClasses(e.$tcTarget,e.tcClass)}if(e.tcTriggerClass==undefined||t)return;e.tcTriggerSelector==undefined?n=e.$trigger:n=$(e.tcTriggerSelector);r=e.tcTriggerClass.split(",");e.tcThis.toggleClasses(n,r)},toggleClassRegex:/([\+-]{2})?([^\s,$]+)/g,toggleClassesFromInput:function(e,t){var n,r,i;e.tcClassOriginal=e.tcClass;e.tcClass=e.tcClass.join(",").replace(this.toggleClassRegex,e.triggerNode.checked?this.toggleClassEvaluator_Checked:this.toggleClassEvaluator_Unchecked).split(",");this.toggleClassesFromElement(e);if(t){n=$("input[type=radio][name="+e.triggerNode.name+"]").not($(e.triggerNode)),r=e.tcClassOriginal.join(",").replace(this.toggleClassRegex,e.triggerNode.checked?this.toggleClassEvaluator_Unchecked:this.toggleClassEvaluator_Checked).split(",");for(i=0;i<n.length;i++){tcOtherTargets=$(n[i]).attr("data-classtoggle-target");this.toggleClasses($(tcOtherTargets),r)}}},toggleClassesFromSelect:function(e){var t,n,r,i,s=this.$element.find("option[data-classtoggle-target]");s.sort(function(e){return e.selected?1:-1});for(t=0;t<s.length;t++){n=s[t];r=$(n);i=r.attr("data-classtoggle-class");i=i&&i.split(",")||e.tcClass;i=i.join(",").replace(this.toggleClassRegex,n.selected?this.toggleClassEvaluator_Checked:this.toggleClassEvaluator_Unchecked).split(",");this.toggleClasses($(r.attr("data-classtoggle-target")),i)}},toggleClassEvaluator_Checked:function(e,t,n){return t=="--"?"--"+n:"++"+n},toggleClassEvaluator_Unchecked:function(e,t,n){return t=="--"?"++"+n:"--"+n},toggleClasses:function(e,t){var n,r;for(n=0;n<t.length;n++){r=t[n].match(/([-+]{2})?(\S+)/);switch(r[1]){case"--":e.removeClass(r[2]);break;case"++":e.addClass(r[2]);break;default:e.toggleClass(r[2])}}}};$.fn.classToggle=function(t){this.each(function(){var n=$(this),r=n.data("classToggle"),i=typeof t=="object"&&t;r||n.data("classToggle",r=new e(this,i));typeof t=="string"&&r[t]()})};$.fn.classToggle.defaults={classToggle:!0};$.fn.classToggle.Constructor=e;$(function(){$("body").on("click.classtoggle.data-api change.classtoggle.data-api","[data-classtoggle-class]",function(e){var t,n,r,i,s=e.target||e.srcElement;if(s.nodeName.toLowerCase()=="select"&&e.type.toLowerCase()!="change")return;t=$(this),r=t.attr("data-classtoggle-target")||e.preventDefault()||(n=t.attr("href"))&&n.replace(/.*(?=#[^\s]+$)/,""),i=t.data("classToggle")?"classToggle":t.data();i.trigger=e.target;i.triggerTarget=r;$(this).classToggle(i);t.attr("data-classtoggle-target")&&t.attr("href")&&e.preventDefault()})})}(window.jQuery);