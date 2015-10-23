/*!
 * modernizr v3.1.0
 * Build http://modernizr.com/download?-adownload-ambientlight-apng-applicationcache-audio-backdropfilter-backgroundsize-batteryapi-beacon-bgpositionshorthand-blobconstructor-bloburls-borderradius-canvas-canvastext-capture-contenteditable-contextmenu-cookies-cors-cryptography-cssall-csscalc-csscolumns-cssexunit-csspositionsticky-cssreflections-cssresize-cssvalid-cssvminunit-customevent-customprotocolhandler-dart-datachannel-datalistelem-dataset-datauri-dataview-dataworkers-devicemotion_deviceorientation-directory-displaytable-emoji-es5array-es5function-es5object-es5string-es5undefined-es6array-es6math-es6object-eventlistener-eventsource-exiforientation-fetch-filesystem-flash-flexboxlegacy-fontface-formattribute-framed-fullscreen-gamepads-generators-geolocation-hashchange-hiddenscroll-history-hsla-htmlimports-ie8compat-indexeddb-indexeddbblob-inlinesvg-input-inputformaction-inputformenctype-inputformtarget-inputtypes-intl-jpeg2000-json-lastchild-localstorage-matchmedia-mathml-microdata-multiplebgs-olreversed-oninput-opacity-peerconnection-performance-picture-placeholder-postmessage-preserve3d-promises-quotamanagement-requestautocomplete-sandbox-scriptasync-scriptdefer-seamless-search-shapes-sharedworkers-sizes-smil-speechsynthesis-srcset-strictmode-stylescoped-supports-svg-svgclippaths-svgfilters-template-textshadow-time-todataurljpeg_todataurlpng_todataurlwebp-typedarrays-unknownelements-userdata-videoautoplay-videoloop-vml-webaudio-webgl-webglextensions-webpanimation-webplossless_webp_lossless-websocketsbinary-websqldatabase-webworkers-wrapflow-xhrresponsetype-xhrresponsetypeblob-xhrresponsetypedocument-xhrresponsetypetext-dontmin-cssclassprefix:no
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */

/*
 * Modernizr tests which native CSS3 and HTML5 features are available in the
 * current UA and makes the results available to you in two ways: as properties on
 * a global `Modernizr` object, and as classes on the `<html>` element. This
 * information allows you to progressively enhance your pages with a granular level
 * of control over the experience.
*/

;(function(window, document, undefined){;
define("test/network/beacon", function(){});


	/**
	 * http://mathiasbynens.be/notes/xhr-responsetype-json#comment-4
	 *
	 * @access private
	 * @function testXhrType
	 * @param {string} type - String name of the XHR type you want to detect
	 * @returns {boolean}
	 * @author Mathias Bynens
	 */

	/* istanbul ignore next */
	var testXhrType = function(type) {
		if (typeof XMLHttpRequest == 'undefined') {
			return false;
		}
		var xhr = new XMLHttpRequest();
		xhr.open('get', '/', true);
		try {
			xhr.responseType = type;
		} catch (error) {
			return false;
		}
		return 'response' in xhr && xhr.responseType == type;
	};


/*!
{
	"name": "XHR responseType='document'",
	"property": "xhrresponsetypedocument",
	"tags": ["network"],
	"notes": [{
		"name": "XMLHttpRequest Living Standard",
		"href": "http://xhr.spec.whatwg.org/#the-responsetype-attribute"
	}]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='document'.
*/

	Modernizr.addTest('xhrresponsetypedocument', testXhrType('document'));

/*!
{
	"name": "XHR responseType='blob'",
	"property": "xhrresponsetypeblob",
	"tags": ["network"],
	"notes": [{
		"name": "XMLHttpRequest Living Standard",
		"href": "http://xhr.spec.whatwg.org/#the-responsetype-attribute"
	}]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='blob'.
*/

	Modernizr.addTest('xhrresponsetypeblob', testXhrType('blob'));

/*!
{
	"name": "XHR responseType='text'",
	"property": "xhrresponsetypetext",
	"tags": ["network"],
	"notes": [{
		"name": "XMLHttpRequest Living Standard",
		"href": "http://xhr.spec.whatwg.org/#the-responsetype-attribute"
	}]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType='text'.
*/

	Modernizr.addTest('xhrresponsetypetext', testXhrType('text'));


	/**
	 * Object.prototype.toString can be used with every object and allows you to
	 * get its class easily. Abstracting it off of an object prevents situations
	 * where the toString property has been overridden
	 *
	 * @access private
	 * @function toStringFn
	 * @returns {function} An abstracted toString function
	 */

	var toStringFn = ({}).toString;

/*!
{
	"name": "SVG clip paths",
	"property": "svgclippaths",
	"tags": ["svg"],
	"notes": [{
		"name": "Demo",
		"href": "http://srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.svg"
	}]
}
!*/
/* DOC
Detects support for clip paths in SVG (only, not on HTML content).

See [this discussion](http://github.com/Modernizr/Modernizr/issues/213) regarding applying SVG clip paths to HTML content.
*/

	Modernizr.addTest('svgclippaths', function() {
		return !!document.createElementNS &&
			/SVGClipPath/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'clipPath')));
	});

/*!
{
	"name": "SVG SMIL animation",
	"property": "smil",
	"caniuse": "svg-smil",
	"tags": ["svg"],
	"notes": [{
	"name": "W3C Synchronised Multimedia spec",
	"href": "http://www.w3.org/AudioVideo/"
	}]
}
!*/

	// SVG SMIL animation
	Modernizr.addTest('smil', function() {
		return !!document.createElementNS &&
			/SVGAnimate/.test(toStringFn.call(document.createElementNS('http://www.w3.org/2000/svg', 'animate')));
	});

/*!
{
	"name": "HTML5 Video",
	"property": "video",
	"caniuse": "video",
	"tags": ["html5"],
	"knownBugs": [
		"Without QuickTime, `Modernizr.video.h264` will be `undefined`; http://github.com/Modernizr/Modernizr/issues/546"
	],
	"polyfills": [
		"html5media",
		"mediaelementjs",
		"sublimevideo",
		"videojs",
		"leanbackplayer",
		"videoforeverybody"
	]
}
!*/
/* DOC
Detects support for the video element, as well as testing what types of content it supports.

Subproperties are provided to describe support for `ogg`, `h264` and `webm` formats, e.g.:

```javascript
Modernizr.video         // true
Modernizr.video.ogg     // 'probably'
```
*/

	// Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	//                     thx to NielsLeenheer and zcorpan

	// Note: in some older browsers, "no" was a return value instead of empty string.
	//   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	//   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5

	Modernizr.addTest('video', function() {
		/* jshint -W053 */
		var elem = createElement('video');
		var bool = false;

		// IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #224
		try {
			if (bool = !!elem.canPlayType) {
				bool = new Boolean(bool);
				bool.ogg = elem.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, '');

				// Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/546
				bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, '');

				bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, '');

				bool.vp9 = elem.canPlayType('video/webm; codecs="vp9"').replace(/^no$/, '');

				bool.hls = elem.canPlayType('application/x-mpegURL; codecs="avc1.42E01E"').replace(/^no$/, '');
			}
		} catch (e) {}

		return bool;
	});

