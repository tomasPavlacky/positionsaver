/*
PositionSaver v1.0
Release Date: April 24, 2012

Copyright (c) 2012 Tomáš Pavlacký

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
 */
;
(function($) {
	$.fn.savePosition = function(options) {
            var name = location.protocol + '//' + location.host + location.pathname;
            var selectors = this;
            position.construct(selectors, name);
	}

	var position = {
        name:null,
        /*
        * string selectors
        * string name
        **/
        construct: function(selectors, name){
            position.name = name;

            $(selectors).click(function(){
                position.set();
            });
            position.move();
        },

        set: function(){
            $.cookie(position.name, $(window).scrollTop());
            return false;
        },
        get: function(){
            return $.cookie(position.name);               
        } , 
        exist: function(){
            if(position.get() >= 0) return true;
            return false;
        },
        existReferrer:  function(){
            if(document.referrer != 0) return true;
            return false;
        },
        urlWithoutParams: function(url){
            if (url.indexOf("?") > -1) url = url.substr(0,url.indexOf("?"));
            
            return url;
        },
        isSameReferrerAsCurrent: function(){
            var referrer = position.urlWithoutParams(document.referrer);
            var current = position.name;
            
            if(position.existReferrer() && current.indexOf(referrer) != -1)
                return true;
            return false;
        },
        move: function(){
            
            if(position.exist() && position.isSameReferrerAsCurrent()) $(window).scrollTop(position.get());
            else position.set();
        }
    };

})(jQuery);
