FlashHeed: Fix Flash Ads That Go Above Your Content
===================================================

Tired of flash ads (or other flash content) that ignore z-index and go over your DOM content on the page? Use FlashHeed to fix them.

The issue is that flash elements that don't specify a `wmode`, or set `wmode` to `window` will not preserve stacking order on your webpage. In fact, they will go above any content, no matter what kind of z-index voodoo you try.

This problem is easy to solve if you deliver and own the flash content: just stick `<param name="wmode" value="transparent">` in your object tag and set `wmode="transparent"` in your embed tags and you're good to go. But, what if you cannot alter the flash server-side? This is a common problem with flash ads, like Google AdSense.

For these situation, FlashHeed will dynamically add these paramters, taking into account various browser quirks.

Compatibility
-------------

FlashHeed has been tested in Firefox 3, Safari 5, Chrome 7, IE6, IE7, and IE8. In other words, it should work in most major browsers.

Usage
-----

FlashHeed has no dependencies. Just include the script in your webpage (preferably in the `<head>`):

`<script type="text/javascript" src="flash_heed.js"></script>`

A `FlashHeed` object will now be available.

It currently has one method: `heed`. Call it without any arguments like so:

`FlashHeed.heed();`

And it will fix up all the flash elements on a page. Or, you can pass in a scope, and it will only fix ads that are children of that DOM node:

`FlashHeed.heed(document.getElementById('container'));`

Of course, you should probably call this method onDomLoad.

That's it! Never again will your drop down menus and lightboxes be terrorized by flash ads!