/*!
{
	"name": "Video Autoplay",
	"property": "videoautoplay",
	"tags": ["video"],
	"async" : true,
	"warnings": ["This test is very large – only include it if you absolutely need it"],
	"knownBugs": ["crashes with an alert on iOS7 when added to homescreen"]
}
!*/
/* DOC
Checks for support of the autoplay attribute of the video element.
*/


	Modernizr.addAsyncTest(function() {
		var timeout;
		var waitTime = 300;
		var elem = createElement('video');
		var elemStyle = elem.style;

		function testAutoplay(arg) {
			clearTimeout(timeout);
			elem.removeEventListener('playing', testAutoplay, false);
			addTest('videoautoplay', arg && arg.type === 'playing' || elem.currentTime !== 0);
			elem.parentNode.removeChild(elem);
		}

		//skip the test if video itself, or the autoplay
		//element on it isn't supported
		if (!Modernizr.video || !('autoplay' in elem)) {
			addTest('videoautoplay', false);
			return;
		}

		elemStyle.position = 'absolute';
		elemStyle.height = 0;
		elemStyle.width = 0;

		try {
			if (Modernizr.video.ogg) {
				elem.src = 'data:video/ogg;base64,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';
			}
			else if (Modernizr.video.h264) {
				elem.src = 'data:video/mp4;base64,AAAAHGZ0eXBtcDQyAAAAAG1wNDJpc29tYXZjMQAAAz5tb292AAAAbG12aGQAAAAAzaNacc2jWnEAAV+QAAFfkAABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAGGlvZHMAAAAAEICAgAcAT////3//AAACQ3RyYWsAAABcdGtoZAAAAAHNo1pxzaNacQAAAAEAAAAAAAFfkAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAEAAAABAAAAAAAd9tZGlhAAAAIG1kaGQAAAAAzaNacc2jWnEAAV+QAAFfkFXEAAAAAAAhaGRscgAAAAAAAAAAdmlkZQAAAAAAAAAAAAAAAAAAAAGWbWluZgAAABR2bWhkAAAAAQAAAAAAAAAAAAAAJGRpbmYAAAAcZHJlZgAAAAAAAAABAAAADHVybCAAAAABAAABVnN0YmwAAACpc3RzZAAAAAAAAAABAAAAmWF2YzEAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAEAAQAEgAAABIAAAAAAAAAAEOSlZUL0FWQyBDb2RpbmcAAAAAAAAAAAAAAAAAAAAAAAAY//8AAAAxYXZjQwH0AAr/4QAZZ/QACq609NQYBBkAAAMAAQAAAwAKjxImoAEABWjOAa8gAAAAEmNvbHJuY2xjAAYAAQAGAAAAGHN0dHMAAAAAAAAAAQAAAAUAAEZQAAAAKHN0c3oAAAAAAAAAAAAAAAUAAAIqAAAACAAAAAgAAAAIAAAACAAAAChzdHNjAAAAAAAAAAIAAAABAAAABAAAAAEAAAACAAAAAQAAAAEAAAAYc3RjbwAAAAAAAAACAAADYgAABaQAAAAUc3RzcwAAAAAAAAABAAAAAQAAABFzZHRwAAAAAAREREREAAAAb3VkdGEAAABnbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcgAAAAAAAAAAAAAAAAAAAAA6aWxzdAAAADKpdG9vAAAAKmRhdGEAAAABAAAAAEhhbmRCcmFrZSAwLjkuOCAyMDEyMDcxODAwAAACUm1kYXQAAAHkBgX/4NxF6b3m2Ui3lizYINkj7u94MjY0IC0gY29yZSAxMjAgLSBILjI2NC9NUEVHLTQgQVZDIGNvZGVjIC0gQ29weWxlZnQgMjAwMy0yMDExIC0gaHR0cDovL3d3dy52aWRlb2xhbi5vcmcveDI2NC5odG1sIC0gb3B0aW9uczogY2FiYWM9MCByZWY9MSBkZWJsb2NrPTE6MDowIGFuYWx5c2U9MHgxOjAgbWU9ZXNhIHN1Ym1lPTkgcHN5PTAgbWl4ZWRfcmVmPTAgbWVfcmFuZ2U9NCBjaHJvbWFfbWU9MSB0cmVsbGlzPTAgOHg4ZGN0PTAgY3FtPTAgZGVhZHpvbmU9MjEsMTEgZmFzdF9wc2tpcD0wIGNocm9tYV9xcF9vZmZzZXQ9MCB0aHJlYWRzPTYgc2xpY2VkX3RocmVhZHM9MCBucj0wIGRlY2ltYXRlPTEgaW50ZXJsYWNlZD0wIGJsdXJheV9jb21wYXQ9MCBjb25zdHJhaW5lZF9pbnRyYT0wIGJmcmFtZXM9MCB3ZWlnaHRwPTAga2V5aW50PTUwIGtleWludF9taW49NSBzY2VuZWN1dD00MCBpbnRyYV9yZWZyZXNoPTAgcmM9Y3FwIG1idHJlZT0wIHFwPTAAgAAAAD5liISscR8A+E4ACAACFoAAITAAAgsAAPgYCoKgoC+L4vi+KAvi+L4YfAEAACMzgABF9AAEUGUgABDJiXnf4AAAAARBmiKUAAAABEGaQpQAAAAEQZpilAAAAARBmoKU';
			}
			else {
				addTest('videoautoplay', false);
				return;
			}
		}

		catch (e) {
			addTest('videoautoplay', false);
			return;
		}

		elem.setAttribute('autoplay', '');
		elem.style.cssText = 'display:none';
		docElement.appendChild(elem);
		// wait for the next tick to add the listener, otherwise the element may
		// not have time to play in high load situations (e.g. the test suite)
		setTimeout(function() {
			elem.addEventListener('playing', testAutoplay, false);
			timeout = setTimeout(testAutoplay, waitTime);
		}, 0);
	});


	/**
	 *
	 * ModernizrProto is the constructor for Modernizr
	 *
	 * @class
	 * @access public
	 */

	var ModernizrProto = {
		// The current version, dummy
		_version: '3.1.0',

		// Any settings that don't work as separate modules
		// can go in here as configuration.
		_config: {
			'classPrefix' : "no",
			'enableClasses' : true,
			'enableJSClass' : true,
			'usePrefixes' : true
		},

		// Queue of tests
		_q: [],

		// Stub these for people who are listening
		on: function(test, cb) {
			// I don't really think people should do this, but we can
			// safe guard it a bit.
			// -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
			// This is in case people listen to synchronous tests. I would leave it out,
			// but the code to *disallow* sync tests in the real version of this
			// function is actually larger than this.
			var self = this;
			setTimeout(function() {
				cb(self[test]);
			}, 0);
		},

		addTest: function(name, fn, options) {
			tests.push({name : name, fn : fn, options : options});
		},

		addAsyncTest: function(fn) {
			tests.push({name : null, fn : fn});
		}
	};



	// Fake some of Object.create so we can force non test results to be non "own" properties.
	var Modernizr = function() {};
	Modernizr.prototype = ModernizrProto;

	// Leak modernizr globally when you `require` it rather than force it here.
	// Overwrite name so constructor name is nicer :D
	Modernizr = new Modernizr();


/*!
{
	"name": "Application Cache",
	"property": "applicationcache",
	"caniuse": "offline-apps",
	"tags": ["storage", "offline"],
	"notes": [{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en/docs/HTML/Using_the_application_cache"
	}],
	"polyfills": ["html5gears"]
}
!*/
/* DOC
Detects support for the Application Cache, for storing data to enable web-based applications run offline.

The API has been [heavily criticized](http://alistapart.com/article/application-cache-is-a-douchebag) and discussions are underway to address this.
*/

	Modernizr.addTest('applicationcache', 'applicationCache' in window);

/*!
{
	"name": "Blob constructor",
	"property": "blobconstructor",
	"aliases": ["blob-constructor"],
	"builderAliases": ["blob_constructor"],
	"caniuse": "blobbuilder",
	"notes": [{
		"name": "W3C spec",
		"href": "http://dev.w3.org/2006/webapi/FileAPI/#constructorBlob"
	}],
	"polyfills": ["blobjs"]
}
!*/
/* DOC
Detects support for the Blob constructor, for creating file-like objects of immutable, raw data.
*/

	Modernizr.addTest('blobconstructor', function() {
		try {
			return !!new Blob();
		} catch (e) {
			return false;
		}
	}, {
		aliases: ['blob-constructor']
	});

/*!
{
	"name": "Cookies",
	"property": "cookies",
	"tags": ["storage"],
	"authors": ["tauren"]
}
!*/
/* DOC
Detects whether cookie support is enabled.
*/

	// https://github.com/Modernizr/Modernizr/issues/191

	Modernizr.addTest('cookies', function() {
		// navigator.cookieEnabled cannot detect custom or nuanced cookie blocking
		// configurations. For example, when blocking cookies via the Advanced
		// Privacy Settings in IE9, it always returns true. And there have been
		// issues in the past with site-specific exceptions.
		// Don't rely on it.

		// try..catch because some in situations `document.cookie` is exposed but throws a
		// SecurityError if you try to access it; e.g. documents created from data URIs
		// or in sandboxed iframes (depending on flags/context)
		try {
			// Create cookie
			document.cookie = 'cookietest=1';
			var ret = document.cookie.indexOf('cookietest=') != -1;
			// Delete cookie
			document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
			return ret;
		}
		catch (e) {
			return false;
		}
	});

/*!
{
	"name": "Cross-Origin Resource Sharing",
	"property": "cors",
	"caniuse": "cors",
	"authors": ["Theodoor van Donge"],
	"notes": [{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS"
	}],
	"polyfills": ["pmxdr", "ppx", "flxhr"]
}
!*/
/* DOC
Detects support for Cross-Origin Resource Sharing: method of performing XMLHttpRequests across domains.
*/

	Modernizr.addTest('cors', 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());

/*!
{
	"name": "Custom protocol handler",
	"property": "customprotocolhandler",
	"authors": ["Ben Schwarz"],
	"builderAliases": ["custom_protocol_handler"],
	"notes": [{
		"name": "WHATWG overview",
		"href": "http://developers.whatwg.org/timers.html#custom-handlers"
	},{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/Web/API/navigator.registerProtocolHandler"
	}],
	"warnings": [],
	"polyfills": []
}
!*/
/* DOC
Detects support for the `window.registerProtocolHandler()` API to allow websites to register themselves as possible handlers for particular protocols.
*/

	Modernizr.addTest('customprotocolhandler', function() {
		// early bailout where it doesn't exist at all
		if (!navigator.registerProtocolHandler) {
			return false;
		}

		// registerProtocolHandler was stubbed in webkit for a while, and didn't
		// actually do anything. We intentionally set it improperly to test for
		// the proper sort of failure
		try {
			navigator.registerProtocolHandler('thisShouldFail');
		}
		catch (e) {
			return e instanceof TypeError;
		}

		return false;
	});

/*!
{
	"name": "CustomEvent",
	"property": "customevent",
	"tags": ["customevent"],
	"authors": ["Alberto Elias"],
	"notes": [{
		"name": "W3C DOM reference",
		"href": "http://www.w3.org/TR/DOM-Level-3-Events/#interface-CustomEvent"
	}, {
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en/docs/Web/API/CustomEvent"
	}],
	"polyfills": ["eventlistener"]
}
!*/
/* DOC

Detects support for CustomEvent.

*/

	Modernizr.addTest('customevent', 'CustomEvent' in window && typeof window.CustomEvent === 'function');

/*!
{
	"name": "DataView",
	"property": "dataview",
	"authors": ["Addy Osmani"],
	"builderAliases": ["dataview_api"],
	"notes": [{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView"
	}],
	"polyfills": ["jdataview"]
}
!*/
/* DOC
Detects support for the DataView interface for reading data from an ArrayBuffer as part of the Typed Array spec.
*/

	Modernizr.addTest('dataview', (typeof DataView !== 'undefined' && 'getFloat64' in DataView.prototype));

/*!
{
	"name": "Event Listener",
	"property": "eventlistener",
	"authors": ["Andrew Betts (@triblondon)"],
	"notes": [{
		"name": "W3C Spec",
		"href": "http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-Registration-interfaces"
	}],
	"polyfills": ["eventlistener"]
}
!*/
/* DOC
Detects native support for addEventListener
*/

	Modernizr.addTest('eventlistener', 'addEventListener' in window);

