(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Pan"] = factory();
	else
		root["Pan"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _event_emitter = __webpack_require__(1);

	Object.defineProperty(exports, 'EventEmitter', {
	  enumerable: true,
	  get: function get() {
	    return _event_emitter.EventEmitter;
	  }
	});

	var _ajax = __webpack_require__(2);

	Object.defineProperty(exports, 'Ajax', {
	  enumerable: true,
	  get: function get() {
	    return _ajax.Ajax;
	  }
	});

	var _detector = __webpack_require__(3);

	Object.defineProperty(exports, 'Detector', {
	  enumerable: true,
	  get: function get() {
	    return _detector.Detector;
	  }
	});

	var _keyboard = __webpack_require__(4);

	Object.defineProperty(exports, 'Keyboard', {
	  enumerable: true,
	  get: function get() {
	    return _keyboard.Keyboard;
	  }
	});

	var _mouse = __webpack_require__(5);

	Object.defineProperty(exports, 'Mouse', {
	  enumerable: true,
	  get: function get() {
	    return _mouse.Mouse;
	  }
	});

	var _offline = __webpack_require__(8);

	Object.defineProperty(exports, 'Offline', {
	  enumerable: true,
	  get: function get() {
	    return _offline.Offline;
	  }
	});

	var _ticker = __webpack_require__(7);

	Object.defineProperty(exports, 'Ticker', {
	  enumerable: true,
	  get: function get() {
	    return _ticker.Ticker;
	  }
	});

	var _viewport = __webpack_require__(6);

	Object.defineProperty(exports, 'Viewport', {
	  enumerable: true,
	  get: function get() {
	    return _viewport.Viewport;
	  }
	});

	var _tools = __webpack_require__(9);

	Object.defineProperty(exports, 'Tools', {
	  enumerable: true,
	  get: function get() {
	    return _tools.Tools;
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * @class  Event Emmiter
	 * @author Ariel Saldana / http://ahhriel.com
	 */

	var EventEmitter = exports.EventEmitter = function () {

	    /**
	     * Initialise and merge options
	     * @constructor
	     * @param {object} options Properties to merge with defaults
	     */
	    function EventEmitter(options) {
	        _classCallCheck(this, EventEmitter);

	        // if (eventEmitterInstance != null)
	        // return eventEmitterInstance;
	        this.callbacks = {};
	        this.callbacks.base = {};

	        return this;
	    }

	    /**
	     * Start listening specified events
	     * @param  {string}   names    Events names (can contain namespace)
	     * @param  {function} callback Function to apply if events are triggered
	     * @return {object}            Context
	     * @example
	     *
	     *     on( 'event-1.namespace event-2.namespace event-3', function( value )
	     *     {
	     *         console.log( 'fire !', value );
	     *     } );
	     */


	    _createClass(EventEmitter, [{
	        key: 'on',
	        value: function on(names, callback) {
	            var _this = this;

	            // errors
	            if (typeof names === 'undefined' || names === '') {
	                console.warn('wrong names');
	                return false;
	            }

	            if (typeof callback === 'undefined') {
	                console.warn('wrong callback');
	                return false;
	            }

	            // Resolve names
	            names = this.resolve_names(names);

	            // Each name      
	            names.forEach(function (name) {

	                // Resolve name
	                name = _this.resolve_name(name);

	                // Create namespace if it does not exist
	                if (!(_this.callbacks[name.namespace] instanceof Object)) _this.callbacks[name.namespace] = {};

	                // create callback if it does not exist
	                if (!(_this.callbacks[name.namespace][name.value] instanceof Array)) _this.callbacks[name.namespace][name.value] = [];

	                // add callback
	                _this.callbacks[name.namespace][name.value].push(callback);
	            });

	            return this;
	        }

	        /**
	         * Stop listening specified events
	         * @param  {string}   names Events names (can contain namespace or be the namespace only)
	         * @return {object}         Context
	         * @example
	         *
	         *     off( 'event-1 event-2' );
	         *
	         *     off( 'event-3.namespace' );
	         *
	         *     off( '.namespace' );
	         *
	         */

	    }, {
	        key: 'off',
	        value: function off(names) {
	            var _this2 = this;

	            // errors
	            if (typeof names === 'undefined' || names === '') {
	                console.warn('wrong name');
	                return false;
	            }

	            // resolve names
	            names = this.resolve_names(names);

	            // each name


	            // names.forEach ( function( name ) 
	            names.forEach(function (name) {

	                // resolve name
	                name = _this2.resolve_name(name);

	                // remove namespace
	                if (name.namespace !== 'base' && name.value === '') {
	                    delete _this2.callbacks[name.namespace];
	                }

	                // remove specific callback in namespace
	                else {
	                        // try to remove from each namespace
	                        if (name.namespace === 'base') {
	                            for (var namespace in _this2.callbacks) {
	                                if (_this2.callbacks[namespace] instanceof Object && _this2.callbacks[namespace][name.value] instanceof Array) {
	                                    delete _this2.callbacks[namespace][name.value];

	                                    // remove namespace if empty.
	                                    if (Object.keys(_this2.callbacks[namespace]).length === 0) {
	                                        delete _this2.callbacks[namespace];
	                                    }
	                                }
	                            }
	                        }

	                        // specified namespace
	                        else if (_this2.callbacks[name.namespace] instanceof Object && _this2.callbacks[name.namespace][name.value] instanceof Array) {
	                                delete _this2.callbacks[name.namespace][name.value];

	                                // remove namespace if empty
	                                if (Object.keys(_this2.callbacks[name.namespace]).length === 0) delete _this2.callbacks[name.namespace];
	                            }
	                    }
	            });
	        }

	        /**
	         * Fires event
	         * @param  {string} name Event name (single)
	         * @param  {array} args  Arguments to send to callbacks
	         * @return {boolean}     First value sent by the callbacks applieds
	         */

	    }, {
	        key: 'trigger',
	        value: function trigger(name, args) {

	            // errors
	            if (typeof name === 'undefined' || name === '') {
	                console.warn('wrong name');
	                return false;
	            }

	            var final_result, result;

	            // default args
	            if (!(args instanceof Array)) args = [];

	            // Resolve names (should on have one event)
	            name = this.resolve_names(name);

	            // Resolve name
	            name = this.resolve_name(name[0]);

	            // Default namespace
	            if (name.namespace === 'base') {
	                // Try to find callback in each namespace
	                for (var namespace in this.callbacks) {
	                    if (this.callbacks[namespace] instanceof Object && this.callbacks[namespace][name.value] instanceof Array) {
	                        this.callbacks[namespace][name.value].forEach(function (callback) {
	                            result = callback.apply(this, args);

	                            if (typeof final_result === 'undefined') final_result = result;
	                        });
	                    }
	                }
	            }

	            // specified namespace
	            else if (this.callbacks[name.namespace] instanceof Object) {
	                    if (name.value === '') {
	                        console.warn('wrong name');
	                        return this;
	                    }

	                    this.callbacks[name.namespace][name.value].forEach(function (callback) {
	                        result = callback.apply(this, args);

	                        if (typeof final_result === 'undefined') final_result = result;
	                    });
	                }

	            return final_result;
	        }

	        /**
	         * Trigga wut say wut
	         */

	    }, {
	        key: 'trigga',
	        value: function trigga(name, args) {
	            return this.trigger(name, args);
	        }
	        /**
	         * Dispatch
	         */

	    }, {
	        key: 'dispatch',
	        value: function dispatch(name, args) {
	            return this.trigger(name, args);
	        }
	        /**
	         * Fire everything !
	         * https://www.youtube.com/watch?v=1Io0OQ2zPS4
	         */

	    }, {
	        key: 'fire',
	        value: function fire(name, args) {
	            return this.trigger(name, args);
	        }

	        /**
	         * Resolve events names
	         * @param  {string} names Events names
	         * @return {array}        Array of names (with namespace included in name)
	         */

	    }, {
	        key: 'resolve_names',
	        value: function resolve_names(names) {
	            names = names.replace(/[^a-zA-Z0-9 ,\/.]/g, '');
	            names = names.replace(/[,\/]+/g, ' ');
	            names = names.split(' ');

	            return names;
	        }

	        /**
	         * Resolve event name
	         * @param  {string} name Event name
	         * @return {object}      Event object containing original name, real event name and namespace
	         */

	    }, {
	        key: 'resolve_name',
	        value: function resolve_name(name) {
	            var new_name = {},
	                parts = name.split('.');

	            new_name.original = name;
	            new_name.value = parts[0];
	            new_name.namespace = 'base';

	            if (parts.length > 1 && parts[1] === '') new_name.namespace = parts[1];

	            return new_name;
	        }
	    }]);

	    return EventEmitter;
	}();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Ajax = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class    ajax.class.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author   Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO:     Add support to add options to the ajax request. (Headers)
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _event_emitter = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ajaxInstance = null;

	var Ajax = exports.Ajax = function () {
	    function Ajax() {
	        _classCallCheck(this, Ajax);

	        if (!ajaxInstance) ajaxInstance = this;

	        return ajaxInstance;
	    }

	    /**
	     * Get content
	     * @return {promise} Context
	     */

	    _createClass(Ajax, [{
	        key: 'get',
	        value: function get(url) {
	            return new Promise(function (resolve, reject) {
	                var request = new XMLHttpRequest();
	                request.onreadystatechange = function () {
	                    if (request.readyState === 4) {
	                        if (this.status === 200) {
	                            // Success
	                            resolve(this.response);
	                        } else {
	                            // Something went wrong (404 etc.)
	                            reject(new Error(this.statusText));
	                        }
	                    }
	                };
	                request.onerror = function () {
	                    reject(new Error('XMLHttpRequest Error: ' + this.statusText));
	                };
	                request.open('GET', url);
	                request.send();
	            });
	        }

	        /**
	         * Get a JSON object
	         * @return {promise} Context
	         */

	    }, {
	        key: 'getJson',
	        value: function getJson(url) {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                _this.get(url).then(function (value) {
	                    resolve(JSON.parse(value));
	                }, function (reason) {
	                    console.error(reason);
	                    reject(new Error(reason));
	                });
	            });
	        }
	    }]);

	    return Ajax;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Detector = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class  Detector
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

	var _event_emitter = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var detectorInstance = null;

	var Detector = exports.Detector = function () {
	    function Detector(options) {
	        _classCallCheck(this, Detector);

	        // super(options);
	        if (!detectorInstance) {
	            detectorInstance = this;
	        }

	        this.options = {};
	        this.options.targets = ['html'];

	        // Init
	        this.init_detection();
	        this.init_classes();

	        return detectorInstance;
	    }

	    _createClass(Detector, [{
	        key: 'init_detection',
	        value: function init_detection() {
	            // Prepare
	            var engine = {
	                ie: 0,
	                gecko: 0,
	                webkit: 0,
	                khtml: 0,
	                opera: 0,
	                version: 0
	            };

	            var browser = {
	                ie: 0,
	                firefox: 0,
	                safari: 0,
	                konq: 0,
	                opera: 0,
	                chrome: 0,
	                version: 0
	            };

	            var system = {
	                windows: false,
	                mac: false,
	                osx: false,
	                iphone: false,
	                ipod: false,
	                ipad: false,
	                ios: false,
	                blackberry: false,
	                android: false,
	                opera_mini: false,
	                windows_mobile: false,
	                wii: false,
	                ps: false
	            };

	            var features = {
	                touch: false,
	                media_query: false
	            };

	            var user_agent = navigator.userAgent;

	            if (window.opera) {
	                engine.version = browser.version = window.opera.version();
	                engine.opera = browser.opera = parseInt(engine.version);
	            } else if (/AppleWebKit\/(\S+)/.test(user_agent) || /AppleWebkit\/(\S+)/.test(user_agent)) {
	                engine.version = RegExp.$1;
	                engine.webkit = parseInt(engine.version);

	                // figure out if it's Chrome or Safari
	                if (/Chrome\/(\S+)/.test(user_agent)) {
	                    browser.version = RegExp.$1;
	                    browser.chrome = parseInt(browser.version);
	                } else if (/Version\/(\S+)/.test(user_agent)) {
	                    browser.version = RegExp.$1;
	                    browser.safari = parseInt(browser.version);
	                } else {
	                    // Approximate version
	                    var safariVersion = 1;

	                    if (engine.webkit < 100) safariVersion = 1;else if (engine.webkit < 312) safariVersion = 1.2;else if (engine.webkit < 412) safariVersion = 1.3;else safariVersion = 2;

	                    browser.safari = browser.version = safariVersion;
	                }
	            } else if (/KHTML\/(\S+)/.test(user_agent) || /Konqueror\/([^;]+)/.test(user_agent)) {
	                engine.version = browser.version = RegExp.$1;
	                engine.khtml = browser.konq = parseInt(engine.version);
	            } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(user_agent)) {
	                engine.version = RegExp.$1;
	                engine.gecko = parseInt(engine.version);

	                // Determine if it's Firefox
	                if (/Firefox\/(\S+)/.test(user_agent)) {
	                    browser.version = RegExp.$1;
	                    browser.firefox = parseInt(browser.version);
	                }
	            } else if (/MSIE ([^;]+)/.test(user_agent)) {
	                engine.version = browser.version = RegExp.$1;
	                engine.ie = browser.ie = parseInt(engine.version);
	            } else if (/Trident.*rv[ :]*(11[\.\d]+)/.test(user_agent)) {
	                engine.version = browser.version = RegExp.$1;
	                engine.ie = browser.ie = parseInt(engine.version);
	            }

	            // Detect browsers
	            browser.ie = engine.ie;
	            browser.opera = engine.opera;

	            // Detect platform (using navigator.plateform)
	            var plateform = navigator.platform;
	            // system.windows = plateform.indexOf( 'Win' ) === 0;
	            // system.mac     = plateform.indexOf( 'Mac' ) === 0;
	            // system.x11     = ( plateform === 'X11' ) || ( plateform.indexOf( 'Linux' ) === 0);

	            // Detect platform (using navigator.userAgent)
	            system.windows = !!user_agent.match(/Win/);
	            system.mac = !!user_agent.match(/Mac/);
	            // system.x11     = ( plateform === 'X11' ) || ( plateform.indexOf( 'Linux' ) === 0);

	            // Detect windows operating systems
	            if (system.windows) {
	                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(user_agent)) {
	                    if (RegExp.$1 === 'NT') {
	                        switch (RegExp.$2) {
	                            case '5.0':
	                                system.windows = '2000';
	                                break;

	                            case '5.1':
	                                system.windows = 'XP';
	                                break;

	                            case '6.0':
	                                system.windows = 'Vista';
	                                break;

	                            default:
	                                system.windows = 'NT';
	                                break;
	                        }
	                    } else if (RegExp.$1 === '9x') {
	                        system.windows = 'ME';
	                    } else {
	                        system.windows = RegExp.$1;
	                    }
	                }
	            }

	            // Detect mobile (mix between OS and device)
	            system.nokia = !!user_agent.match(/Nokia/i);
	            system.kindle_fire = !!user_agent.match(/Silk/);
	            system.iphone = !!user_agent.match(/iPhone/);
	            system.ipod = !!user_agent.match(/iPod/);
	            system.ipad = !!user_agent.match(/iPad/);
	            system.blackberry = !!user_agent.match(/BlackBerry/) || !!user_agent.match(/BB[0-9]+/) || !!user_agent.match(/PlayBook/);
	            system.android = !!user_agent.match(/Android/);
	            system.opera_mini = !!user_agent.match(/Opera Mini/i);
	            system.windows_mobile = !!user_agent.match(/IEMobile/i);

	            // iOS / OS X exception
	            system.ios = system.iphone || system.ipod || system.ipad;
	            system.osx = !system.ios && !!user_agent.match(/OS X/);

	            // Detect gaming systems
	            system.wii = user_agent.indexOf('Wii') > -1;
	            system.playstation = /playstation/i.test(user_agent);

	            //Detect features (Not as reliable as Modernizr)
	            features.touch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch);
	            features.media_query = !!(window.matchMedia || window.msMatchMedia);

	            // Set up
	            this.user_agent = user_agent;
	            this.plateform = plateform;
	            this.browser = browser;
	            this.engine = engine;
	            this.system = system;
	            this.features = features;
	            this.categories = ['engine', 'browser', 'system', 'features'];
	        }
	    }, {
	        key: 'init_classes',
	        value: function init_classes() {
	            // Don't add
	            if (!this.options.targets || this.options.targets.length === 0) return false;

	            // Set up
	            var targets = [],
	                target = null;

	            // Each element that need to add classes
	            for (var i = 0, len = this.options.targets.length; i < len; i++) {
	                // Target
	                target = this.options.targets[i];

	                // String
	                if (typeof target === 'string') {
	                    // Target
	                    switch (target) {
	                        case 'html':
	                            targets.push(document.documentElement);
	                            break;

	                        case 'body':
	                            targets.push(document.body);
	                            break;

	                        default:
	                            var temp_targets = document.querySelectorAll(target);

	                            for (var j = 0; j < temp_targets.length; j++) {
	                                targets.push(temp_targets[j]);
	                            }break;
	                    }
	                }
	                // DOM Element
	                else if (target instanceof Element) {
	                        targets.push(target);
	                    }

	                // Targets found
	                if (targets.length) {
	                    this.classes = [];

	                    // Each category
	                    for (var category in this) {
	                        // Allowed
	                        if (this.categories.indexOf(category) !== -1) {
	                            // Each property in category
	                            for (var property in this[category]) {
	                                var value = this[category][property];

	                                // Ignore version
	                                if (property !== 'version') {
	                                    // Feature
	                                    if (category === 'features') {
	                                        this.classes.push(category + '-' + (value ? '' : 'no-') + property);
	                                    }

	                                    // Not feature
	                                    else {
	                                            if (value) {
	                                                this.classes.push(category + '-' + property);
	                                                if (category === 'browser') this.classes.push(category + '-' + property + '-' + value);
	                                            }
	                                        }
	                                }
	                            }
	                        }
	                    }

	                    // Add classes
	                    for (var j = 0; j < targets.length; j++) {
	                        targets[j].classList.add.apply(targets[j].classList, this.classes);
	                    }
	                }
	            }

	            return this;
	        }
	    }]);

	    return Detector;
	}();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Keyboard = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event_emitter = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class  Keyboard
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires  down
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires  up
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var keyboardInstance = null;

	var Keyboard = exports.Keyboard = function (_EventEmitter) {
	    _inherits(Keyboard, _EventEmitter);

	    function Keyboard(options) {
	        var _ret;

	        _classCallCheck(this, Keyboard);

	        var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, options));

	        if (!keyboardInstance) {
	            keyboardInstance = _this;
	        }

	        _this.options = {};
	        _this.keycode_names = {
	            91: 'cmd',
	            17: 'ctrl',
	            32: 'space',
	            16: 'shift',
	            18: 'alt',
	            20: 'caps',
	            9: 'tab',
	            13: 'enter',
	            8: 'backspace',
	            38: 'up',
	            39: 'right',
	            40: 'down',
	            37: 'left',
	            27: 'esc'
	        };

	        _this.downs = [];
	        _this.listen_to_events();

	        return _ret = keyboardInstance, _possibleConstructorReturn(_this, _ret);
	    }

	    /**
	     * Listen to events
	     * @return {object} Context
	     */


	    _createClass(Keyboard, [{
	        key: 'listen_to_events',
	        value: function listen_to_events() {
	            var _this2 = this;

	            //down
	            var keydown_handle = function keydown_handle(e) {
	                var character = _this2.keycode_to_character(e.keyCode);

	                if (_this2.downs.indexOf(character) === -1) _this2.downs.push(character);

	                if (_this2.trigger('down', [e.keyCode, character]) === false) {
	                    e = e || window.event;

	                    if (e.preventDefault) e.preventDefault();else e.returnValue = false;
	                }
	            };

	            var keyup_handle = function keyup_handle(e) {
	                var character = _this2.keycode_to_character(e.character);

	                if (_this2.downs.indexOf(character) !== -1) _this2.downs.splice(_this2.downs.indexOf(character), 1);

	                _this2.trigger('up', [e.keyCode, character]);
	            };

	            // Listen
	            if (document.addEventListener) {
	                document.addEventListener('keydown', keydown_handle, false);
	                document.addEventListener('keyup', keyup_handle, false);
	            } else {
	                document.attachEvent('onkeydown', keydown_handle, false);
	                document.attachEvent('onkeyup', keyup_handle, false);
	            }

	            return this;
	        }

	        /**
	         * Convert a keycode to a char
	         * @param  {integer} input Original keycode
	         * @return {string}        Output
	         */

	    }, {
	        key: 'keycode_to_character',
	        value: function keycode_to_character(input) {
	            var output = this.keycode_names[input];
	            if (!output) output = String.fromCharCode(input).toLowerCase();

	            return output;
	        }

	        /**
	         * Test if keys are down
	         * @param  {array} inputs Array of char to test as strings
	         * @return {boolean}      True if every keys are down
	         */

	    }, {
	        key: 'are_down',
	        value: function are_down(inputs) {
	            var down = true;

	            for (var i = 0; i < inputs.length; i++) {
	                var key = inputs[i];

	                if (typeof key === 'number') key = this.keycode_to_character(key);

	                if (this.downs.indexOf(key) === -1) down = false;
	            }

	            return down;
	        }

	        /**
	         * Test if key is down
	         * @param  {string}  input Char as string
	         * @return {boolean}       True if key is down
	         */

	    }, {
	        key: 'is_down',
	        value: function is_down(input) {
	            return this.are_down([input]);
	        }
	    }]);

	    return Keyboard;
	}(_event_emitter.EventEmitter);

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Mouse = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event_emitter = __webpack_require__(1);

	var _viewport = __webpack_require__(6);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    Mouse
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    down
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    up
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    move
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    wheel
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @requires Viewport
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var mouseInstance = null;

	var Mouse = exports.Mouse = function (_EventEmitter) {
	    _inherits(Mouse, _EventEmitter);

	    function Mouse(options) {
	        var _ret;

	        _classCallCheck(this, Mouse);

	        var _this = _possibleConstructorReturn(this, (Mouse.__proto__ || Object.getPrototypeOf(Mouse)).call(this, options));

	        if (!mouseInstance) {
	            mouseInstance = _this;
	        }

	        _this.options = {};

	        _this.viewport = new _viewport.Viewport();
	        _this.down = false;
	        _this.position = {};
	        _this.position.x = 0;
	        _this.position.y = 0;
	        _this.position.ratio = {};
	        _this.position.ratio.x = 0;
	        _this.position.ratio.y = 0;
	        _this.wheel = {};
	        _this.wheel.delta = 0;

	        _this.listen_to_events();

	        return _ret = mouseInstance, _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Mouse, [{
	        key: 'listen_to_events',
	        value: function listen_to_events() {
	            var _this2 = this;

	            var mouse_down_handle = function mouse_down_handle(e) {
	                _this2.down = true;

	                if (_this2.trigger('down', [_this2.position, e.target]) === false) {
	                    e.preventDefault();
	                }
	            };

	            var mouse_up_handle = function mouse_up_handle(e) {
	                _this2.down = false;

	                _this2.trigger('up', [_this2.position, e.target]);
	            };

	            var mouse_move_handle = function mouse_move_handle(e) {
	                _this2.position.x = e.clientX;
	                _this2.position.y = e.clientY;

	                _this2.position.ratio.x = _this2.position.x / _this2.viewport.width;
	                _this2.position.ratio.y = _this2.position.y / _this2.viewport.height;

	                _this2.trigger('move', [_this2.position, e.target]);
	            };

	            var mouse_wheel_handle = function mouse_wheel_handle(e) {
	                _this2.wheel.delta = e.wheelDeltaY || e.wheelDelta || -e.detail;

	                if (_this2.trigger('wheel', [_this2.wheel]) === false) {
	                    e.preventDefault();
	                    return false;
	                }
	            };

	            // Listen
	            if (document.addEventListener) {
	                document.addEventListener('mousedown', mouse_down_handle, false);
	                document.addEventListener('mouseup', mouse_up_handle, false);
	                document.addEventListener('mousemove', mouse_move_handle, false);
	                document.addEventListener('mousewheel', mouse_wheel_handle, false);
	                document.addEventListener('DOMMouseScroll', mouse_wheel_handle, false);
	            } else {
	                document.attachEvent('onmousedown', mouse_down_handle, false);
	                document.attachEvent('onmouseup', mouse_up_handle, false);
	                document.attachEvent('onmousemove', mouse_move_handle, false);
	                document.attachEvent('onmousewheel', mouse_wheel_handle, false);
	            }

	            return this;
	        }
	    }]);

	    return Mouse;
	}(_event_emitter.EventEmitter);

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Viewport = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event_emitter = __webpack_require__(1);

	var _ticker = __webpack_require__(7);

	var _detector = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    Viewport
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    resize
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    scroll
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @requires Ticker
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var viewportInstance = null;

	var Viewport = exports.Viewport = function (_EventEmitter) {
	    _inherits(Viewport, _EventEmitter);

	    function Viewport(options) {
	        var _ret;

	        _classCallCheck(this, Viewport);

	        var _this = _possibleConstructorReturn(this, (Viewport.__proto__ || Object.getPrototypeOf(Viewport)).call(this, options));

	        if (!viewportInstance) {
	            viewportInstance = _this;
	        }

	        _this.options = {};
	        _this.options.disable_hover_on_scroll = false;
	        _this.options.initial_triggers = ['resize', 'scroll'];

	        _this.ticker = new _ticker.Ticker();
	        _this.detector = new _detector.Detector();
	        _this.top = 0;
	        _this.left = 0;
	        _this.y = 0;
	        _this.x = 0;
	        _this.scroll = {};
	        _this.scroll.delta = {};
	        _this.scroll.delta.top = 0;
	        _this.scroll.delta.left = 0;
	        _this.scroll.delta.y = 0;
	        _this.scroll.delta.x = 0;
	        _this.scroll.direction = {};
	        _this.scroll.direction.x = null;
	        _this.scroll.direction.y = null;
	        _this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	        _this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	        _this.pixel_ratio = window.devicePixelRatio || 1;

	        // Init
	        // this.init_disabling_hover_on_scroll();
	        _this.init_events();

	        return _ret = viewportInstance, _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Viewport, [{
	        key: 'init_events',
	        value: function init_events() {
	            var _this2 = this;

	            var resize_callback = function resize_callback() {
	                _this2.resize_handler();
	            };

	            var scroll_callback = function scroll_callback() {
	                _this2.scroll_handler();
	            };

	            window.addEventListener('resize', resize_callback);
	            window.addEventListener('scroll', scroll_callback);

	            if (this.options.initial_triggers.length) {

	                this.ticker.wait(1, function () {
	                    for (var i = 0; i < _this2.options.initial_triggers.length; i++) {
	                        // Set up
	                        var action = _this2.options.initial_triggers[i],
	                            method = _this2[action + '_handler'];

	                        // Method exist
	                        if (typeof method === 'function') {
	                            // Trigger
	                            method.apply(_this2);
	                        }
	                    }
	                });
	            }

	            return this;
	        }

	        /**
	         * Handle the resize event
	         * @return {object} Context
	         */

	    }, {
	        key: 'resize_handler',
	        value: function resize_handler() {
	            // Set up
	            this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	            this.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

	            // Trigger
	            this.trigger('resize', [this.width, this.height]);

	            return this;
	        }

	        /**
	         * Handle the scroll event
	         * @return {object} Context
	         */

	    }, {
	        key: 'scroll_handler',
	        value: function scroll_handler() {
	            // Set up
	            var top = typeof window.pageYOffset !== 'undefined' ? window.pageYOffset : window.document.documentElement.scrollTop,
	                left = typeof window.pageXOffset !== 'undefined' ? window.pageXOffset : window.document.documentElement.scrollLeft;

	            this.scroll.direction.y = top > this.top ? 'down' : 'up';
	            this.scroll.direction.x = left > this.left ? 'right' : 'left';
	            this.scroll.delta.top = top - this.top;
	            this.scroll.delta.left = left - this.left;
	            this.top = top;
	            this.left = left;

	            // Alias
	            this.y = this.top;
	            this.x = this.left;
	            this.scroll.delta.y = this.scroll.delta.top;
	            this.scroll.delta.x = this.scroll.delta.left;

	            // Trigger
	            this.trigger('scroll', [this.top, this.left, this.scroll]);

	            return this;
	        }

	        /**
	         * Disable pointer events on body when scrolling for performance
	         * @return {object} Context
	         */

	    }, {
	        key: 'init_disabling_hover_on_scroll',
	        value: function init_disabling_hover_on_scroll() {

	            var timeout = null,
	                active = false;

	            this.on('scroll', function () {
	                if (!that.options.disable_hover_on_scroll) return;

	                if (timeout) window.clearTimeout(timeout);

	                if (!active) {
	                    active = true;
	                    document.body.style.pointerEvents = 'none';
	                }

	                timeout = window.setTimeout(function () {
	                    active = false;
	                    document.body.style.pointerEvents = 'auto';
	                }, 60);
	            });
	            return this;
	        }

	        /**
	         * Test media and return false if not compatible
	         * @param  {string} condition Condition to test
	         * @return {boolean}          Match
	         */

	    }, {
	        key: 'match_media',
	        value: function match_media(condition) {
	            if (!this.detector.features.media_query || typeof condition !== 'string' || condition === '') return false;

	            return !!window.matchMedia(condition).matches;
	        }
	    }]);

	    return Viewport;
	}(_event_emitter.EventEmitter);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Ticker = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _event_emitter = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    Ticker
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var tickerInstance = null;

	var Ticker = exports.Ticker = function (_EventEmitter) {
	    _inherits(Ticker, _EventEmitter);

	    function Ticker() {
	        var _ret;

	        _classCallCheck(this, Ticker);

	        var _this = _possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).call(this));

	        if (!tickerInstance) {
	            tickerInstance = _this;
	        }

	        _this.reseted = false;
	        _this.running = false;
	        _this.time = {};
	        _this.time.start = 0;
	        _this.time.elapsed = 0;
	        _this.time.delta = 0;
	        _this.time.current = 0;
	        _this.waits = {};
	        _this.waits.before = [];
	        _this.waits.after = [];
	        _this.intervals = {};

	        _this.run();
	        // this.initial_triggers = ['moo', 'scroll'];

	        return _ret = tickerInstance, _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Ticker, [{
	        key: 'test',
	        value: function test() {}

	        /**
	         * Reset the ticker by setting time infos to 0
	         * @param  {boolean} run Start the ticker
	         * @param  {ticker}  reset a ticker completely, by default reseting keeps the next interval date.
	         * @return {object}      Context
	         */

	    }, {
	        key: 'reset',
	        value: function reset(run, interval) {
	            this.reseted = true;

	            this.time.start = +new Date();
	            this.time.current = this.time.start;
	            this.time.elapsed = 0;
	            this.time.delta = 0;

	            if (run) this.run();

	            if (interval) {
	                that.destroy_interval(interval);
	                that.create_interval(interval);
	            }

	            return this;
	        }
	    }, {
	        key: 'run',
	        value: function run() {
	            var _this2 = this;

	            if (this.running) return;

	            this.running = true;

	            var loop = function loop() {
	                if (_this2.running) window.requestAnimationFrame(loop);

	                _this2.tick();
	            };

	            loop();

	            return this;
	        }

	        /**
	         * Stop ticking
	         * @return {object} Context
	         */

	    }, {
	        key: 'stop',
	        value: function stop() {
	            this.running = false;
	            return this;
	        }

	        /**
	         * Tick (or is it tack ?)
	         * @return {object} Context
	         */

	    }, {
	        key: 'tick',
	        value: function tick() {
	            if (!this.reseted) this.reset();

	            this.time.current = +new Date();
	            this.time.delta = this.time.current - this.time.start - this.time.elapsed;
	            this.time.elapsed = this.time.current - this.time.start;

	            var i = 0,
	                len = this.waits.before.length,
	                wait = null;

	            for (; i < len; i++) {
	                // Set up
	                wait = this.waits.before[i];

	                // Frame count down to 0
	                if (--wait.frames_count === 0) {
	                    // Apply action
	                    wait.action.apply(this, [this.time]);

	                    // Remove from actions
	                    this.waits.before.splice(i, 1);

	                    // Update loop indexes
	                    i--;
	                    len--;
	                }
	            }

	            this.trigger('tick', [this.time]);
	            // Trigger intervals
	            this.trigger_intervals();

	            // Do next (after trigger)
	            i = 0;
	            len = this.waits.after.length;
	            for (; i < len; i++) {
	                // Set up
	                wait = this.waits.after[i];

	                // Frame count down to 0
	                if (--wait.frames_count === 0) {
	                    // Apply action
	                    wait.action.apply(this, [this.time]);

	                    // Remove from actions
	                    this.waits.after.splice(i, 1);

	                    // Update loop indexes
	                    i--;
	                    len--;
	                }
	            }

	            return this;
	        }

	        /**
	         * Apply function on X frames
	         * @param  {number}   frames_count How many frames before applying the function
	         * @param  {function} action       Function to apply
	         * @param  {boolean}  after        Should apply the function after the 'tick' event is triggered
	         * @return {object}                Context
	         */

	    }, {
	        key: 'wait',
	        value: function wait(frames_count, action, after) {
	            // Errors
	            if (typeof action !== 'function') return false;

	            if (typeof frames_count !== 'number') return false;

	            this.waits[after ? 'after' : 'before'].push({
	                frames_count: frames_count,
	                action: action
	            });

	            return this;
	        }

	        /**
	         * Create interval
	         * @param  {integer} interval Milliseconds between each tick
	         * @return {object}           Context
	         */

	    }, {
	        key: 'create_interval',
	        value: function create_interval(interval) {
	            this.intervals[interval] = {
	                interval: interval,
	                next_trigger: interval,
	                start: this.time.elapsed,
	                last_trigger: this.time.elapsed
	            };

	            return this;
	        }

	        /**
	         * Destroy interval
	         * @param  {integer} interval Milliseconds between each tick
	         * @return {object}           Context
	         */

	    }, {
	        key: 'destroy_interval',
	        value: function destroy_interval(interval) {
	            delete this.intervals[interval];
	            return this;
	        }

	        /**
	         * Trigger intervals
	         * @return {object}           Context
	         */

	    }, {
	        key: 'trigger_intervals',
	        value: function trigger_intervals() {
	            // Each interval
	            for (var _key in this.intervals) {
	                var interval = this.intervals[_key];

	                // Test if interval should trigger
	                if (this.time.elapsed - interval.last_trigger > interval.next_trigger) {
	                    // Update next trigger to stay as close as possible to the interval
	                    interval.next_trigger = interval.interval - (this.time.elapsed - interval.start) % interval.interval;

	                    interval.last_trigger = this.time.elapsed;
	                    this.trigger('tick-' + interval.interval, [this.time, interval]);
	                }
	            }

	            return this;
	        }

	        /**
	         * Start listening specified events
	         * @param  {string}   names    Events names (can contain namespace)
	         * @param  {function} callback Function to apply if events are triggered
	         * @return {object}            Context
	         */

	    }, {
	        key: 'on',
	        value: function on(names, callback) {
	            var _this3 = this;

	            _get(Ticker.prototype.__proto__ || Object.getPrototypeOf(Ticker.prototype), 'on', this).call(this, names, callback);
	            var resolved_names = this.resolve_names(names);

	            // Each resolved name
	            // resolved_names.forEach( function( name )
	            resolved_names.forEach(function (name) {
	                // Has interval interval
	                if (name.match(/^tick([0-9]+)$/)) {
	                    // Extract interval interval
	                    var interval = parseInt(name.replace(/^tick([0-9]+)$/, '$1'));

	                    // Create interval
	                    if (interval) _this3.create_interval(interval);
	                }
	            });

	            // return this._super( names, callback );
	        }
	    }, {
	        key: 'off',
	        value: function off(names) {
	            var _this4 = this;

	            _get(Ticker.prototype.__proto__ || Object.getPrototypeOf(Ticker.prototype), 'off', this).call(this, names);
	            // Set up
	            var resolved_names = this.resolve_names(names);

	            // Each resolved name
	            resolved_names.forEach(function (name) {
	                // Has interval interval
	                if (name.match(/^tick([0-9]+)$/)) {
	                    // Extract interval interval
	                    var interval = parseInt(name.replace(/^tick([0-9]+)$/, '$1'));

	                    // Create interval
	                    if (interval) _this4.destroy_interval(interval);
	                }
	            });

	            // super();
	            // return this._super( names );
	        }
	    }]);

	    return Ticker;
	}(_event_emitter.EventEmitter);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Offline = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _event_emitter = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    offline.class.js
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var offlineInstance = null;

	var Offline = exports.Offline = function (_EventEmitter) {
	    _inherits(Offline, _EventEmitter);

	    function Offline(options) {
	        var _ret;

	        _classCallCheck(this, Offline);

	        // super(options);

	        var _this = _possibleConstructorReturn(this, (Offline.__proto__ || Object.getPrototypeOf(Offline)).call(this, options));

	        if (!offlineInstance) offlineInstance = _this;

	        _this.options = {
	            classes: {
	                active: true,
	                target: document.body,
	                offline: 'offline',
	                online: 'online'
	            }
	        };

	        _this.status = null;
	        _this.listen_to_events();

	        return _ret = offlineInstance, _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Offline, [{
	        key: 'listen_to_events',
	        value: function listen_to_events() {
	            var _this2 = this;

	            // online
	            var change = function change() {

	                if (navigator.onLine) {
	                    if (_this2.options.classes.active) {
	                        _this2.options.classes.target.classList.remove(_this2.options.classes.offline);
	                        _this2.options.classes.target.classList.add(_this2.options.classes.online);
	                    }

	                    // update status
	                    _this2.status = 'online';

	                    // Trigger bang bang
	                    _this2.trigger('online');
	                    _this2.trigger('change', [_this2.status]);
	                } else {
	                    if (_this2.options.classes.active) {
	                        _this2.options.classes.target.classList.remove(_this2.options.classes.online);
	                        _this2.options.classes.target.classList.add(_this2.options.classes.offline);
	                    }

	                    // update status
	                    _this2.status = 'offline';

	                    // trigger
	                    _this2.trigger('offline');
	                    _this2.trigger('change', [_this2.status]);
	                }
	            };

	            if (window.addEventListener) {
	                window.addEventListener('online', change, false);
	                window.addEventListener('offline', change, false);
	            } else {
	                document.body.ononline = change;
	                document.body.offline = change;
	            }

	            change();

	            return this;
	        }
	    }]);

	    return Offline;
	}(_event_emitter.EventEmitter);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Tools = undefined;

	var _ajax = __webpack_require__(2);

	var _detector = __webpack_require__(3);

	var _keyboard = __webpack_require__(4);

	var _mouse = __webpack_require__(5);

	var _offline = __webpack_require__(8);

	var _ticker = __webpack_require__(7);

	var _viewport = __webpack_require__(6);

	var Tools = {
	    Ajax: _ajax.Ajax,
	    Detector: _detector.Detector,
	    Keyboard: _keyboard.Keyboard,
	    Mouse: _mouse.Mouse,
	    Offline: _offline.Offline,
	    Ticker: _ticker.Ticker,
	    Viewport: _viewport.Viewport
	};

	exports.Tools = Tools;

/***/ }
/******/ ])
});
;