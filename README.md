# jQuery Plugins

These jQuery plugins have been created to ease the pain that some front-end designers feel when they're trying to implement basic features with little or no JavaScript or jQuery experience.

I plan to add plugins to this repository over time that only require HTML code and the inclusion of the script in question, following the same kind of principles as the Twitter Bootstrap extensions, in so far that no coding experience should be required in order to make things work.

I shall improve this README file as time goes by.

## ClassToggle

ClassToggle toggles, on a target element, a single class on and off or between two classes.

At its most basic, you need two elements - your trigger and your target element. Your trigger element - usually an anchor, button or something else - must have some of the following attributes:

*	**`href`** *or* **`data-classtoggle-target`**
	So the trigger knows what to change the classes on
	
*	**`data-classtoggle-class`**
	The class which will be toggled on the target

*	**`data-classtoggle-altclass`** *(Optional)*
	The class which will be alternated with the main class
	
### Examples

**Toggling a single class using `data-classtoggle-class` only**

Using the code below:

```html
	<a href="#TargetElement" data-classtoggle-class="Highlighted">Turn .Highlighted on and off</a>
	<div id="ToggleTarget" class="Red">Target</div>
```

The anchor link will cause the target element to turn the class `.Highlighed` on and off.

**Toggling between two classes using `data-classtoggle-class` and `data-classtoggle-classalt`**

Using the code below:

```html
	<a href="#TargetElement" data-classtoggle-class="Red" data-classtoggle-altclass="Green">Toggle between Red and Green</a>
	<div id="ToggleTarget" class="Red">Target</div>
```

The anchor link will cause the target element to toggle between `.Red` and `.Green`.