/*!
{
	"name": "Geolocation API",
	"property": "geolocation",
	"caniuse": "geolocation",
	"tags": ["media"],
	"notes": [{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/WebAPI/Using_geolocation"
	}],
	"polyfills": [
		"joshuabell-polyfill",
		"webshims",
		"geo-location-javascript",
		"geolocation-api-polyfill"
	]
}
!*/
/* DOC
Detects support for the Geolocation API for users to provide their location to web applications.
*/

	// geolocation is often considered a trivial feature detect...
	// Turns out, it's quite tricky to get right:
	//
	// Using !!navigator.geolocation does two things we don't want. It:
	//   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/513
	//   2. Disables page caching in WebKit: webk.it/43956
	//
	// Meanwhile, in Firefox < 8, an about:config setting could expose
	// a false positive that would throw an exception: bugzil.la/688158

	Modernizr.addTest('geolocation', 'geolocation' in navigator);

/*!
{
	"name": "History API",
	"property": "history",
	"caniuse": "history",
	"tags": ["history"],
	"authors": ["Hay Kranen", "Alexander Farkas"],
	"notes": [{
		"name": "W3C Spec",
		"href": "http://www.w3.org/TR/html51/browsers.html#the-history-interface"
	}, {
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
	}],
	"polyfills": ["historyjs", "html5historyapi"]
}
!*/
/* DOC
Detects support for the History API for manipulating the browser session history.
*/

	Modernizr.addTest('history', function() {
		// Issue #733
		// The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
		// Unfortunately support is really buggy and there is no clean way to detect
		// these bugs, so we fall back to a user agent sniff :(
		var ua = navigator.userAgent;

		// We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
		// itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
		if ((ua.indexOf('Android 2.') !== -1 ||
				(ua.indexOf('Android 4.0') !== -1)) &&
				ua.indexOf('Mobile Safari') !== -1 &&
				ua.indexOf('Chrome') === -1 &&
				ua.indexOf('Windows Phone') === -1) {
			return false;
		}

		// Return the regular check
		return (window.history && 'pushState' in window.history);
	});

/*!
{
	"name": "IE8 compat mode",
	"property": "ie8compat",
	"authors": ["Erich Ocean"]
}
!*/
/* DOC
Detects whether or not the current browser is IE8 in compatibility mode (i.e. acting as IE7).
*/

	// In this case, IE8 will be acting as IE7. You may choose to remove features in this case.

	// related:
	// james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/

	Modernizr.addTest('ie8compat', (!window.addEventListener && !!document.documentMode && document.documentMode === 7));

/*!
{
	"name": "JSON",
	"property": "json",
	"caniuse": "json",
	"notes": [{
		"name": "MDN documentation",
		"href": "http://developer.mozilla.org/en/JSON"
	}],
	"polyfills": ["json2"]
}
!*/
/* DOC
Detects native support for JSON handling functions.
*/

	// this will also succeed if you've loaded the JSON2.js polyfill ahead of time
	//   ... but that should be obvious. :)

	Modernizr.addTest('json', 'JSON' in window && 'parse' in JSON && 'stringify' in JSON);

/*!
{
	"name": "postMessage",
	"property": "postmessage",
	"caniuse": "x-doc-messaging",
	"notes": [{
		"name": "W3C Spec",
		"href": "http://www.w3.org/TR/html5/comms.html#posting-messages"
	}],
	"polyfills": ["easyxdm", "postmessage-jquery"]
}
!*/
/* DOC
Detects support for the `window.postMessage` protocol for cross-document messaging.
*/

	Modernizr.addTest('postmessage', 'postMessage' in window);

/*!
{
	"name": "SVG",
	"property": "svg",
	"caniuse": "svg",
	"tags": ["svg"],
	"authors": ["Erik Dahlstrom"],
	"polyfills": [
		"svgweb",
		"raphael",
		"amplesdk",
		"canvg",
		"svg-boilerplate",
		"sie",
		"dojogfx",
		"fabricjs"
	]
}
!*/
/* DOC
Detects support for SVG in `<embed>` or `<object>` elements.
*/

	Modernizr.addTest('svg', !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect);

/*!
{
	"name": "Typed arrays",
	"property": "typedarrays",
	"caniuse": "typedarrays",
	"tags": ["js"],
	"authors": ["Stanley Stuart (@fivetanley)"],
	"notes": [{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/JavaScript_typed_arrays"
	},{
		"name": "Kronos spec",
		"href": "http://www.khronos.org/registry/typedarray/specs/latest/"
	}],
	"polyfills": ["joshuabell-polyfill"]
}
!*/
/* DOC
Detects support for native binary data manipulation via Typed Arrays in JavaScript.

Does not check for DataView support; use `Modernizr.dataview` for that.
*/

	// Should fail in:
	// Internet Explorer <= 9
	// Firefox <= 3.6
	// Chrome <= 6.0
	// iOS Safari < 4.2
	// Safari < 5.1
	// Opera < 11.6
	// Opera Mini, <= 7.0
	// Android Browser < 4.0
	// Blackberry Browser < 10.0

	Modernizr.addTest('typedarrays', 'ArrayBuffer' in window);

/*!
{
	"name": "Web Audio API",
	"property": "webaudio",
	"caniuse": "audio-api",
	"polyfills": ["xaudiojs", "dynamicaudiojs", "audiolibjs"],
	"tags": ["audio", "media"],
	"builderAliases": ["audio_webaudio_api"],
	"authors": ["Addy Osmani"],
	"notes": [{
		"name": "W3 Specification",
		"href": "https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html"
	}]
}
!*/
/* DOC
Detects the older non standard webaudio API, (as opposed to the standards based AudioContext API)
*/

	Modernizr.addTest('webaudio', function() {
		var prefixed = 'webkitAudioContext' in window;
		var unprefixed = 'AudioContext' in window;

		if (Modernizr._config.usePrefixes) {
			return prefixed || unprefixed;
		}
		return unprefixed;
	});

/*!
{
	"name": "CSS Supports",
	"property": "supports",
	"caniuse": "css-featurequeries",
	"tags": ["css"],
	"builderAliases": ["css_supports"],
	"notes": [{
		"name": "W3 Spec",
		"href": "http://dev.w3.org/csswg/css3-conditional/#at-supports"
	},{
		"name": "Related Github Issue",
		"href": "github.com/Modernizr/Modernizr/issues/648"
	},{
		"name": "W3 Info",
		"href": "http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface"
	}]
}
!*/

	var newSyntax = 'CSS' in window && 'supports' in window.CSS;
	var oldSyntax = 'supportsCSS' in window;
	Modernizr.addTest('supports', newSyntax || oldSyntax);

/*!
{
	"name": "microdata",
	"property": "microdata",
	"tags": ["dom"],
	"builderAliases": ["dom_microdata"],
	"notes": [{
		"name": "W3 Spec",
		"href": "http://www.w3.org/TR/html5/microdata.html"
	}]
}
!*/

	Modernizr.addTest('microdata', 'getItems' in document);

/*!
{
	"name": "picture Element",
	"property": "picture",
	"tags": ["elem"],
	"authors": ["Scott Jehl", "Mat Marquis"],
	"notes": [{
		"name": "Specification",
		"href": "http://picture.responsiveimages.org"
	},{
		"name": "Relevant spec issue",
		"href": "https://github.com/ResponsiveImagesCG/picture-element/issues/87"
	}]
}
!*/

	Modernizr.addTest('picture', 'HTMLPictureElement' in window);

/*!
{
	"name": "ES5 Function",
	"property": "es5function",
	"notes": [{
		"name": "ECMAScript 5.1 Language Specification",
		"href": "http://www.ecma-international.org/ecma-262/5.1/"
	}],
	"polyfills": ["es5shim"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Function per specification.
*/

	Modernizr.addTest('es5function', function() {
		return !!(Function.prototype && Function.prototype.bind);
	});

/*!
{
	"name": "ES5 Strict Mode",
	"property": "strictmode",
	"caniuse": "sctrict-mode",
	"notes": [{
		"name": "ECMAScript 5.1 Language Specification",
		"href": "http://www.ecma-international.org/ecma-262/5.1/"
	}],
	"authors": ["@kangax"],
	"tags": ["es5"],
	"builderAliases": ["es5_strictmode"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Object strict mode.
*/

	Modernizr.addTest('strictmode', (function() {'use strict'; return !this; })());

/*!
{
	"name": "ES6 Promises",
	"property": "promises",
	"caniuse": "promises",
	"polyfills": ["es6promises"],
	"authors": ["Krister Kari", "Jake Archibald"],
	"tags": ["es6"],
	"notes": [{
		"name": "The ES6 promises spec",
		"href": "https://github.com/domenic/promises-unwrapping"
	},{
		"name": "Chromium dashboard - ES6 Promises",
		"href": "http://www.chromestatus.com/features/5681726336532480"
	},{
		"name": "JavaScript Promises: There and back again - HTML5 Rocks",
		"href": "http://www.html5rocks.com/en/tutorials/es6/promises/"
	}]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Promises per specification.
*/

	Modernizr.addTest('promises', function() {
		return 'Promise' in window &&
		// Some of these methods are missing from
		// Firefox/Chrome experimental implementations
		'resolve' in window.Promise &&
		'reject' in window.Promise &&
		'all' in window.Promise &&
		'race' in window.Promise &&
		// Older version of the spec had a resolver object
		// as the arg rather than a function
		(function() {
			var resolve;
			new window.Promise(function(r) { resolve = r; });
			return typeof resolve === 'function';
		}());
	});

/*!
{
	"name": "ES5 Immutable Undefined",
	"property": "es5undefined",
	"notes": [{
		"name": "ECMAScript 5.1 Language Specification",
		"href": "http://www.ecma-international.org/ecma-262/5.1/"
	}, {
		"name": "original implementation of detect code",
		"href": "http://kangax.github.io/es5-compat-table/"
	}],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"tags": ["es5"]
}
!*/
/* DOC
Check if browser prevents assignment to global `undefined` per ECMAScript 5.
*/

	Modernizr.addTest('es5undefined', function() {
		var result, originalUndefined;
		try {
			originalUndefined = window.undefined;
			window.undefined = 12345;
			result = typeof window.undefined === 'undefined';
			window.undefined = originalUndefined;
		} catch (e) {
			return false;
		}
		return result;
	});

