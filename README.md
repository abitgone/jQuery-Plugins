# jQuery Plugins

These jQuery plugins have been created to ease the pain that some front-end designers feel when they're trying to implement basic features with little or no JavaScript or jQuery experience.

I plan to add plugins to this repository over time that only require HTML code, data-* attributes, and the inclusion of the script in question, following the same kind of principles as the Twitter Bootstrap extensions, in so far that no coding experience should be required in order to make things work.

I shall improve this README file as time goes by.

## Carousel

Carousel takes simple HTML- and CSS-only carousels and progressively enhances them with features such as page lists, scrolling, class-toggling, timers, timer offsets and touch events. By following a basic HTML pattern and using some basic CSS, your carousels will also work, to a degree, without JavaScript enabled.

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
    Prevents the carousel from responding to touch events.
    
[Some examples](http://abitgone.github.com/jQuery-Plugins/Carousel) are available.

## ClassToggle

ClassToggle toggles, on a target element, a single class on and off or between two classes.

As a bare minimum, your trigger element must have the following attributes:

-   **href** (for anchors) or **data-classtoggle-target**  
    This specifies the target element
    
-   **data-classtoggle-class**  
    The class to be toggled, on and off, by the trigger
     
Additionally, you may specify the following additional class names:

-   **data-classtoggle-altclass**  
    The class you'd like to alternate with the main class. For example, data-classtoggle-class="Red"
    and data-classtoggle-altclass="Green" will alternate the .Red and .Green classes each time the
    trigger element is activated.
    
-   **data-classtoggle-trigger-activeclass**  
    Specifies a class to be added to the trigger when it activates the ClassToggle.
    
-   **data-classtoggle-trigger-selector**  
    Specifies a jQuery selector which data-classtoggle-trigger-activeclass will be toggled on when
    the trigger elements are activated. Useful if you have more than one trigger which could
    trigger the target element.
 
[Some examples](http://abitgone.github.com/jQuery-Plugins/ClassToggle) are available.
