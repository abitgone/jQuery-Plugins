# Google Analytics Helper

**Notice: The Google Analytics Helper plugin has been tested and works with the beta 1 release of jQuery 2.0.**

The Google Analytics helper offers an easy way to track events and pageviews using data attributes.

The helper uses the following attributes to track events:

-   **data-gahelper-event** (required, string)
    The name of the event you'd like to track. Generally speaking, this should be a common definition o the type of user interaction on the element.

-   **data-gahelper-event-category** (required, string)
    The category of events that your event belongs to. This will serve to group the common event definitions you choose.

-   **data-gahelper-event-label** (string)
    An optional label used to further define your event. This can be used to track any additional information for the event you wish to track, such as the name of a video or a file download.

-   **data-gahelper-event-value** (integer)
    An optional value allowing you to track arbitrary numeric data against each event that is triggered.

-   **data-gahelper-event-noninteraction** (true or false)
    Allows you to specify whether or not the interaction that causes the event to be triggered will prevent a 'bounce' in Google Analytics.

To track pageviews, only a single attribute is required:

-   **data-gahelper-url** (required, string)
    The URL you wish to track. This should be site-relative and start with a forward slash.

[Further explanation and examples](http://abitgone.github.com/jQuery-Plugins/GAHelper) are available.