/*!
{
	"name": "ES6 Generators",
	"property": "generators",
	"authors": ["Michael Kachanovskyi"],
	"tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Generators per specification.
*/

	Modernizr.addTest('generators', function() {
		try {
			/* jshint evil: true */
			new Function('function* test() {}')();
		} catch (e) {
			return false;
		}
		return true;
	});

/*!
{
	"name": "ES6 Object",
	"property": "es6object",
	"notes": [{
		"name": "unofficial ECMAScript 6 draft specification",
		"href": "http://people.mozilla.org/~jorendorff/es6-draft.html"
	}],
	"polyfills": ["es6shim"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
	"tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Object per specification.
*/

	Modernizr.addTest('es6object', !!(Object.assign &&
		Object.is &&
		Object.setPrototypeOf));

/*!
{
	"name": "Orientation and Motion Events",
	"property": ["devicemotion", "deviceorientation"],
	"caniuse": "deviceorientation",
	"notes": [{
		"name": "W3C Editor's Draft",
		"href": "http://dev.w3.org/geo/api/spec-source-orientation.html"
	},{
		"name": "Implementation by iOS Safari (Orientation)",
		"href": "http://goo.gl/fhce3"
	},{
		"name": "Implementation by iOS Safari (Motion)",
		"href": "http://goo.gl/rLKz8"
	}],
	"authors": ["Shi Chuan"],
	"tags": ["event"],
	"builderAliases": ["event_deviceorientation_motion"]
}
!*/
/* DOC
Part of Device Access aspect of HTML5, same category as geolocation.

`devicemotion` tests for Device Motion Event support, returns boolean value true/false.

`deviceorientation` tests for Device Orientation Event support, returns boolean value true/false
*/

	Modernizr.addTest('devicemotion', 'DeviceMotionEvent' in window);
	Modernizr.addTest('deviceorientation', 'DeviceOrientationEvent' in window);

/*!
{
	"name": "Server Sent Events",
	"property": "eventsource",
	"tags": ["network"],
	"builderAliases": ["network_eventsource"],
	"notes": [{
		"name": "W3 Spec",
		"href": "http://dev.w3.org/html5/eventsource/"
	}]
}
!*/
/* DOC
Tests for server sent events aka eventsource.
*/

	Modernizr.addTest('eventsource', 'EventSource' in window);

/*!
{
	"name": "Fetch API",
	"property": "fetch",
	"tags": ["network"],
	"caniuse": "fetch",
	"notes": [{
		"name": "Fetch Living Standard",
		"href": "https://fetch.spec.whatwg.org/"
	}],
	"polyfills": ["fetch"]
}
!*/
/* DOC
Detects support for the fetch API, a modern replacement for XMLHttpRequest.
*/

	Modernizr.addTest('fetch', 'fetch' in window);

/*!
{
	"name": "XHR responseType",
	"property": "xhrresponsetype",
	"tags": ["network"],
	"notes": [{
		"name": "XMLHttpRequest Living Standard",
		"href": "http://xhr.spec.whatwg.org/#the-responsetype-attribute"
	}]
}
!*/
/* DOC
Tests for XMLHttpRequest xhr.responseType.
*/

	Modernizr.addTest('xhrresponsetype', (function() {
		if (typeof XMLHttpRequest == 'undefined') {
			return false;
		}
		var xhr = new XMLHttpRequest();
		xhr.open('get', '/', true);
		return 'response' in xhr;
	}()));

/*!
{
	"authors": ["Cătălin Mariș"],
	"name": "Speech Synthesis API",
	"notes": [
		{
			"name": "W3C Web Speech API Specification - The SpeechSynthesis Interface",
			"href": "https://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html#tts-section"
		}
	],
	"property": "speechsynthesis",
	"tags": ["input", "speech"]
}
!*/


	Modernizr.addTest('speechsynthesis', 'SpeechSynthesisUtterance' in window);

/*!
{
	"name": "Local Storage",
	"property": "localstorage",
	"caniuse": "namevalue-storage",
	"tags": ["storage"],
	"knownBugs": [],
	"notes": [],
	"warnings": [],
	"polyfills": [
		"joshuabell-polyfill",
		"cupcake",
		"storagepolyfill",
		"amplifyjs",
		"yui-cacheoffline"
	]
}
!*/

	// In FF4, if disabled, window.localStorage should === null.

	// Normally, we could not test that directly and need to do a
	//   `('localStorage' in window) && ` test first because otherwise Firefox will
	//   throw bugzil.la/365772 if cookies are disabled

	// Also in iOS5 Private Browsing mode, attempting to use localStorage.setItem
	// will throw the exception:
	//   QUOTA_EXCEEDED_ERROR DOM Exception 22.
	// Peculiarly, getItem and removeItem calls do not throw.

	// Because we are forced to try/catch this, we'll go aggressive.

	// Just FWIW: IE8 Compat mode supports these features completely:
	//   www.quirksmode.org/dom/html5.html
	// But IE8 doesn't support either with local files

	Modernizr.addTest('localstorage', function() {
		var mod = 'modernizr';
		try {
			localStorage.setItem(mod, mod);
			localStorage.removeItem(mod);
			return true;
		} catch (e) {
			return false;
		}
	});

/*!
{
	"name": "Web SQL Database",
	"property": "websqldatabase",
	"caniuse": "sql-storage",
	"tags": ["storage"]
}
!*/

	// Chrome incognito mode used to throw an exception when using openDatabase
	// It doesn't anymore.
	Modernizr.addTest('websqldatabase', 'openDatabase' in window);

/*!
{
	"name": "SVG filters",
	"property": "svgfilters",
	"caniuse": "svg-filters",
	"tags": ["svg"],
	"builderAliases": ["svg_filters"],
	"authors": ["Erik Dahlstrom"],
	"notes": [{
		"name": "W3C Spec",
		"href": "http://www.w3.org/TR/SVG11/filters.html"
	}]
}
!*/

	// Should fail in Safari: http://stackoverflow.com/questions/9739955/feature-detecting-support-for-svg-filters.
	Modernizr.addTest('svgfilters', function() {
		var result = false;
		try {
			result = 'SVGFEColorMatrixElement' in window &&
				SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
		}
		catch (e) {}
		return result;
	});

/*!
{
	"name": "Binary WebSockets",
	"property": "websocketsbinary",
	"tags": ["websockets"],
	"builderAliases": ["websockets_binary"]
}
!*/

	// binaryType is truthy if there is support.. returns "blob" in new-ish chrome.
	// plus.google.com/115535723976198353696/posts/ERN6zYozENV
	// github.com/Modernizr/Modernizr/issues/370

	Modernizr.addTest('websocketsbinary', function() {
		var protocol = 'https:' == location.protocol ? 'wss' : 'ws',
		protoBin;

		if ('WebSocket' in window) {
			if (protoBin = 'binaryType' in WebSocket.prototype) {
				return protoBin;
			}
			try {
				return !!(new WebSocket(protocol + '://.').binaryType);
			} catch (e) {}
		}

		return false;
	});

/*!
{
	"name": "Framed window",
	"property": "framed",
	"tags": ["window"],
	"builderAliases": ["window_framed"]
}
!*/
/* DOC
Tests if page is iframed.
*/

	// github.com/Modernizr/Modernizr/issues/242

	Modernizr.addTest('framed', window.location != top.location);

/*!
{
	"name": "Shared Workers",
	"property": "sharedworkers",
	"caniuse" : "sharedworkers",
	"tags": ["performance", "workers"],
	"builderAliases": ["workers_sharedworkers"],
	"notes": [{
		"name": "W3C Reference",
		"href": "http://www.w3.org/TR/workers/"
	}]
}
!*/
/* DOC
Detects support for the `SharedWorker` API from the Web Workers spec.
*/

	Modernizr.addTest('sharedworkers', 'SharedWorker' in window);

/*!
{
	"name": "Web Workers",
	"property": "webworkers",
	"caniuse" : "webworkers",
	"tags": ["performance", "workers"],
	"notes": [{
		"name": "W3C Reference",
		"href": "http://www.w3.org/TR/workers/"
	}, {
		"name": "HTML5 Rocks article",
		"href": "http://www.html5rocks.com/en/tutorials/workers/basics/"
	}, {
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/Web/Guide/Performance/Using_web_workers"
	}],
	"polyfills": ["fakeworker", "html5shims"]
}
!*/
/* DOC
Detects support for the basic `Worker` API from the Web Workers spec. Web Workers provide a simple means for web content to run scripts in background threads.
*/

	Modernizr.addTest('webworkers', 'Worker' in window);


	/**
	 * Run through all tests and detect their support in the current UA.
	 *
	 * @access private
	 */

	function testRunner() {
		var featureNames;
		var feature;
		var aliasIdx;
		var result;
		var nameIdx;
		var featureName;
		var featureNameSplit;

		for (var featureIdx in tests) {
			if (tests.hasOwnProperty(featureIdx)) {
				featureNames = [];
				feature = tests[featureIdx];
				// run the test, throw the return value into the Modernizr,
				// then based on that boolean, define an appropriate className
				// and push it into an array of classes we'll join later.
				//
				// If there is no name, it's an 'async' test that is run,
				// but not directly added to the object. That should
				// be done with a post-run addTest call.
				if (feature.name) {
					featureNames.push(feature.name.toLowerCase());

					if (feature.options && feature.options.aliases && feature.options.aliases.length) {
						// Add all the aliases into the names list
						for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
							featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
						}
					}
				}

				// Run the test, or use the raw value if it's not a function
				result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


				// Set each of the names on the Modernizr object
				for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
					featureName = featureNames[nameIdx];
					// Support dot properties as sub tests. We don't do checking to make sure
					// that the implied parent tests have been added. You must call them in
					// order (either in the test, or make the parent test a dependency).
					//
					// Cap it to TWO to make the logic simple and because who needs that kind of subtesting
					// hashtag famous last words
					featureNameSplit = featureName.split('.');

					if (featureNameSplit.length === 1) {
						Modernizr[featureNameSplit[0]] = result;
					} else {
						// cast to a Boolean, if not one already
						/* jshint -W053 */
						if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
							Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
						}

						Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
					}

					classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
				}
			}
		}
	}
	;
