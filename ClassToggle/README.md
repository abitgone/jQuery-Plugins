# ClassToggle

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
    
-   **data-classtoggle-showtarget**
    With no value, will causes the target to be brought into the browser's viewport, if it isn't already visible, 
    by way of calling `target.scrollIntoView()` on the target, or the first of the targets if more than one target 
    is specified.
 
[Some examples](http://abitgone.github.com/jQuery-Plugins/ClassToggle) are available.
