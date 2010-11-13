var FlashHeed = (function(window) {
    
    var document = window.document;
    
    var gsub = function(string, pattern, replacement) {
        var result = '', source = string, match;
        
        while (source.length > 0) {
            if (match = source.match(pattern)) {
                result += source.slice(0, match.index);
                result += replacement;
                source  = source.slice(match.index + match[0].length);
            } else {
                result += source, source = '';
            }
        }
        return result;
    };
    
    var heed = function(el) {
        if(el === undefined) var el = document;
        
        
        var objects = el.getElementsByTagName('object');
        var len = objects.length;
        var i;

        for(i = 0; i < len; i++) {
            var o = objects[i];
            var params = o.getElementsByTagName('param');
            var params_length = params.length;
            var embeds = o.getElementsByTagName('embed');
            var embed = null;
            if(embeds.length > 0) var embed = embeds[0];

            // Handle embed tag (for non-IE)
            if(embed) {
                // Need to set the embed wmode attribute
                // In this case, we need to remove and re-add the child node
                embed.setAttribute('wmode', 'transparent');
                var nx = embed.nextSibling, pn = embed.parentNode;
                pn.removeChild(embed);
                pn.insertBefore(embed, nx);
            }

            // Handle param tags (for IE)
            var found = false;
            var correct_wmode_found = false;

            for(var j = 0; j < params_length; j++) {
                if(params[j].name === 'wmode') {
                    if(/transparent/i.test(params[j].value) || /opaque/i.test(params[j].value)) {
                        // an existing wmode with "transparent" or "opaque" is found
                        // don't need to alter this object tag
                        correct_wmode_found = true;
                    }
                }
            }

            if(!correct_wmode_found) {
                var html = o.outerHTML;
                var nx = o.nextSibling, pn = o.parentNode;

                if(!found) {
                    // Do a string replacement for a window param that IE injects be default to the innerhtml
                    html = gsub(html, /<param name="wmode" value="window">/i, '');

                    // Add the correct transparent wmode param
                    html = gsub(html, /<\/object>/i, '<PARAM NAME="WMode" VALUE="Transparent"></object>');
                }

                // Totally remove the object tag from the dom
                pn.removeChild(o);

                // Add it to our new div, only to clobber it immediately.
                // This is the only way we've found to force IE to unrender the object.
                // We use a new container for this because you can't mess with the innerhtml
                // of an object tag. (throws a runtime error)
                var div = document.createElement("div");
                div.appendChild(o);
                div.innerHTML = '';

                // Update it with our new HTML that has the correct param tag
                div.innerHTML = html;

                // Finally, insert this new div back in the original spot
                pn.insertBefore(div, nx);
            }
        }
    }
    
    return {
        heed: heed
    }
})(window);