/*!
{
	"name": "Context menus",
	"property": "contextmenu",
	"caniuse": "menu",
	"notes": [{
		"name": "W3C spec",
		"href": "http://www.w3.org/TR/html5/interactive-elements.html#context-menus"
	},{
		"name": "thewebrocks.com Demo",
		"href": "http://thewebrocks.com/demos/context-menu/"
	}],
	"polyfills": ["jquery-contextmenu"]
}
!*/
/* DOC
Detects support for custom context menus.
*/

	Modernizr.addTest(
		'contextmenu',
		('contextMenu' in docElement && 'HTMLMenuItemElement' in window)
	);

/*!
{
	"name": "cssall",
	"property": "cssall",
	"notes": [{
		"name": "Spec",
		"href": "http://dev.w3.org/csswg/css-cascade/#all-shorthand"
	}]
}
!*/
/* DOC
Detects support for the `all` css property, which is a shorthand to reset all css properties (except direction and unicode-bidi) to their original value
*/


	Modernizr.addTest('cssall', 'all' in docElement.style);


	/**
	 * setClasses takes an array of class names and adds them to the root element
	 *
	 * @access private
	 * @function setClasses
	 * @param {string[]} classes - Array of class names
	 */

	// Pass in an and array of class names, e.g.:
	//  ['no-webp', 'borderradius', ...]
	function setClasses(classes) {
		var className = docElement.className;
		var classPrefix = Modernizr._config.classPrefix || '';

		if (isSVG) {
			className = className.baseVal;
		}

		// Change `no-js` to `js` (independently of the `enableClasses` option)
		// Handle classPrefix on this too
		if (Modernizr._config.enableJSClass) {
			var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
			className = className.replace(reJS, '$1' + classPrefix + 'js$2');
		}

		if (Modernizr._config.enableClasses) {
			// Add the new classes
			className += ' ' + classPrefix + classes.join(' ' + classPrefix);
			isSVG ? docElement.className.baseVal = className : docElement.className = className;
		}

	}

	;

	var tests = [];


	/**
	 * is returns a boolean if the typeof an obj is exactly type.
	 *
	 * @access private
	 * @function is
	 * @param {*} obj - A thing we want to check the type of
	 * @param {string} type - A string to compare the typeof against
	 * @returns {boolean}
	 */

	function is(obj, type) {
		return typeof obj === type;
	}
	;

	/**
	 * docElement is a convenience wrapper to grab the root element of the document
	 *
	 * @access private
	 * @returns {HTMLElement|SVGElement} The root element of the document
	 */

	var docElement = document.documentElement;


	/**
	 * A convenience helper to check if the document we are running in is an SVG document
	 *
	 * @access private
	 * @returns {boolean}
	 */

	var isSVG = docElement.nodeName.toLowerCase() === 'svg';


	var classes = [];

/*!
{
	"name": "ES5 Array",
	"property": "es5array",
	"notes": [{
		"name": "ECMAScript 5.1 Language Specification",
		"href": "http://www.ecma-international.org/ecma-262/5.1/"
	}],
	"polyfills": ["es5shim"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Array per specification.
*/

	Modernizr.addTest('es5array', function() {
		return !!(Array.prototype &&
			Array.prototype.every &&
			Array.prototype.filter &&
			Array.prototype.forEach &&
			Array.prototype.indexOf &&
			Array.prototype.lastIndexOf &&
			Array.prototype.map &&
			Array.prototype.some &&
			Array.prototype.reduce &&
			Array.prototype.reduceRight &&
			Array.isArray);
	});

/*!
{
	"name": "ES5 Object",
	"property": "es5object",
	"notes": [{
		"name": "ECMAScript 5.1 Language Specification",
		"href": "http://www.ecma-international.org/ecma-262/5.1/"
	}],
	"polyfills": ["es5shim", "es5sham"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 Object per specification.
*/

	Modernizr.addTest('es5object', function() {
		return !!(Object.keys &&
			Object.create &&
			Object.getPrototypeOf &&
			Object.getOwnPropertyNames &&
			Object.isSealed &&
			Object.isFrozen &&
			Object.isExtensible &&
			Object.getOwnPropertyDescriptor &&
			Object.defineProperty &&
			Object.defineProperties &&
			Object.seal &&
			Object.freeze &&
			Object.preventExtensions);
	});

/*!
{
	"name": "ES5 String",
	"property": "es5string",
	"notes": [{
		"name": "ECMAScript 5.1 Language Specification",
		"href": "http://www.ecma-international.org/ecma-262/5.1/"
	}],
	"polyfills": ["es5shim"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"tags": ["es5"]
}
!*/
/* DOC
Check if browser implements ECMAScript 5 String per specification.
*/

	Modernizr.addTest('es5string', function() {
		return !!(String.prototype && String.prototype.trim);
	});

/*!
{
	"name": "ES6 Array",
	"property": "es6array",
	"notes": [{
		"name": "unofficial ECMAScript 6 draft specification",
		"href": "http://people.mozilla.org/~jorendorff/es6-draft.html"
	}],
	"polyfills": ["es6shim"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
	"tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Array per specification.
*/

	Modernizr.addTest('es6array', !!(Array.prototype &&
		Array.prototype.copyWithin &&
		Array.prototype.fill &&
		Array.prototype.find &&
		Array.prototype.findIndex &&
		Array.prototype.keys &&
		Array.prototype.entries &&
		Array.prototype.values &&
		Array.from &&
		Array.of));

/*!
{
	"name": "ES6 Math",
	"property": "es6math",
	"notes": [{
		"name": "unofficial ECMAScript 6 draft specification",
		"href": "http://people.mozilla.org/~jorendorff/es6-draft.html"
	}],
	"polyfills": ["es6shim"],
	"authors": ["Ron Waldon (@jokeyrhyme)"],
	"warnings": ["ECMAScript 6 is still a only a draft, so this detect may not match the final specification or implementations."],
	"tags": ["es6"]
}
!*/
/* DOC
Check if browser implements ECMAScript 6 Math per specification.
*/

	Modernizr.addTest('es6math', !!(Math &&
		Math.clz32 &&
		Math.cbrt &&
		Math.imul &&
		Math.sign &&
		Math.log10 &&
		Math.log2 &&
		Math.log1p &&
		Math.expm1 &&
		Math.cosh &&
		Math.sinh &&
		Math.tanh &&
		Math.acosh &&
		Math.asinh &&
		Math.atanh &&
		Math.hypot &&
		Math.trunc &&
		Math.fround));


	/**
	 * createElement is a convenience wrapper around document.createElement. Since we
	 * use createElement all over the place, this allows for (slightly) smaller code
	 * as well as abstracting away issues with creating elements in contexts other than
	 * HTML documents (e.g. SVG documents).
	 *
	 * @access private
	 * @function createElement
	 * @returns {HTMLElement|SVGElement} An HTML or SVG element
	 */

	function createElement() {
		if (typeof document.createElement !== 'function') {
			// This is the case in IE7, where the type of createElement is "object".
			// For this reason, we cannot call apply() as Object is not a Function.
			return document.createElement(arguments[0]);
		} else if (isSVG) {
			return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
		} else {
			return document.createElement.apply(document, arguments);
		}
	}

	;
/*!
{
	"name" : "HTML5 Audio Element",
	"property": "audio",
	"tags" : ["html5", "audio", "media"]
}
!*/
/* DOC
Detects the audio element
*/

	// This tests evaluates support of the audio element, as well as
	// testing what types of content it supports.
	//
	// We're using the Boolean constructor here, so that we can extend the value
	// e.g.  Modernizr.audio     // true
	//       Modernizr.audio.ogg // 'probably'
	//
	// Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L845
	//                     thx to NielsLeenheer and zcorpan

	// Note: in some older browsers, "no" was a return value instead of empty string.
	//   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.2
	//   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.5
	Modernizr.addTest('audio', function() {
		/* jshint -W053 */
		var elem = createElement('audio');
		var bool = false;

		try {
			if (bool = !!elem.canPlayType) {
				bool      = new Boolean(bool);
				bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, '');
				bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/, '');
				bool.opus  = elem.canPlayType('audio/ogg; codecs="opus"') .replace(/^no$/, '');

				// Mimetypes accepted:
				//   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_elements
				//   bit.ly/iphoneoscodecs
				bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/, '');
				bool.m4a  = (elem.canPlayType('audio/x-m4a;')            ||
										 elem.canPlayType('audio/aac;'))             .replace(/^no$/, '');
			}
		} catch (e) { }

		return bool;
	});

/*!
{
	"name": "Canvas",
	"property": "canvas",
	"caniuse": "canvas",
	"tags": ["canvas", "graphics"],
	"polyfills": ["flashcanvas", "excanvas", "slcanvas", "fxcanvas"]
}
!*/
/* DOC
Detects support for the `<canvas>` element for 2D drawing.
*/

	// On the S60 and BB Storm, getContext exists, but always returns undefined
	// so we actually have to call getContext() to verify
	// github.com/Modernizr/Modernizr/issues/issue/97/
	Modernizr.addTest('canvas', function() {
		var elem = createElement('canvas');
		return !!(elem.getContext && elem.getContext('2d'));
	});

/*!
{
	"name": "Canvas text",
	"property": "canvastext",
	"caniuse": "canvas-text",
	"tags": ["canvas", "graphics"],
	"polyfills": ["canvastext"]
}
!*/
/* DOC
Detects support for the text APIs for `<canvas>` elements.
*/

	Modernizr.addTest('canvastext',  function() {
		if (Modernizr.canvas  === false) {
			return false;
		}
		return typeof createElement('canvas').getContext('2d').fillText == 'function';
	});

