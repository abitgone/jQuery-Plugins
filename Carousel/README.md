# Carousel

Carousel takes simple HTML- and CSS-only carousels and progressively enhances them with features such as page lists, scrolling, class-toggling, timers, timer offsets as well as touch and keyboard events. By following a basic HTML pattern and using some basic CSS, your carousels will also work, to a degree, without JavaScript enabled.

Your carousels can be extended using the following attributes:

-   **data-carousel-style** (default: horizontal)  
    Sets the style of the carousel. Valid values are *horizontal* (default), *vertical* and *class-only*. If you're planning to support clients without JavaScript, you should also add the `.carousel-horizontal`, `.carousel-vertical` or `.carousel-classonly` classes to your carousels as appropriate.
    
-   **data-carousel-pagelist**  
    Adds a page list to the carousel container, containing links to each item.
    
-   **data-carousel-timer="10000"** (milliseconds)  
    Automatically cycles the carousel through the items every 10000 milliseconds (10 seconds). The timer is automatically paused when hovering over or touching the carousel, and resumed when leaving or releasing.
    
-   **data-carousel-timer-delay="2000"** (milliseconds)  
    Adds a 2000 millisecond (2 second) delay to the first cycle.
    
-   **data-carousel-timer-nopause**  
    Prevents the carousel from pausing on hover or touch events.
    
-   **data-carousel-notouch**  
    Prevents the carousel from responding to touch events. (Implied if there are no pagers.)
    
-   **data-carousel-nokeyboard**  
    Prevents the carousel from responding to keyboard events. (Implied if there are no pagers.)
    
[Some examples](http://abitgone.github.com/jQuery-Plugins/Carousel) are available.
