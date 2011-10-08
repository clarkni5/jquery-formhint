/*
 * jQuery FormHint Plugin
 * Copyright 2011, Nicholas Clark
 * Licensed under the MIT license.
 */
 
(function($){
	$.fn.formHint = function(options) {
		var defaults = {
			"hintClassName": "hint"
		};
		var options = $.extend(defaults, options);
		
		var setHint = function(a) {
			if (a.val().length == 0 || a.val() == a.data("hint")) {
				a.val(a.data("hint")).addClass(options.hintClassName);
			}
		};

		var handleFocus = function(e) {
			var that = $(e.target);
			if (that.hasClass(options.hintClassName)) {
				that.removeClass(options.hintClassName).val("");
			}
		};
		
		var handleBlur = function(e) {
			var that = $(e.target);
			if (that.length > 0) {
				setHint(that);
			}
		};

		var handleSubmit = function(e) {
			// Remove the hint text from any field that has the css hint class name
			$("." + options.hintClassName, this).removeClass(options.hintClassName).val("");
		};

		return this.each(function() {
			$("input[type=text]", this).each(function() {
				var that = $(this);
				
				that.data("hint", that.attr("title"));
				that.attr("title", "");
				
				setHint(that);
				
				that.focus(handleFocus).blur(handleBlur);
			});
			
			// Before submitting a form, we need to remove the hint text
			$("form").each(function() {
				$(this).submit(handleSubmit);
			});
		});
	}
})(jQuery);