/*jshint strict:false */

// Initialize local Namespace

var APP = APP || {};

/*! loadJS: load a JS file asynchronously. [c]2014 @scottjehl, Filament Group, Inc. (Based on http://goo.gl/REQGQ by Paul Irish). Licensed MIT */

APP.loadJS	= function ( src, callback ) {

	var ref, script, key, storage;
	var content = '';
	var ls = window.localStorage;
	var xhr = new XMLHttpRequest();
	var prefix = 'storage-';
	var i = 0;
	var len = document.scripts.length;

	var getScript = function ( url ) {

		if ( xhr.readyState === 4 ) {

			if ( ( xhr.status === 200 ) || ( ( xhr.status === 0 ) && xhr.responseText ) ) {

				storage.data = script.text = xhr.responseText;
				ls.setItem(key, JSON.stringify(storage));

				loadCallbacks();

			} else {

				console.log('Could not load file ' + src);
			}
		}
	},

	isArray = function( obj ) {
		return Object.prototype.toString.call(obj) === '[object Array]';
	},

	loadCallbacks = function() {
		var i = 0, len;

		if ( 'callbacks' in script && isArray(script.callbacks) && script.callbacks.length > 0 ) {

			len = script.callbacks.length;

			for ( ; i < len; i++ ) {

				if ( typeof script.callbacks[i] === 'function' ) {

					script.callbacks[i](script);
				}
			}
		}
	};

	if ( src.match(/^([\s\S]+\/)?([\s\S]+)\.js$/) ) {

		key = src.match(/^([\s\S]+\/)?([\s\S]+)\.js$/);
		key = prefix + ( key[2] || key[1] );
	}

	for(; i < len; i++) {

		if ( document.scripts[i].id === key ) {

			script = document.scripts[i];
			break;
		}
	}

	xhr.onreadystatechange = getScript;
	xhr.open( 'GET', src );

	storage = JSON.parse(ls.getItem(key));

	if ( !script ) {
		ref = window.document.getElementsByTagName( 'script' )[ 0 ];
		script = window.document.createElement( 'script' );
		script.id = key;
		ref.parentNode.insertBefore( script, ref );
	}

	if ( storage ) {

		if ( storage.data ) {

			content = script.textContent || script.innerText;

			if ( !content ) {

				script.text = storage.data;
			}

			if ( callback && typeof callback === 'function' ) {

				callback(script);
			}
		}
		else {

			if ( script.callbacks ) {

				script.callbacks.push(callback);
			}
			else {

				script.callbacks = [callback];
			}

		}
	}
	else {

		if ( script.callbacks ) {

			script.callbacks.push(callback);
		}
		else {

			script.callbacks = [callback];
		}


		storage = {
			src: src
		};

		ls.setItem(key, JSON.stringify(storage));

		xhr.send();
	}

	return script;
};

/**
 * Moduleloader
 *
 * @param {String} name of the module
 * @param {String} context of the module as css selector string - optional
 * @param {Object} options for the module - optional
 *
 * ToDo: conditional loading like yepnope
 */

APP.loadModule = function ( moduleName ) {

	'use strict';

	var args			= Array.prototype.slice.call(arguments, 0),
		len				= args.length,
		options			= typeof args[len - 1] === 'object' ? args[len - 1] : null, // last argument are the options
		moduleContext	= len >= 2 && typeof args[1] === 'string' ? args[1] : null,
		prefix			= 'js-',
		lastEl			= document.scripts[document.scripts.length - 1],
		head			= window.document.getElementsByTagName( 'head' )[ 0 ],
		element;

	var Mod;

	var previousElementSibling = function( el ) {

	    if( el.previousElementSibling ) {

	        return el.previousElementSibling;
	    } else {

	        while( el = el.previousSibling ) {
	            if( el.nodeType === 1 ) return el;
	        }
	    }
	},

	requireModule = function() {

		require( [moduleName], function ( Module ) {

			if ( Module ) {

				if ( lastEl.parentNode !== head ) {

					element.className += ' ' + prefix + moduleName;

					Mod = new Module(element,options);

				} else {

					Mod = new Module(window, options);

				}

				if ( Mod.init && typeof Mod.init === 'function' ) {
					Mod.init();
				}

			}

		});
	};

	element = moduleContext ? document.querySelector(moduleContext) : previousElementSibling(lastEl);

	if ( !element ) {
		console.warn('Cannot find context for module ' + moduleName + '!');
		return false;
	}

	if ( typeof require === 'undefined' && typeof requirejs === 'undefined' ) {

		APP.loadJS(APP.requirePath, function(){

			requirejs.config(APP.requireConfig);

			requireModule();

		});

	} else {

		requireModule();

	}

};
