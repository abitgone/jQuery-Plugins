/*
    abitgone-carousel.js
    =======================
    Carousel progressively enhances HTML- and CSS- only carousels.
    
    For information on how to use this plugin and for code examples, visit 
    http://abitgone.github.com/jQuery-Plugins/Carousel
    
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
!function(jQuery) {
    
    // Carousel Public Class Definition
    var abg_Carousel = function(element, options) {
        
        this.element = $(element);
        this.options = $.extend({}, $.fn.abg_carousel.defaults, options);
        
        if (this.options.parent) {
            this.$parent = $(this.options.parent);
        }
        
        this.options.abg_carousel && this.abg_carousel();
        
    }
    
    abg_Carousel.prototype = {
        
        constructor: abg_Carousel,
        
        initialise: function(option){
            
            var $carousel = this.element;
            this.$carousel = $carousel;
            this.carousel = $carousel[0];
            
            var $pagers = $carousel.find("[data-carousel-item] [data-carousel-pager]"),
                $pager_prev,
                $pager_next,
                no_pagers = $pagers.length == 0;
                          
            if (!no_pagers) {
                // Clone the first prev/next pagers and repurpose them
                $pager_prev = $($carousel.find("[data-carousel-item] .pager-prev")[0]).clone();
                $pager_next = $($carousel.find("[data-carousel-item] .pager-next")[0]).clone();
                $pager_prev[0].href = "#";
                $pager_next[0].href = "#";
                $pager_prev.on('click', { increment: -1 }, $.proxy(this.move, this));
                $pager_next.on('click', { increment: 1 }, $.proxy(this.move, this));
                $carousel.append($pager_prev);
                $carousel.append($pager_next)

                // Remove the HTML/CSS only pagers
                $pagers.remove();
            }
            
            var $items = $carousel.find("[data-carousel-item]");
            this.$items = $items;
            var items = $items.length;
            this.items = items;
            var $container = $carousel.find("[data-carousel-items]");
            this.$container = $container;
            
            // Set up the carousel
            var lock_x = 0,
                lock_y = 0,
                carousel_style;
              
            this.carousel_style = !$carousel.is("[data-carousel-style]") ? "horizontal" : $carousel.attr("data-carousel-style");
            
            switch(this.carousel_style) {
                case "vertical":
                    $carousel.addClass("carousel-vertical");
                    this.lock_x = 1;
                    this.lock_y = 0;
                    break;
                case "class-only":
                    $carousel.addClass("carousel-classonly");
                    if (!$carousel.is("[data-carousel-noabsolute-items]")) {
                        $container.css('position', 'relative');
                        $items.each(function() { 
                            $(this).css('position', 'absolute').css('top', '0').css('left', '0').css('width', '100%');
                        });
                    }
                    this.lock_x = 0;
                    this.lock_y = 0;
                    break;
                default: 
                    $carousel.addClass("carousel-horizontal");
                    $container.height('100%');
                    $container.width(items*100 + '%');
                    $items.width(100/items + '%');
                    this.lock_x = 0;
                    this.lock_y = 1;
                    break;
            }
                                        
            // Set some data that we'll use throughout 
            $carousel.attr("data-carousel-items", items);
            $carousel.attr("data-carousel-item", 0);
            
            // Keyboard Events
            if (!$carousel.is("[data-carousel-nokeyboard]") && !no_pagers) {
                $carousel.attr("tabindex", "0");
                $carousel.on('keydown', $.proxy(this.keydown, this));
                $carousel.on('keyup', $.proxy(this.keymove, this));
            }
            
            // Touch Events
            var touch_origin_x,
                touch_origin_y,
                touch_element_width = 0,
                touch_element_height = 0,
                touch_distance_x_px,
                touch_distance_y_px,
                touch_distance_x_pc,
                touch_distance_y_pc,
                touch_started_time,
                touch_ended_time,
                touch_duration = 0,
                touch_itemindex;
              
            // If data-carousel-notouch is set, or no pagers are present, don't enable touch events.
            if (!$carousel.is("[data-carousel-notouch]") && !no_pagers) {
                $carousel.on('touchstart', $.proxy(this.touchstart, this));
                $carousel.on('touchmove', $.proxy(this.touchmove, this));
                $carousel.on('touchend', $.proxy(this.touchend, this));
            }
            
            // Automatic Progression
            if ($carousel.is("[data-carousel-timer]")) {
                if(!$carousel.is("[data-carousel-timer-nopause]")) {
                    $carousel.on('mouseenter touchstart focus', $.proxy(this.pause, this));
                    $carousel.on('mouseleave touchend blur', $.proxy(this.resume, this));
                }
                $carousel.abg_carousel('resume');
            }
            
            // Page List
            if ($carousel.is("[data-carousel-pagelist]")) {
                var $pagelist = $("<table class=\"carousel-pagelist\"><tr><td><ul class=\"carousel-pages\"></ul></td></tr></table>");
                for (var i=0; i < items; i++) {
                    var $new_pager = $("<li><a href=\"#\"><span>" + (i+1) + "</span></a></li>");
                    $new_pager.on('click', { item_index: i }, $.proxy(this.move_to, this));
                    $pagelist.find("ul").append($new_pager);
                }
                $carousel.append($pagelist);
                $($carousel.find("ul.carousel-pages li")[0]).addClass("active-page");
            }
            
            // Add .active-item to first item
            $($items[0]).addClass("active-item");
            $carousel.addClass("carousel-item-0");
            
            $carousel.addClass("carousel-ready");
            
      , post_initialise: function(){

            // Handle instances where people have linked to a specific carousel item within the carousel
            // using a URL hash fragment. Doing so breaks the carousel. This resets it.
            // 
            // Thanks to Andrej2 for reporting this:
            // https://github.com/abitgone/jQuery-Plugins/issues/10

            if (this.carousel.scrollLeft != 0 ||
                this.carousel.scrollTop != 0) {
                this.carousel.scrollLeft = 0;
                this.carousel.scrollTop = 0;
            }

        }
      , touchstart: function(e) {
            var touch = e.originalEvent.touches[0];
            this.touch_origin_x = touch.clientX;
            this.touch_origin_y = touch.clientY;
            this.touch_distance_x_px = 0;
            this.touch_distance_y_px = 0;
            this.touch_distance_x_pc = 0;
            this.touch_distance_y_pc = 0;
            this.touch_element_width = this.carousel.clientWidth;
            this.touch_element_height = this.carousel.clientHeight;
            this.touch_started_time = new Date().getTime();
            this.touch_itemindex = parseInt(this.$carousel.attr("data-carousel-item"));
            this.touch_itemcount = parseInt(this.$carousel.attr("data-carousel-items"))-1;
        },
        touchmove: function(e) {
            var touch = e.originalEvent.touches[0];
            this.touch_duration = (new Date().getTime() - this.touch_started_time)/1000;
            
            this.touch_distance_x_px = touch.clientX - this.touch_origin_x;
            this.touch_distance_y_px = touch.clientY - this.touch_origin_y;
            this.touch_distance_x_pc = (this.touch_distance_x_px/this.touch_element_width)*Math.abs(this.lock_x - 1);
            this.touch_distance_y_pc = (this.touch_distance_y_px/this.touch_element_height)*Math.abs(this.lock_y - 1);
                                                
            e.preventDefault();
        },
        touchend: function(e) {
            this.touch_ended_time = new Date().getTime();
            this.touch_duration = (this.touch_ended_time - this.touch_started_time)/1000;
            var touch_movement = !!this.touch_distance_x_pc || !!this.touch_distance_y_pc;
            var result_x = Math.max(-1, Math.min(1, this.touch_distance_x_pc/Math.min(1, this.touch_duration))),
                result_y = Math.max(-1, Math.min(1, this.touch_distance_y_pc/Math.min(1, this.touch_duration))),
                result = result_x + result_y;
            var result_x_rounded = Math.round(result_x),
                result_y_rounded = Math.round(result_y),
                result_rounded = Math.round(result);
                        
            var item_index = this.touch_itemindex;
                        
            switch(this.carousel_style) {
                case "horizontal":
                    if (result_x_rounded != 0) {
                        item_index = (item_index + result_x_rounded*-1) % (this.touch_itemcount + 1);
                        item_index = item_index < 0 ? this.touch_itemcount : item_index;
                        this.change_position(this.$carousel, this.$items, item_index);
                    }
                break;
                case "vertical":
                    if (result_y_rounded != 0) {
                        item_index = (item_index + result_y_rounded*-1) % (this.touch_itemcount + 1);
                        item_index = item_index < 0 ? this.touch_itemcount : item_index;
                        this.change_position(this.$carousel, this.$items, item_index);
                    }
                break;
                case "class-only":
                    if (result_rounded != 0) {
                        item_index = (item_index + result_rounded*-1) % (this.touch_itemcount + 1);
                        item_index = item_index < 0 ? this.touch_itemcount : item_index;
                        this.change_position(this.$carousel, this.$items, item_index);
                    }
                break;
            }
            
            var $carousel = $(e.target).parents('[data-carousel]');
        },
        change_position: function($carousel, $items, item_index) {
            
            var $container = $carousel.find("[data-carousel-items]");
            var currentItemIndex = parseInt($carousel.attr("data-carousel-item"));
            
            $items.removeClass("active-item");
            $carousel.removeClass("carousel-item-" + currentItemIndex);
            $carousel.addClass("carousel-item-" + item_index);
            $($items[item_index]).addClass("active-item");
            $carousel.attr("data-carousel-item", item_index);
            switch($carousel.attr("data-carousel-style")) {
                case "vertical":
                    $container.css("top", "-" + item_index*100 + "%");
                    break;
                case "class-only":
                    break;
                default: 
                    $container.css("left", "-" + item_index*100 + "%");
                    break;
            }
            
            if ($carousel.is("[data-carousel-pagelist]")) {
                $carousel_pages = $carousel.find("ul.carousel-pages li");
                $carousel_pages.removeClass("active-page");
                $($carousel_pages[item_index]).addClass("active-page");
            }
        },
        keydown: function (e) {
            if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40) e.preventDefault()
            else return;
        },
        keymove: function (e) {
            var $carousel = this.$carousel;
            var $items = this.$items;
            
            var item_index = parseInt($carousel.attr("data-carousel-item")),
                item_count = parseInt($carousel.attr("data-carousel-items")),
                item_index_increment;
            
            if ((e.keyCode == 37 && this.lock_x == 0) || (e.keyCode == 38 && this.lock_y == 0)) 
                item_index_increment = -1
            else if ((e.keyCode == 39 && this.lock_x == 0) || (e.keyCode == 40 && this.lock_y == 0))
                item_index_increment = 1
            else return;
            
            e.preventDefault();
            item_index = (item_index + item_index_increment) % item_count;
            item_index = item_index < 0 ? (item_count - 1) : item_index;
            this.change_position($carousel, $items, item_index);
        },
        move: function(e) {
                    
            var $carousel = $(e.target).parents('[data-carousel]');
            var $items = $carousel.find("[data-carousel-item]");        
            var item_index = parseInt($carousel.attr("data-carousel-item")),
                item_count = parseInt($carousel.attr("data-carousel-items")),
                item_index_increment = e.data.increment;
            
            item_index = (item_index + item_index_increment) % item_count;
            item_index = item_index < 0 ? (item_count - 1) : item_index;
            this.change_position($carousel, $items, item_index);
            e.preventDefault();
            
        },
        move_to: function(e) {
            
            var $carousel = $(e.target).parents('[data-carousel]');
            var $items = $carousel.find("[data-carousel-item]");
            this.change_position($carousel, $items, e.data.item_index)
            e.preventDefault();
            
        },
        cycle: function(e) {
            
            var $carousel = $(this.element);
            var $items = $carousel.find("[data-carousel-item]");
            var item_index = parseInt($carousel.attr("data-carousel-item")),
                item_count = parseInt($carousel.attr("data-carousel-items"));
            
            if ($carousel.attr("data-carousel-interval-id") !== undefined) {
                intervalId = parseInt($carousel.attr("data-carousel-interval-id"));
                window.clearTimeout(parseInt($carousel.attr("data-carousel-interval-id")));
            }
                        
            item_index = (item_index + 1) % item_count;
            item_index = item_index < 0 ? (item_count - 1) : item_index;
            this.change_position($carousel, $items, item_index);
            
            var carousel_timer = parseInt($carousel.attr("data-carousel-timer"));
            timeoutId = window.setTimeout(function() {$carousel.abg_carousel('cycle')}, carousel_timer);
            $carousel.attr("data-carousel-interval-id", timeoutId);
            
        },
        pause: function(e) {
            
            var $carousel = $(this.element);
            $carousel.removeClass("carousel-waiting");
            if ($carousel.attr("data-carousel-interval-id") !== undefined) {
                timeoutId = parseInt($carousel.attr("data-carousel-interval-id"));
                window.clearTimeout(parseInt($carousel.attr("data-carousel-interval-id")));
            }
            $carousel.addClass("carousel-paused");
            
        },
        resume: function() {
            
            var $carousel = $(this.element);
            $carousel.removeClass("carousel-paused");
            
            var carousel_timer = parseInt($carousel.attr("data-carousel-timer"));
            if ($carousel.is("[data-carousel-timer-delay]")) {
                carousel_timer += parseInt($carousel.attr("data-carousel-timer-delay"));
                $carousel.removeAttr("data-carousel-timer-delay");
            }
            
            timeoutId = window.setTimeout(function() {$carousel.abg_carousel('cycle')}, carousel_timer);
            $carousel.attr("data-carousel-interval-id", timeoutId);
            
        }
    }
    
    // Carousel Plugin definition
    $.fn.abg_carousel = function(option, action) {
        return this.each(function() {
            var $this = $(this),
                data = $this.data('carousel'),
                options = typeof option == 'object' && option;
            if (!data) $this.data('carousel', (data = new abg_Carousel(this, options)));
            if (typeof option == 'string') data[option](action);
        });
    }
    
    $.fn.abg_carousel.defaults = {
        carousel: true
    }
    
    $.fn.abg_carousel.Constructor = abg_Carousel;
    
    // Carousel Data-Api
    $(function() {
        $("[data-carousel]").abg_carousel('initialise');
        window.setTimeout(
            function () {
                $("[data-carousel]").abg_carousel('post_initialise');
            },
            0
        );
    });
    
}(window.jQuery);