/*!
{
	"name": "Content Editable",
	"property": "contenteditable",
	"caniuse": "contenteditable",
	"notes": [{
		"name": "WHATWG spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#contenteditable"
	}]
}
!*/
/* DOC
Detects support for the `contenteditable` attribute of elements, allowing their DOM text contents to be edited directly by the user.
*/

	Modernizr.addTest('contenteditable', function() {
		// early bail out
		if (!('contentEditable' in docElement)) {
			return;
		}

		// some mobile browsers (android < 3.0, iOS < 5) claim to support
		// contentEditable, but but don't really. This test checks to see
		// confirms whether or not it actually supports it.

		var div = createElement('div');
		div.contentEditable = true;
		return div.contentEditable === 'true';
	});

/*!
{
	"name": "Emoji",
	"property": "emoji"
}
!*/
/* DOC
Detects support for emoji character sets.
*/

	Modernizr.addTest('emoji', function() {
		if (!Modernizr.canvastext) {
			return false;
		}
		var pixelRatio = window.devicePixelRatio || 1;
		var offset = 12 * pixelRatio;
		var node = createElement('canvas');
		var ctx = node.getContext('2d');
		ctx.fillStyle = '#f00';
		ctx.textBaseline = 'top';
		ctx.font = '32px Arial';
		ctx.fillText('\ud83d\udc28', 0, 0); // U+1F428 KOALA
		return ctx.getImageData(offset, offset, 1, 1).data[0] !== 0;
	});

/*!
{
	"name": "Reverse Ordered Lists",
	"property": "olreversed",
	"notes": [{
		"name": "Impressive Webs article",
		"href": "http://impressivewebs.com/reverse-ordered-lists-html5"
	}],
	"builderAliases": ["lists_reversed"]
}
!*/
/* DOC
Detects support for the `reversed` attribute on the `<ol>` element.
*/

	Modernizr.addTest('olreversed', 'reversed' in createElement('ol'));

/*!
{
	"name": "IE User Data API",
	"property": "userdata",
	"tags": ["storage"],
	"authors": ["@stereobooster"],
	"notes": [{
		"name": "MSDN Documentation",
		"href": "http://msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx"
	}]
}
!*/
/* DOC
Detects support for IE userData for persisting data, an API similar to localStorage but supported since IE5.
*/

	Modernizr.addTest('userdata', !!createElement('div').addBehavior);

/*!
{
	"name": "VML",
	"property": "vml",
	"caniuse": "vml",
	"tags": ["vml"],
	"authors": ["Craig Andrews (@candrews)"],
	"notes": [{
		"name" : "W3C VML reference",
		"href": "http://www.w3.org/TR/NOTE-VML"
	},{
		"name" : "Microsoft VML reference",
		"href": "http://msdn.microsoft.com/en-us/library/bb263898%28VS.85%29.aspx"
	}]
}
!*/
/* DOC
Detects support for VML.
*/

	Modernizr.addTest('vml', function() {
		var containerDiv = createElement('div');
		var supports = false;
		var shape;

		if (!isSVG) {
			containerDiv.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
			shape = containerDiv.firstChild;
			shape.style.behavior = 'url(#default#VML)';
			supports = shape ? typeof shape.adj == 'object' : true;
		}

		return supports;
	});

/*!
{
	"name": "WebGL",
	"property": "webgl",
	"caniuse": "webgl",
	"tags": ["webgl", "graphics"],
	"polyfills": ["jebgl", "cwebgl", "iewebgl"]
}
!*/

	Modernizr.addTest('webgl', function() {
		var canvas = createElement('canvas');
		var supports = 'probablySupportsContext' in canvas ? 'probablySupportsContext' :  'supportsContext';
		if (supports in canvas) {
			return canvas[supports]('webgl') || canvas[supports]('experimental-webgl');
		}
		return 'WebGLRenderingContext' in window;
	});

/*!
{
	"name": "a[download] Attribute",
	"property": "adownload",
	"caniuse" : "download",
	"tags": ["media", "attribute"],
	"builderAliases": ["a_download"],
	"notes": [{
		"name": "WhatWG Reference",
		"href": "http://developers.whatwg.org/links.html#downloading-resources"
	}]
}
!*/
/* DOC
When used on an `<a>`, this attribute signifies that the resource it points to should be downloaded by the browser rather than navigating to it.
*/

	Modernizr.addTest('adownload', !window.externalHost && 'download' in createElement('a'));

/*!
{
	"name": "canvas.toDataURL type support",
	"property": ["todataurljpeg", "todataurlpng", "todataurlwebp"],
	"tags": ["canvas"],
	"builderAliases": ["canvas_todataurl_type"],
	"async" : false,
	"notes": [{
		"name": "MDN article",
		"href": "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement.toDataURL"
	}]
}
!*/


	var canvas = createElement('canvas');

	Modernizr.addTest('todataurljpeg', function() {
		return !!Modernizr.canvas && canvas.toDataURL('image/jpeg').indexOf('data:image/jpeg') === 0;
	});
	Modernizr.addTest('todataurlpng', function() {
		return !!Modernizr.canvas && canvas.toDataURL('image/png').indexOf('data:image/png') === 0;
	});
	Modernizr.addTest('todataurlwebp', function() {
		var supports = false;

		// firefox 3 throws an error when you use an "invalid" toDataUrl
		try {
			supports = !!Modernizr.canvas && canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
		} catch (e) {}

		return supports;
	});


/*!
{
	"name": "Background Position Shorthand",
	"property": "bgpositionshorthand",
	"tags": ["css"],
	"builderAliases": ["css_backgroundposition_shorthand"],
	"notes": [{
		"name": "MDN Docs",
		"href": "https://developer.mozilla.org/en/CSS/background-position"
	}, {
		"name": "W3 Spec",
		"href": "http://www.w3.org/TR/css3-background/#background-position"
	}, {
		"name": "Demo",
		"href": "http://jsfiddle.net/Blink/bBXvt/"
	}]
}
!*/
/* DOC
Detects if you can use the shorthand method to define multiple parts of an
element's background-position simultaniously.

eg `background-position: right 10px bottom 10px`
*/

	Modernizr.addTest('bgpositionshorthand', function() {
		var elem = createElement('a');
		var eStyle = elem.style;
		var val = 'right 10px bottom 10px';
		eStyle.cssText = 'background-position: ' + val + ';';
		return (eStyle.backgroundPosition === val);
	});

