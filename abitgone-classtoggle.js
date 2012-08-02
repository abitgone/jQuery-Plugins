/*	
 *	abitgone-classtoggle.js
 *
 *	TO USE:
 *		Your trigger element - usually an anchor tag, button or something else - must have the following attributes:
 *
 *			data-classtoggle-target	:  	The element you're targeting, using jQuery syntax, for example: data-toggleclass-target="#ToggleTarget"
 *			data-classtoggle		:	The class you want to toggle, for example: data-toggleclass="Collapsed"
 *			data-classtoggle-alt	: 	(Optional) The class you'd like to alternate, for example: data-toggleclass="Expanded"
 *
 *		If you do not specify data-toggleclass-alt, the main data-toggleclass will be toggled on and off.
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
			
			$sender = $(event.target);
					
			var tcClass = $sender.attr('data-classtoggle-class');
			var tcClassAlt = $sender.attr('data-classtoggle-altclass');
			var target = $sender.attr('data-classtoggle-target');
			if (target == undefined) {
				target = $sender.attr('href');
				target = target.replace(/.*(?=#[^\s]+$)/, ''); // Strip for IE7
			}
			if (target == undefined) return;
			var $target = $(target);
						
			if (tcClass == undefined || $target == undefined) return;
			
			var targetMain = $target.hasClass(tcClass);	
			var targetAlt = tcClassAlt == undefined ? false : $target.hasClass(tcClassAlt);
						
			if (tcClassAlt == undefined) {
				$target.toggleClass(tcClass);
				return;
			} else {
				if((targetMain && targetAlt) || (!targetMain && !targetAlt)) {
					$target.toggleClass(tcClassAlt);
				} else {
					$target.toggleClass(tcClassAlt);
					$target.toggleClass(tcClass);					
				}
			}
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
			var $this = $(this);
			var href;
			var target = $this.attr('data-classtoggle-target') || 
						 (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''); // Strip for IE7		
			var option = $(target).data('classToggle') ? 'classToggle' : $this.data();
			e.preventDefault();
			$(target).classToggle(option);
		})	
	});
	
}(window.jQuery);
