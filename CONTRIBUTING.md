# Contributing to the jQuery Plugins

Firstly:

-   Four spaces, no tabs.
-   Empty line at end of file.
-   Stick to existing conventions.

If you'd like to contribute to the jQuery Plugins, you'll need to fork the repo first. Once you've created a fork, 
create a branch based on `master`. If you're fixing a bug, please file an issue first so that you and I can track the fix with a commit.

Next, create a branch. It helps if you include the issue number in your contribution's branch name. If your 
contribution is based on issue 12, for example, you'd create the following branch:

-   For bugfixes:  
    `git branch bugfix/master/12_name_of_bugfix master`  
    `git checkout bugfix/master/12_name_of_bugfix`
    
-   For new features:  
    `git branch feature/master/12_your_contribution master`  
    `git checkout feature/master/12_your_contribution`

**Please avoid working directly on the `master` branch.**

Keep all commits as small as possible - more smaller commits are preferable over a single large commit. If you keep 
your commits to a single unit of functionality or single bug fix, that will work nicely.

Push all your commits to your branch in your fork of the repository, and submit a pull request.

Finally, thank you for taking the time to contribute - it really is appreciated.