/*!
{
	"name": "CSS Multiple Backgrounds",
	"caniuse": "multibackgrounds",
	"property": "multiplebgs",
	"tags": ["css"]
}
!*/

	// Setting multiple images AND a color on the background shorthand property
	// and then querying the style.background property value for the number of
	// occurrences of "url(" is a reliable method for detecting ACTUAL support for this!

	Modernizr.addTest('multiplebgs', function() {
		var style = createElement('a').style;
		style.cssText = 'background:url(https://),url(https://),red url(https://)';

		// If the UA supports multiple backgrounds, there should be three occurrences
		// of the string "url(" in the return value for elemStyle.background
		return (/(url\s*\(.*?){3}/).test(style.background);
	});

/*!
{
	"name": "dataset API",
	"caniuse": "dataset",
	"property": "dataset",
	"tags": ["dom"],
	"builderAliases": ["dom_dataset"],
	"authors": ["@phiggins42"]
}
!*/

	// dataset API for data-* attributes
	Modernizr.addTest('dataset', function() {
		var n = createElement('div');
		n.setAttribute('data-a-b', 'c');
		return !!(n.dataset && n.dataset.aB === 'c');
	});

/*!
{
	"name": "Unknown Elements",
	"property": "unknownelements",
	"tags": ["elem"],
	"notes": [{
		"name": "The Story of the HTML5 Shiv",
		"href": "http://www.paulirish.com/2011/the-history-of-the-html5-shiv/"
	}, {
		"name": "original implementation of detect code",
		"href": "https://github.com/aFarkas/html5shiv/blob/bf4fcc4/src/html5shiv.js#L36"
	}],
	"polyfills": ["html5shiv"],
	"authors": ["Ron Waldon (@jokeyrhyme)"]
}
!*/
/* DOC
Does the browser support HTML with non-standard / new elements?
*/

	Modernizr.addTest('unknownelements', function() {
		var a = createElement('a');
		a.innerHTML = '<xyz></xyz>';
		return a.childNodes.length === 1;
	});

/*!
{
	"name": "Template Tag",
	"property": "template",
	"tags": ["elem"],
	"notes": [{
		"name": "HTML5Rocks Article",
		"href": "http://www.html5rocks.com/en/tutorials/webcomponents/template/"
	},{
		"name": "W3 Spec",
		"href": "https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html"
	}]
}
!*/

	Modernizr.addTest('template', 'content' in createElement('template'));

/*!
{
	"name": "input[capture] Attribute",
	"property": "capture",
	"tags": ["video", "image", "audio", "media", "attribute"],
	"notes": [{
		"name": "W3C draft: HTML Media Capture",
		"href": "http://www.w3.org/TR/html-media-capture/"
	}]
}
!*/
/* DOC
When used on an `<input>`, this attribute signifies that the resource it takes should be generated via device's camera, camcorder, sound recorder.
*/

	// testing for capture attribute in inputs
	Modernizr.addTest('capture', ('capture' in createElement('input')));

/*!
{
	"name": "input[form] Attribute",
	"property": "formattribute",
	"tags": ["attribute", "forms", "input"],
	"builderAliases": ["forms_formattribute"]
}
!*/
/* DOC
Detects whether input form="form_id" is available on the platform
E.g. IE 10 (and below), don't support this
*/


	Modernizr.addTest('formattribute', function() {
		var form = createElement('form');
		var input = createElement('input');
		var div = createElement('div');
		var id = 'formtest' + (new Date()).getTime();
		var attr;
		var bool = false;

		form.id = id;

		//IE6/7 confuses the form idl attribute and the form content attribute, so we use document.createAttribute
		try {
			input.setAttribute('form', id);
		}
		catch (e) {
			if (document.createAttribute) {
				attr = document.createAttribute('form');
				attr.nodeValue = id;
				input.setAttributeNode(attr);
			}
		}

		div.appendChild(form);
		div.appendChild(input);

		docElement.appendChild(div);

		bool = form.elements && form.elements.length === 1 && input.form == form;

		div.parentNode.removeChild(div);
		return bool;
	});

/*!
{
	"name": "placeholder attribute",
	"property": "placeholder",
	"tags": ["forms", "attribute"],
	"builderAliases": ["forms_placeholder"]
}
!*/
/* DOC
Tests for placeholder attribute in inputs and textareas
*/

	Modernizr.addTest('placeholder', ('placeholder' in createElement('input') && 'placeholder' in createElement('textarea')));

/*!
{
	"name": "iframe[sandbox] Attribute",
	"property": "sandbox",
	"tags": ["iframe"],
	"builderAliases": ["iframe_sandbox"],
	"notes": [
	{
		"name": "WhatWG Spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/the-iframe-element.html#attr-iframe-sandbox"
	}],
	"knownBugs": [ "False-positive on Firefox < 29" ]
}
!*/
/* DOC
Test for `sandbox` attribute in iframes.
*/

	Modernizr.addTest('sandbox', 'sandbox' in createElement('iframe'));

/*!
{
	"name": "iframe[seamless] Attribute",
	"property": "seamless",
	"tags": ["iframe"],
	"builderAliases": ["iframe_seamless"],
	"notes": [{
		"name": "WhatWG Spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/the-iframe-element.html#attr-iframe-seamless"
	}]
}
!*/
/* DOC
Test for `seamless` attribute in iframes.
*/

	Modernizr.addTest('seamless', 'seamless' in createElement('iframe'));

/*!
{
	"name": "srcset attribute",
	"property": "srcset",
	"tags": ["image"],
	"notes": [{
		"name": "Smashing Magazine Article",
		"href": "http://en.wikipedia.org/wiki/APNG"
		},{
		"name": "Generate multi-resolution images for srcset with Grunt",
		"href": "http://addyosmani.com/blog/generate-multi-resolution-images-for-srcset-with-grunt/"
		}]
}
!*/
/* DOC
Test for the srcset attribute of images
*/

	Modernizr.addTest('srcset', 'srcset' in createElement('img'));

/*!
{
	"name": "sizes attribute",
	"property": "sizes",
	"tags": ["image"],
	"authors": ["Mat Marquis"],
	"notes": [{
		"name": "Spec",
		"href": "http://picture.responsiveimages.org/#parse-sizes-attr"
		},{
		"name": "Usage Details",
		"href": "http://ericportis.com/posts/2014/srcset-sizes/"
		}]
}
!*/
/* DOC
Test for the `sizes` attribute on images
*/

	Modernizr.addTest('sizes', 'sizes' in createElement('img'));

/*!
{
	"name": "input formenctype",
	"property": "inputformenctype",
	"aliases": ["input-formenctype"],
	"notes": [{
		"name": "WHATWG Spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#attr-fs-formenctype"
	}, {
		"name": "Wufoo demo",
		"href": "http://www.wufoo.com/html5/attributes/16-formenctype.html"
	}],
	"polyfills": [
		"html5formshim"
	]
}
!*/
/* DOC
Detect support for the formenctype attribute on form inputs, which overrides the form enctype attribute
*/

	Modernizr.addTest('inputformenctype', !!('formEnctype' in createElement('input')), {aliases: ['input-formenctype']});

/*!
{
	"name": "input formaction",
	"property": "inputformaction",
	"aliases": ["input-formaction"],
	"notes": [{
		"name": "WHATWG Spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#attr-fs-formaction"
	}, {
		"name": "Wufoo demo",
		"href": "http://www.wufoo.com/html5/attributes/13-formaction.html"
	}],
	"polyfills": [
		"webshims"
	]
}
!*/
/* DOC
Detect support for the formaction attribute on form inputs
*/

	Modernizr.addTest('inputformaction', !!('formAction' in createElement('input')), {aliases: ['input-formaction']});

/*!
{
	"name": "input formtarget",
	"property": "inputformtarget",
	"aliases": ["input-formtarget"],
	"notes": [{
		"name": "WHATWG Spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/association-of-controls-and-forms.html#attr-fs-formtarget"
	}, {
		"name": "Wufoo demo",
		"href": "http://www.wufoo.com/html5/attributes/15-formtarget.html"
	}],
	"polyfills": [
		"html5formshim"
	]
}
!*/
/* DOC
Detect support for the formtarget attribute on form inputs, which overrides the form target attribute
*/

	Modernizr.addTest('inputformtarget', !!('formtarget' in createElement('input')), {aliases: ['input-formtarget']});

/*!
{
	"name": "script[async]",
	"property": "scriptasync",
	"caniuse": "script-async",
	"tags": ["script"],
	"builderAliases": ["script_async"],
	"authors": ["Theodoor van Donge"]
}
!*/
/* DOC
Detects support for the `async` attribute on the `<script>` element.
*/

	Modernizr.addTest('scriptasync', 'async' in createElement('script'));

/*!
{
	"name": "script[defer]",
	"property": "scriptdefer",
	"caniuse": "script-defer",
	"tags": ["script"],
	"builderAliases": ["script_defer"],
	"authors": ["Theodoor van Donge"],
	"warnings": ["Browser implementation of the `defer` attribute vary: http://stackoverflow.com/questions/3952009/defer-attribute-chrome#answer-3982619"],
	"knownBugs": ["False positive in Opera 12"]
}
!*/
/* DOC
Detects support for the `defer` attribute on the `<script>` element.
*/

	Modernizr.addTest('scriptdefer', 'defer' in createElement('script'));

/*!
{
	"name": "style[scoped]",
	"property": "stylescoped",
	"caniuse": "style-scoped",
	"tags": ["dom"],
	"builderAliases": ["style_scoped"],
	"authors": ["Cătălin Mariș"],
	"notes": [{
		"name": "WHATWG Specification",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/semantics.html#attr-style-scoped"
	}],
	"polyfills": ["scoped-styles"]
}
!*/
/* DOC
Support for the `scoped` attribute of the `<style>` element.
*/

	Modernizr.addTest('stylescoped', 'scoped' in createElement('style'));

/*!
{
	"name": "Inline SVG",
	"property": "inlinesvg",
	"caniuse": "svg-html5",
	"tags": ["svg"],
	"notes": [{
		"name": "Test page",
		"href": "http://paulirish.com/demo/inline-svg"
	}, {
		"name": "Test page and results",
		"href": "http://codepen.io/eltonmesquita/full/GgXbvo/"
	}],
	"polyfills": ["inline-svg-polyfill"],
	"knownBugs": ["False negative on some Chromia browsers."]
}
!*/
/* DOC
Detects support for inline SVG in HTML (not within XHTML).
*/

	Modernizr.addTest('inlinesvg', function() {
		var div = createElement('div');
		div.innerHTML = '<svg/>';
		return (typeof SVGRect != 'undefined' && div.firstChild && div.firstChild.namespaceURI) == 'http://www.w3.org/2000/svg';
	});

/*!
{
	"name": "Video Loop Attribute",
	"property": "videoloop",
	"tags": ["video", "media"]
}
!*/

	Modernizr.addTest('videoloop', 'loop' in createElement('video'));

/*!
{
	"name": "WebGL Extensions",
	"property": "webglextensions",
	"tags": ["webgl", "graphics"],
	"builderAliases": ["webgl_extensions"],
	"async" : true,
	"authors": ["Ilmari Heikkinen"],
	"knownBugs": [],
	"notes": [{
		"name": "Kronos extensions registry",
		"href": "http://www.khronos.org/registry/webgl/extensions/"
	}]
}
!*/
/* DOC
Detects support for OpenGL extensions in WebGL. It's `true` if the [WebGL extensions API](https://developer.mozilla.org/en-US/docs/Web/WebGL/Using_Extensions) is supported, then exposes the supported extensions as subproperties, e.g.:

```javascript
if (Modernizr.webglextensions) {
	// WebGL extensions API supported
}
if ('OES_vertex_array_object' in Modernizr.webglextensions) {
	// Vertex Array Objects extension supported
}
```
*/

	// based on code from ilmari heikkinen
	// code.google.com/p/graphics-detect/source/browse/js/detect.js

	// Not Async but handles it's own self
	Modernizr.addAsyncTest(function() {
		/* jshint -W053 */

		// Not a good candidate for css classes, so we avoid addTest stuff
		Modernizr.webglextensions = new Boolean(false);

		if (!Modernizr.webgl) {
			return;
		}

		var canvas;
		var ctx;
		var exts;

		try {
			canvas = createElement('canvas');
			ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
			exts = ctx.getSupportedExtensions();
		}
		catch (e) {
			return;
		}

		if (ctx !== undefined) {
			Modernizr.webglextensions = new Boolean(true);
		}

		for (var i = -1, len = exts.length; ++i < len;) {
			Modernizr.webglextensions[exts[i]] = true;
		}

		canvas = undefined;
	});


	/**
	 * Modernizr.hasEvent() detects support for a given event
	 *
	 * @memberof Modernizr
	 * @name Modernizr.hasEvent
	 * @optionName Modernizr.hasEvent()
	 * @optionProp hasEvent
	 * @access public
	 * @function hasEvent
	 * @param  {string|*}       eventName  is the name of an event to test for (e.g. "resize")
	 * @param  {Element|string} [element=HTMLDivElement] is the element|document|window|tagName to test on
	 * @returns {boolean}
	 * @example
	 *  `Modernizr.hasEvent` lets you determine if the browser supports a supplied event.
	 *  By default, it does this detection on a div element
	 *
	 * ```js
	 *  hasEvent('blur') // true;
	 * ```
	 *
	 * However, you are able to give an object as a second argument to hasEvent to
	 * detect an event on something other than a div.
	 *
	 * ```js
	 *  hasEvent('devicelight', window) // true;
	 * ```
	 *
	 */

	var hasEvent = (function(undefined) {

		// Detect whether event support can be detected via `in`. Test on a DOM element
		// using the "blur" event b/c it should always exist. bit.ly/event-detection
		var needsFallback = !('onblur' in document.documentElement);

		function inner(eventName, element) {

			var isSupported;
			if (!eventName) { return false; }
			if (!element || typeof element === 'string') {
				element = createElement(element || 'div');
			}

			// Testing via the `in` operator is sufficient for modern browsers and IE.
			// When using `setAttribute`, IE skips "unload", WebKit skips "unload" and
			// "resize", whereas `in` "catches" those.
			eventName = 'on' + eventName;
			isSupported = eventName in element;

			// Fallback technique for old Firefox - bit.ly/event-detection
			if (!isSupported && needsFallback) {
				if (!element.setAttribute) {
					// Switch to generic element if it lacks `setAttribute`.
					// It could be the `document`, `window`, or something else.
					element = createElement('div');
				}

				element.setAttribute(eventName, '');
				isSupported = typeof element[eventName] === 'function';

				if (element[eventName] !== undefined) {
					// If property was created, "remove it" by setting value to `undefined`.
					element[eventName] = undefined;
				}
				element.removeAttribute(eventName);
			}

			return isSupported;
		}
		return inner;
	})();


	ModernizrProto.hasEvent = hasEvent;

/*!
{
	"name": "Ambient Light Events",
	"property": "ambientlight",
	"notes": [{
		"name": "W3C Ambient Light Events",
		"href": "http://www.w3.org/TR/ambient-light/"
	}]
}
!*/
/* DOC
Detects support for the API that provides information about the ambient light levels, as detected by the device's light detector, in terms of lux units.
*/

	Modernizr.addTest('ambientlight', hasEvent('devicelight', window));

/*!
{
	"name": "Hashchange event",
	"property": "hashchange",
	"caniuse": "hashchange",
	"tags": ["history"],
	"notes": [{
		"name": "MDN documentation",
		"href": "https://developer.mozilla.org/en-US/docs/Web/API/window.onhashchange"
	}],
	"polyfills": [
		"jquery-hashchange",
		"moo-historymanager",
		"jquery-ajaxy",
		"hasher",
		"shistory"
	]
}
!*/
/* DOC
Detects support for the `hashchange` event, fired when the current location fragment changes.
*/

	Modernizr.addTest('hashchange', function() {
		if (hasEvent('hashchange', window) === false) {
			return false;
		}

		// documentMode logic from YUI to filter out IE8 Compat Mode
		//   which false positives.
		return (document.documentMode === undefined || document.documentMode > 7);
	});

/*!
{
	"name": "input[search] search event",
	"property": "search",
	"tags": ["input","search"],
	"authors": ["Calvin Webster"],
	"notes": [{
		"name": "Wufoo demo",
		"href": "http://www.wufoo.com/html5/types/5-search.html?"
	}, {
		"name": "CSS Tricks",
		"href": "http://css-tricks.com/webkit-html5-search-inputs/"
	}]
}
!*/
/* DOC
There is a custom `search` event implemented in webkit browsers when using an `input[search]` element.
*/

	Modernizr.addTest('inputsearchevent',  hasEvent('search'));


	/**
	 * getBody returns the body of a document, or an element that can stand in for
	 * the body if a real body does not exist
	 *
	 * @access private
	 * @function getBody
	 * @returns {HTMLElement|SVGElement} Returns the real body of a document, or an
	 * artificially created element that stands in for the body
	 */

	function getBody() {
		// After page load injecting a fake body doesn't work so check if body exists
		var body = document.body;

		if (!body) {
			// Can't use the real body create a fake one.
			body = createElement(isSVG ? 'svg' : 'body');
			body.fake = true;
		}

		return body;
	}

	;

	/**
	 * since we have a fairly large number of input tests that don't mutate the input
	 * we create a single element that can be shared with all of those tests for a
	 * minor perf boost
	 *
	 * @access private
	 * @returns {HTMLInputElement}
	 */
	var inputElem = createElement('input');

/*!
{
	"name": "Input attributes",
	"property": "input",
	"tags": ["forms"],
	"authors": ["Mike Taylor"],
	"notes": [{
		"name": "WHATWG spec",
		"href": "http://www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summary"
	}],
	"knownBugs": ["Some blackberry devices report false positive for input.multiple"]
}
!*/
/* DOC
Detects support for HTML5 `<input>` element attributes and exposes Boolean subproperties with the results:

```javascript
Modernizr.input.autocomplete
Modernizr.input.autofocus
Modernizr.input.list
Modernizr.input.max
Modernizr.input.min
Modernizr.input.multiple
Modernizr.input.pattern
Modernizr.input.placeholder
Modernizr.input.required
Modernizr.input.step
```
*/

	// Run through HTML5's new input attributes to see if the UA understands any.
	// Mike Taylr has created a comprehensive resource for testing these attributes
	//   when applied to all input types:
	//   miketaylr.com/code/input-type-attr.html

	// Only input placeholder is tested while textarea's placeholder is not.
	// Currently Safari 4 and Opera 11 have support only for the input placeholder
	// Both tests are available in feature-detects/forms-placeholder.js

	var inputattrs = 'autocomplete autofocus list placeholder max min multiple pattern required step'.split(' ');
	var attrs = {};

	Modernizr['input'] = (function(props) {
		for (var i = 0, len = props.length; i < len; i++) {
			attrs[ props[i] ] = !!(props[i] in inputElem);
		}
		if (attrs.list) {
			// safari false positive's on datalist: webk.it/74252
			// see also github.com/Modernizr/Modernizr/issues/146
			attrs.list = !!(createElement('datalist') && window.HTMLDataListElement);
		}
		return attrs;
	})(inputattrs);

/*!
{
	"name": "datalist Element",
	"caniuse": "datalist",
	"property": "datalistelem",
	"tags": ["elem"],
	"builderAliases": ["elem_datalist"],
	"warnings": ["This test is a dupe of Modernizr.input.list. Only around for legacy reasons."],
	"notes": [{
		"name": "CSS Tricks Article",
		"href": "http://css-tricks.com/15346-relevant-dropdowns-polyfill-for-datalist/"
	},{
		"name": "Mike Taylor Test",
		"href": "http://miketaylr.com/test/datalist.html"
	},{
		"name": "Mike Taylor Code",
		"href": "http://miketaylr.com/code/datalist.html"
	}]
}
!*/

	// lol. we already have a test for datalist built in! silly you.
	// Leaving it around in case anyone's using it

	Modernizr.addTest('datalistelem', Modernizr.input.list);

/*!
{
	"name": "Form input types",
	"property": "inputtypes",
	"caniuse": "forms",
	"tags": ["forms"],
	"authors": ["Mike Taylor"],
	"polyfills": [
		"jquerytools",
		"webshims",
		"h5f",
		"webforms2",
		"nwxforms",
		"fdslider",
		"html5slider",
		"galleryhtml5forms",
		"jscolor",
		"html5formshim",
		"selectedoptionsjs",
		"formvalidationjs"
	]
}
!*/
/* DOC
Detects support for HTML5 form input types and exposes Boolean subproperties with the results:

```javascript
Modernizr.inputtypes.color
Modernizr.inputtypes.date
Modernizr.inputtypes.datetime
Modernizr.inputtypes['datetime-local']
Modernizr.inputtypes.email
Modernizr.inputtypes.month
Modernizr.inputtypes.number
Modernizr.inputtypes.range
Modernizr.inputtypes.search
Modernizr.inputtypes.tel
Modernizr.inputtypes.time
Modernizr.inputtypes.url
Modernizr.inputtypes.week
```
*/

	// Run through HTML5's new input types to see if the UA understands any.
	//   This is put behind the tests runloop because it doesn't return a
	//   true/false like all the other tests; instead, it returns an object
	//   containing each input type with its corresponding true/false value

	// Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com/
	var inputtypes = 'search tel url email datetime date month week time datetime-local number range color'.split(' ');
	var inputs = {};

	Modernizr['inputtypes'] = (function(props) {
		var len = props.length;
		var smile = ':)';
		var inputElemType;
		var defaultView;
		var bool;

		for (var i = 0; i < len; i++) {

			inputElem.setAttribute('type', inputElemType = props[i]);
			bool = inputElem.type !== 'text' && 'style' in inputElem;

			// We first check to see if the type we give it sticks..
			// If the type does, we feed it a textual value, which shouldn't be valid.
			// If the value doesn't stick, we know there's input sanitization which infers a custom UI
			if (bool) {

				inputElem.value         = smile;
				inputElem.style.cssText = 'position:absolute;visibility:hidden;';

				if (/^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined) {

					docElement.appendChild(inputElem);
					defaultView = document.defaultView;

					// Safari 2-4 allows the smiley as a value, despite making a slider
					bool =  defaultView.getComputedStyle &&
						defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
						// Mobile android web browser has false positive, so must
						// check the height to see if the widget is actually there.
						(inputElem.offsetHeight !== 0);

					docElement.removeChild(inputElem);

				} else if (/^(search|tel)$/.test(inputElemType)) {
					// Spec doesn't define any special parsing or detectable UI
					//   behaviors so we pass these through as true

					// Interestingly, opera fails the earlier test, so it doesn't
					//  even make it here.

				} else if (/^(url|email|number)$/.test(inputElemType)) {
					// Real url and email support comes with prebaked validation.
					bool = inputElem.checkValidity && inputElem.checkValidity() === false;

				} else {
					// If the upgraded input compontent rejects the :) text, we got a winner
					bool = inputElem.value != smile;
				}
			}

			inputs[ props[i] ] = !!bool;
		}
		return inputs;
	})(inputtypes);

})(window, document);
