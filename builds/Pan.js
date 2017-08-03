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
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @class  Detector
 * @author Ariel Saldana / http://ariel.io
 */

var detectorInstance = null;

var Detector = exports.Detector = function () {

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    function Detector(options) {
        _classCallCheck(this, Detector);

        if (!detectorInstance) {
            detectorInstance = this;
        }

        this.options = {};
        this.options.targets = ['html'];

        if (options) this.options = Object.assign(this.options, options);

        // Init
        this.init_detection();
        this.init_classes();

        return detectorInstance;
    }

    /**
     * Detect engine, browser, system and feature in a specified list and store in 'detect' property
     * @return {object} Context
     */


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
                media_query: false,
                motion: false,
                orientation: false
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
            features.motion = !!window.DeviceMotionEvent;
            features.orientation = !!window.DeviceOrientationEvent;

            // Set up
            this.user_agent = user_agent;
            this.plateform = plateform;
            this.browser = browser;
            this.engine = engine;
            this.system = system;
            this.features = features;
            this.categories = ['engine', 'browser', 'system', 'features'];
        }

        /**
         * Add detected informations to the DOM (on <html> by default)
         * @return {object} Context
         */

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Ticker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _event_emitter = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    Ticker
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var tickerInstance = null;

var Ticker = exports.Ticker = function (_EventEmitter) {
    _inherits(Ticker, _EventEmitter);

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    function Ticker(options) {
        var _ret;

        _classCallCheck(this, Ticker);

        var _this = _possibleConstructorReturn(this, (Ticker.__proto__ || Object.getPrototypeOf(Ticker)).call(this, options));

        _this.options = {
            auto_run: false
        };

        if (options) _this.options = Object.assign(_this.options, options);

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

        if (_this.options.auto_run = true) _this.run();
        // this.initial_triggers = ['moo', 'scroll'];

        return _ret = tickerInstance, _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Reset the ticker by setting time infos to 0
     * @param  {boolean} run Start the ticker
     * @param  {ticker}  reset a ticker completely, by default reseting keeps the next interval date.
     * @return {object}      Context
     */


    _createClass(Ticker, [{
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

        /**
         * Run the ticker
         * @return {object} Context
         */

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

        /**
         * Stop listening specified events
         * @param  {string}   names Events names (can contain namespace or be the namespace only)
         * @return {object}         Context
         */

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
        }
    }]);

    return Ticker;
}(_event_emitter.EventEmitter);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Viewport = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event_emitter = __webpack_require__(0);

var _ticker = __webpack_require__(2);

var _detector = __webpack_require__(1);

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

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
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

        if (options) Object.assign(_this.options, options);

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
        _this.aspect_ratio = _this.height / _this.width;
        _this.pixel_ratio = window.devicePixelRatio || 1;

        // Init
        // this.init_disabling_hover_on_scroll();
        _this.init_events();

        return _ret = viewportInstance, _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Init events
     * @return {object} Context
     */


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
            this.aspect_ratio = this.height / this.width;

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.h = exports.patch = undefined;

var _snabbdom = __webpack_require__(25);

var _attributes = __webpack_require__(20);

var _class = __webpack_require__(21);

var _props = __webpack_require__(23);

var _style = __webpack_require__(24);

var _eventlisteners = __webpack_require__(22);

var _h = __webpack_require__(5);

// helper function for creating vnodes
// handles styling on elements with support for animations
// makes it easy to toggle classes
var patch = (0, _snabbdom.init)([_attributes.attributesModule, _class.classModule, _props.propsModule, _style.styleModule, _eventlisteners.eventListenersModule]); // attaches event listeners
// for setting properties on DOM elements
// for setting attributes on DOM elements
exports.patch = patch;
exports.h = _h.h;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.h = h;

var _vnode = __webpack_require__(7);

var _is = __webpack_require__(6);

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function h(sel, b, c) {
    var data = {},
        children,
        text,
        i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        } else if (is.primitive(c)) {
            text = c;
        } else if (c && c.sel) {
            children = [c];
        }
    } else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        } else if (is.primitive(b)) {
            text = b;
        } else if (b && b.sel) {
            children = [b];
        } else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i])) children[i] = (0, _vnode.vnode)(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return (0, _vnode.vnode)(sel, data, children, text, undefined);
}
;
exports.default = h;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.primitive = primitive;
var array = exports.array = Array.isArray;
function primitive(s) {
    return typeof s === 'string' || typeof s === 'number';
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.vnode = vnode;
function vnode(sel, data, children, text, elm) {
    var key = data === undefined ? undefined : data.key;
    return { sel: sel, data: data, children: children,
        text: text, elm: elm, key: key };
}
exports.default = vnode;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Ajax = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @class    ajax.class.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @author   Ariel Saldana / http://ariel.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * TODO:     Add support to add options to the ajax request. (Headers)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _event_emitter = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ajaxInstance = null;

var Ajax = exports.Ajax = function () {

    /**
     * Initialize
     * @constructor
     */
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

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.History = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event_emitter = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    History
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var historyInstance = null;

var History = exports.History = function (_EventEmitter) {
    _inherits(History, _EventEmitter);

    /**
     * Initialise 
     * @constructor
     */
    function History() {
        var _ret;

        _classCallCheck(this, History);

        var _this = _possibleConstructorReturn(this, (History.__proto__ || Object.getPrototypeOf(History)).call(this));

        _this.history = window.history;
        _this.baseUrl = window.location;

        _this.url = '';
        _this.data = '';

        if (!historyInstance) historyInstance = _this;

        return _ret = historyInstance, _possibleConstructorReturn(_this, _ret);
    }

    /**
     * Evit a URL changed event_emitter
     * @return {object} Context
     */


    _createClass(History, [{
        key: 'emitEvent',
        value: function emitEvent(obj) {
            this.trigger('change', [this.url, obj]);
            return this;
        }

        /**
         * Create a URL Object
         * @param {string} path URL path
         * @return {object} URL context 
         */

    }, {
        key: 'createUrl',
        value: function createUrl(path) {
            return new URL(path, this.baseUrl.href);
        }

        /** 
         * Move forward or backwards in history
         * @param {integer} amount The amount to go forward or backwards
         * @return {object} Context
         */

    }, {
        key: 'go',
        value: function go(amount) {
            if (!amount) throw new Error("missing ammount");
            this.history.go(amount);

            return this;
        }

        /**
         * Move backwards in History
         * @return {object} Context
         */

    }, {
        key: 'goBack',
        value: function goBack() {
            this.go(-1);
            return this;
        }

        /**
         * Move forward in History
         * @return {object} Context
         */

    }, {
        key: 'goFoward',
        value: function goFoward() {
            this.go(1);
            return this;
        }

        /**
         * Returns the number of entries in History
         * @return {integer} length
         */

    }, {
        key: 'getNumberOfEntries',
        value: function getNumberOfEntries() {
            return this.history.length;
        }

        /**
         * Push state to history, use this if you want to record the state to history.
         * @param {object} stateObj A State object
         * @param {string} title The title of the page
         * @param {string} url The url
         * @return {object} Context
         */

    }, {
        key: 'push',
        value: function push(stateObj, title, url) {

            // update page title
            if (title) document.title = title;

            this.history.pushState(null, title, url);

            this.url = this.createUrl(url);
            this.emitEvent(stateObj);

            return this;
        }

        /**
         * replace state to history, using this method wont record the url change in history.
         * @param {object} stateObj A State object
         * @param {string} title The title of the page
         * @param {string} url The url
         * @return {object} Context
         */

    }, {
        key: 'replace',
        value: function replace(stateObj, title, url) {
            return this;
        }
    }]);

    return History;
}(_event_emitter.EventEmitter);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Keyboard = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event_emitter = __webpack_require__(0);

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

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    function Keyboard(options) {
        var _ret;

        _classCallCheck(this, Keyboard);

        var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, options));

        if (!keyboardInstance) {
            keyboardInstance = _this;
        }

        _this.options = {};

        if (options) Object.assign(_this.options, options);

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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mouse = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event_emitter = __webpack_require__(0);

var _viewport = __webpack_require__(3);

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

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
    function Mouse(options) {
        var _ret;

        _classCallCheck(this, Mouse);

        var _this = _possibleConstructorReturn(this, (Mouse.__proto__ || Object.getPrototypeOf(Mouse)).call(this, options));

        if (!mouseInstance) {
            mouseInstance = _this;
        }

        _this.options = {};

        if (options) Object.assign(_this.options, options);

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

    /**
     * Listen to events
     * @return {object} Context
     */


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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Offline = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event_emitter = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    offline.class.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    online
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    offline
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @fires    change
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var offlineInstance = null;

var Offline = exports.Offline = function (_EventEmitter) {
    _inherits(Offline, _EventEmitter);

    /**
     * Initialise and merge options
     * @constructor
     * @param {object} options Properties to merge with defaults
     */
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

    /**
     * Listen to events
     * @return {object} Context
     */


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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Component = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // TODO : new component functionality.


var _pandom = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Component = exports.Component = function () {
    function Component() {
        _classCallCheck(this, Component);

        this._refs = new Map();
        this._props = {};
        this.beforeMount();
        try {
            this._node = this.render();
            if (this._node !== undefined) {
                // clone props
                this.props = Object.assign(this._node.data, this.props);
            } else {
                throw new Error("Pan.Component.Render() did not return a node.");
            }
        } catch (e) {
            console.log(e);
        }
        this.findRefs(undefined);
        return this;
    }

    _createClass(Component, [{
        key: "beforeMount",
        value: function beforeMount() {}
    }, {
        key: "setProps",
        value: function setProps(props) {
            for (var key in props) {
                if (props.hasOwnProperty(key)) {
                    this.props[key] = props[key];
                }
            }
            this.update();
        }
    }, {
        key: "update",
        value: function update() {
            this.node = (0, _pandom.patch)(this.node, this.render());
        }
    }, {
        key: "findRefs",
        value: function findRefs(node) {
            if (node === null) {
                return;
            }
            if (node === undefined) {
                node = this.node;
            }
            if (node.data.ref) {
                this._refs.set(node.data.ref, node);
            }
            if (node.children) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = node.children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var child = _step.value;

                        this.findRefs(child);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }, {
        key: "node",
        get: function get() {
            return this._node;
        },
        set: function set(v) {
            this._node = v;
        }
    }, {
        key: "mountedOn",
        get: function get() {
            return this._mountedOn;
        },
        set: function set(v) {
            this._mountedOn = v;
        }
    }, {
        key: "props",
        get: function get() {
            return this._props;
        },
        set: function set(v) {
            this._props = v;
        }
    }]);

    return Component;
}();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Gyroscope = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _event_emitter = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    Gyroscope
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var gyroscopeInstance = null;

var Gyroscope = exports.Gyroscope = function (_EventEmitter) {
    _inherits(Gyroscope, _EventEmitter);

    /**
     * Initialise 
     * @constructor
     */
    function Gyroscope(options) {
        var _ret;

        _classCallCheck(this, Gyroscope);

        var _this = _possibleConstructorReturn(this, (Gyroscope.__proto__ || Object.getPrototypeOf(Gyroscope)).call(this, options));

        if (!gyroscopeInstance) gyroscopeInstance = _this;

        _this.options = {};

        if (options) Object.assign(_this.options, options);

        _this.alpha = 0;
        _this.beta = 0;
        _this.gamma = 0;

        _this.listen_to_events();

        return _ret = gyroscopeInstance, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Gyroscope, [{
        key: 'listen_to_events',
        value: function listen_to_events() {
            var _this2 = this;

            var handle_motion = function handle_motion(e) {};

            var handle_orientation = function handle_orientation(e) {
                _this2.trigger('orientation', [e.alpha, e.beta, e.gamma]);
            };

            // window.addEventListener("devicemotion", this.handle_motion, false );
            if (window.DeviceOrientationEvent) {
                window.addEventListener("deviceorientation", handle_orientation, false);
            }

            // window.fireEvent("deviceorientation");
            // window.dispatchEvent(new Event('deviceorientation'));
        }
    }]);

    return Gyroscope;
}(_event_emitter.EventEmitter);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Router = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _history = __webpack_require__(9);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @class    Router
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author   Ariel Saldana / http://ariel.io
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * TODO:     incrimentaldom example. in router.html on change!
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var routerInstance = null;

var Router = exports.Router = function (_History) {
    _inherits(Router, _History);

    /**
     * Initialize
     * @constructor
     */
    function Router(options) {
        var _ret;

        _classCallCheck(this, Router);

        var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this));

        if (!routerInstance) routerInstance = _this;

        _this.options = {
            routerLinks: {
                selector: "pan-link",
                preventDefault: true
            },

            routes: []
        };

        if (options) Object.assign(_this.options, options);

        _this.routes = {};

        _this.initLinks();
        _this.initRoutes();

        return _ret = routerInstance, _possibleConstructorReturn(_this, _ret);
    }

    // consider moving this to Pan.hash(), instead of in this class.


    _createClass(Router, [{
        key: 'hash',
        value: function hash(str) {
            var hash = 0,
                i,
                chr,
                len;
            if (str.length === 0) return hash;
            for (i = 0, len = str.length; i < len; i++) {
                chr = str.charCodeAt(i);
                hash = (hash << 5) - hash + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }
    }, {
        key: 'initRoutes',
        value: function initRoutes() {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.options.routes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var route = _step.value;

                    var URL = this.createUrl(route.path);
                    var hash = this.hash(URL.pathname);
                    this.routes[hash] = route;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'initLinks',
        value: function initLinks() {
            var _this2 = this;

            var links = document.querySelectorAll('[pan-link]');

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = links[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var link = _step2.value;

                    link.addEventListener('click', function (e) {
                        e.preventDefault();

                        _this2.route(e.srcElement.pathname);
                    });
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'route',
        value: function route(path) {
            var hash = this.hash(path);
            var route = this.routes[hash];

            if (route == undefined) console.warn("That is not a defined route.");else {
                this.push(route, route.title, route.path);
            }
        }
    }]);

    return Router;
}(_history.History);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Tools = undefined;

var _ajax = __webpack_require__(8);

var _detector = __webpack_require__(1);

var _keyboard = __webpack_require__(10);

var _mouse = __webpack_require__(11);

var _offline = __webpack_require__(12);

var _ticker = __webpack_require__(2);

var _viewport = __webpack_require__(3);

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

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Render = Render;

var _pandom = __webpack_require__(4);

var _component = __webpack_require__(13);

function Render(element, on) {
    if (element instanceof _component.Component) {
        element.mountedOn = on;
        (0, _pandom.patch)(on, element.node);
    }
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createElement = createElement;

var _vnode = __webpack_require__(7);

var _is = __webpack_require__(6);

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function addNS(data, children, sel) {
    data.ns = 'http://www.w3.org/2000/svg';
    if (sel !== 'foreignObject' && children !== undefined) {
        for (var i = 0; i < children.length; ++i) {
            var childData = children[i].data;
            if (childData !== undefined) {
                addNS(childData, children[i].children, children[i].sel);
            }
        }
    }
}
function createElement(sel, b, c) {
    var data = {},
        children,
        text,
        i;
    if (c !== undefined) {
        data = b;
        if (is.array(c)) {
            children = c;
        } else if (is.primitive(c)) {
            text = c;
        } else if (c && c.sel) {
            children = [c];
        }
    } else if (b !== undefined) {
        if (is.array(b)) {
            children = b;
        } else if (is.primitive(b)) {
            text = b;
        } else if (b && b.sel) {
            children = [b];
        } else {
            data = b;
        }
    }
    if (is.array(children)) {
        for (i = 0; i < children.length; ++i) {
            if (is.primitive(children[i])) children[i] = (0, _vnode.vnode)(undefined, undefined, undefined, children[i]);
        }
    }
    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' && (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
        addNS(data, children, sel);
    }
    return (0, _vnode.vnode)(sel, data, children, text, undefined);
}
;
exports.default = createElement;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function createElement(tagName) {
    return document.createElement(tagName);
}
function createElementNS(namespaceURI, qualifiedName) {
    return document.createElementNS(namespaceURI, qualifiedName);
}
function createTextNode(text) {
    return document.createTextNode(text);
}
function createComment(text) {
    return document.createComment(text);
}
function insertBefore(parentNode, newNode, referenceNode) {
    parentNode.insertBefore(newNode, referenceNode);
}
function removeChild(node, child) {
    node.removeChild(child);
}
function appendChild(node, child) {
    node.appendChild(child);
}
function parentNode(node) {
    return node.parentNode;
}
function nextSibling(node) {
    return node.nextSibling;
}
function tagName(elm) {
    return elm.tagName;
}
function setTextContent(node, text) {
    node.textContent = text;
}
function getTextContent(node) {
    return node.textContent;
}
function isElement(node) {
    return node.nodeType === 1;
}
function isText(node) {
    return node.nodeType === 3;
}
function isComment(node) {
    return node.nodeType === 8;
}
var htmlDomApi = exports.htmlDomApi = {
    createElement: createElement,
    createElementNS: createElementNS,
    createTextNode: createTextNode,
    createComment: createComment,
    insertBefore: insertBefore,
    removeChild: removeChild,
    appendChild: appendChild,
    parentNode: parentNode,
    nextSibling: nextSibling,
    tagName: tagName,
    setTextContent: setTextContent,
    getTextContent: getTextContent,
    isElement: isElement,
    isText: isText,
    isComment: isComment
};
exports.default = htmlDomApi;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var booleanAttrs = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "compact", "controls", "declare", "default", "defaultchecked", "defaultmuted", "defaultselected", "defer", "disabled", "draggable", "enabled", "formnovalidate", "hidden", "indeterminate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nohref", "noresize", "noshade", "novalidate", "nowrap", "open", "pauseonexit", "readonly", "required", "reversed", "scoped", "seamless", "selected", "sortable", "spellcheck", "translate", "truespeed", "typemustmatch", "visible"];
var xlinkNS = 'http://www.w3.org/1999/xlink';
var xmlNS = 'http://www.w3.org/XML/1998/namespace';
var colonChar = 58;
var xChar = 120;
var booleanAttrsDict = Object.create(null);
for (var i = 0, len = booleanAttrs.length; i < len; i++) {
    booleanAttrsDict[booleanAttrs[i]] = true;
}
function updateAttrs(oldVnode, vnode) {
    var key,
        elm = vnode.elm,
        oldAttrs = oldVnode.data.attrs,
        attrs = vnode.data.attrs;
    if (!oldAttrs && !attrs) return;
    if (oldAttrs === attrs) return;
    oldAttrs = oldAttrs || {};
    attrs = attrs || {};
    // update modified attributes, add new attributes
    for (key in attrs) {
        var cur = attrs[key];
        var old = oldAttrs[key];
        if (old !== cur) {
            if (booleanAttrsDict[key]) {
                if (cur) {
                    elm.setAttribute(key, "");
                } else {
                    elm.removeAttribute(key);
                }
            } else {
                if (key.charCodeAt(0) !== xChar) {
                    elm.setAttribute(key, cur);
                } else if (key.charCodeAt(3) === colonChar) {
                    // Assume xml namespace
                    elm.setAttributeNS(xmlNS, key, cur);
                } else if (key.charCodeAt(5) === colonChar) {
                    // Assume xlink namespace
                    elm.setAttributeNS(xlinkNS, key, cur);
                } else {
                    elm.setAttribute(key, cur);
                }
            }
        }
    }
    // remove removed attributes
    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
    // the other option is to remove all attributes with value == undefined
    for (key in oldAttrs) {
        if (!(key in attrs)) {
            elm.removeAttribute(key);
        }
    }
}
var attributesModule = exports.attributesModule = { create: updateAttrs, update: updateAttrs };
exports.default = attributesModule;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function updateClass(oldVnode, vnode) {
    var cur,
        name,
        elm = vnode.elm,
        oldClass = oldVnode.data.class,
        klass = vnode.data.class;
    if (!oldClass && !klass) return;
    if (oldClass === klass) return;
    oldClass = oldClass || {};
    klass = klass || {};
    for (name in oldClass) {
        if (!klass[name]) {
            elm.classList.remove(name);
        }
    }
    for (name in klass) {
        cur = klass[name];
        if (cur !== oldClass[name]) {
            elm.classList[cur ? 'add' : 'remove'](name);
        }
    }
}
var classModule = exports.classModule = { create: updateClass, update: updateClass };
exports.default = classModule;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function invokeHandler(handler, vnode, event) {
    if (typeof handler === "function") {
        // call function handler
        handler.call(vnode, event, vnode);
    } else if ((typeof handler === "undefined" ? "undefined" : _typeof(handler)) === "object") {
        // call handler with arguments
        if (typeof handler[0] === "function") {
            // special case for single argument for performance
            if (handler.length === 2) {
                handler[0].call(vnode, handler[1], event, vnode);
            } else {
                var args = handler.slice(1);
                args.push(event);
                args.push(vnode);
                handler[0].apply(vnode, args);
            }
        } else {
            // call multiple handlers
            for (var i = 0; i < handler.length; i++) {
                invokeHandler(handler[i]);
            }
        }
    }
}
function handleEvent(event, vnode) {
    var name = event.type,
        on = vnode.data.on;
    // call event handler(s) if exists
    if (on && on[name]) {
        invokeHandler(on[name], vnode, event);
    }
}
function createListener() {
    return function handler(event) {
        handleEvent(event, handler.vnode);
    };
}
function updateEventListeners(oldVnode, vnode) {
    var oldOn = oldVnode.data.on,
        oldListener = oldVnode.listener,
        oldElm = oldVnode.elm,
        on = vnode && vnode.data.on,
        elm = vnode && vnode.elm,
        name;
    // optimization for reused immutable handlers
    if (oldOn === on) {
        return;
    }
    // remove existing listeners which no longer used
    if (oldOn && oldListener) {
        // if element changed or deleted we remove all existing listeners unconditionally
        if (!on) {
            for (name in oldOn) {
                // remove listener if element was changed or existing listeners removed
                oldElm.removeEventListener(name, oldListener, false);
            }
        } else {
            for (name in oldOn) {
                // remove listener if existing listener removed
                if (!on[name]) {
                    oldElm.removeEventListener(name, oldListener, false);
                }
            }
        }
    }
    // add new listeners which has not already attached
    if (on) {
        // reuse existing listener or create new
        var listener = vnode.listener = oldVnode.listener || createListener();
        // update vnode for listener
        listener.vnode = vnode;
        // if element changed or added we add all needed listeners unconditionally
        if (!oldOn) {
            for (name in on) {
                // add listener if element was changed or new listeners added
                elm.addEventListener(name, listener, false);
            }
        } else {
            for (name in on) {
                // add listener if new listener added
                if (!oldOn[name]) {
                    elm.addEventListener(name, listener, false);
                }
            }
        }
    }
}
var eventListenersModule = exports.eventListenersModule = {
    create: updateEventListeners,
    update: updateEventListeners,
    destroy: updateEventListeners
};
exports.default = eventListenersModule;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function updateProps(oldVnode, vnode) {
    var key,
        cur,
        old,
        elm = vnode.elm,
        oldProps = oldVnode.data.props,
        props = vnode.data.props;
    if (!oldProps && !props) return;
    if (oldProps === props) return;
    oldProps = oldProps || {};
    props = props || {};
    for (key in oldProps) {
        if (!props[key]) {
            delete elm[key];
        }
    }
    for (key in props) {
        cur = props[key];
        old = oldProps[key];
        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
            elm[key] = cur;
        }
    }
}
var propsModule = exports.propsModule = { create: updateProps, update: updateProps };
exports.default = propsModule;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var raf = typeof window !== 'undefined' && window.requestAnimationFrame || setTimeout;
var nextFrame = function nextFrame(fn) {
    raf(function () {
        raf(fn);
    });
};
function setNextFrame(obj, prop, val) {
    nextFrame(function () {
        obj[prop] = val;
    });
}
function updateStyle(oldVnode, vnode) {
    var cur,
        name,
        elm = vnode.elm,
        oldStyle = oldVnode.data.style,
        style = vnode.data.style;
    if (!oldStyle && !style) return;
    if (oldStyle === style) return;
    oldStyle = oldStyle || {};
    style = style || {};
    var oldHasDel = 'delayed' in oldStyle;
    for (name in oldStyle) {
        if (!style[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.removeProperty(name);
            } else {
                elm.style[name] = '';
            }
        }
    }
    for (name in style) {
        cur = style[name];
        if (name === 'delayed') {
            for (name in style.delayed) {
                cur = style.delayed[name];
                if (!oldHasDel || cur !== oldStyle.delayed[name]) {
                    setNextFrame(elm.style, name, cur);
                }
            }
        } else if (name !== 'remove' && cur !== oldStyle[name]) {
            if (name[0] === '-' && name[1] === '-') {
                elm.style.setProperty(name, cur);
            } else {
                elm.style[name] = cur;
            }
        }
    }
}
function applyDestroyStyle(vnode) {
    var style,
        name,
        elm = vnode.elm,
        s = vnode.data.style;
    if (!s || !(style = s.destroy)) return;
    for (name in style) {
        elm.style[name] = style[name];
    }
}
function applyRemoveStyle(vnode, rm) {
    var s = vnode.data.style;
    if (!s || !s.remove) {
        rm();
        return;
    }
    var name,
        elm = vnode.elm,
        i = 0,
        compStyle,
        style = s.remove,
        amount = 0,
        applied = [];
    for (name in style) {
        applied.push(name);
        elm.style[name] = style[name];
    }
    compStyle = getComputedStyle(elm);
    var props = compStyle['transition-property'].split(', ');
    for (; i < props.length; ++i) {
        if (applied.indexOf(props[i]) !== -1) amount++;
    }
    elm.addEventListener('transitionend', function (ev) {
        if (ev.target === elm) --amount;
        if (amount === 0) rm();
    });
}
var styleModule = exports.styleModule = {
    create: updateStyle,
    update: updateStyle,
    destroy: applyDestroyStyle,
    remove: applyRemoveStyle
};
exports.default = styleModule;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.thunk = exports.h = undefined;

var _h = __webpack_require__(5);

Object.defineProperty(exports, 'h', {
    enumerable: true,
    get: function get() {
        return _h.h;
    }
});

var _thunk = __webpack_require__(26);

Object.defineProperty(exports, 'thunk', {
    enumerable: true,
    get: function get() {
        return _thunk.thunk;
    }
});
exports.init = init;

var _vnode = __webpack_require__(7);

var _vnode2 = _interopRequireDefault(_vnode);

var _is = __webpack_require__(6);

var is = _interopRequireWildcard(_is);

var _htmldomapi = __webpack_require__(19);

var _htmldomapi2 = _interopRequireDefault(_htmldomapi);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isUndef(s) {
    return s === undefined;
}
function isDef(s) {
    return s !== undefined;
}
var emptyNode = (0, _vnode2.default)('', {}, [], undefined, undefined);
function sameVnode(vnode1, vnode2) {
    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
function isVnode(vnode) {
    return vnode.sel !== undefined;
}
function createKeyToOldIdx(children, beginIdx, endIdx) {
    var i = void 0,
        map = {},
        key = void 0,
        ch = void 0;
    for (i = beginIdx; i <= endIdx; ++i) {
        ch = children[i];
        if (ch != null) {
            key = ch.key;
            if (key !== undefined) map[key] = i;
        }
    }
    return map;
}
var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
function init(modules, domApi) {
    var i = void 0,
        j = void 0,
        cbs = {};
    var api = domApi !== undefined ? domApi : _htmldomapi2.default;
    for (i = 0; i < hooks.length; ++i) {
        cbs[hooks[i]] = [];
        for (j = 0; j < modules.length; ++j) {
            var hook = modules[j][hooks[i]];
            if (hook !== undefined) {
                cbs[hooks[i]].push(hook);
            }
        }
    }
    function emptyNodeAt(elm) {
        var id = elm.id ? '#' + elm.id : '';
        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
        return (0, _vnode2.default)(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
    }
    function createRmCb(childElm, listeners) {
        return function rmCb() {
            if (--listeners === 0) {
                var parent = api.parentNode(childElm);
                api.removeChild(parent, childElm);
            }
        };
    }
    function createElm(vnode, insertedVnodeQueue) {
        var i = void 0,
            data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.init)) {
                i(vnode);
                data = vnode.data;
            }
        }
        var children = vnode.children,
            sel = vnode.sel;
        if (sel === '!') {
            if (isUndef(vnode.text)) {
                vnode.text = '';
            }
            vnode.elm = api.createComment(vnode.text);
        } else if (sel !== undefined) {
            // Parse selector
            var hashIdx = sel.indexOf('#');
            var dotIdx = sel.indexOf('.', hashIdx);
            var hash = hashIdx > 0 ? hashIdx : sel.length;
            var dot = dotIdx > 0 ? dotIdx : sel.length;
            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag) : api.createElement(tag);
            if (hash < dot) elm.id = sel.slice(hash + 1, dot);
            if (dotIdx > 0) elm.className = sel.slice(dot + 1).replace(/\./g, ' ');
            for (i = 0; i < cbs.create.length; ++i) {
                cbs.create[i](emptyNode, vnode);
            }if (is.array(children)) {
                for (i = 0; i < children.length; ++i) {
                    var ch = children[i];
                    if (ch != null) {
                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
                    }
                }
            } else if (is.primitive(vnode.text)) {
                api.appendChild(elm, api.createTextNode(vnode.text));
            }
            i = vnode.data.hook; // Reuse variable
            if (isDef(i)) {
                if (i.create) i.create(emptyNode, vnode);
                if (i.insert) insertedVnodeQueue.push(vnode);
            }
        } else {
            vnode.elm = api.createTextNode(vnode.text);
        }
        return vnode.elm;
    }
    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
        for (; startIdx <= endIdx; ++startIdx) {
            var ch = vnodes[startIdx];
            if (ch != null) {
                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
            }
        }
    }
    function invokeDestroyHook(vnode) {
        var i = void 0,
            j = void 0,
            data = vnode.data;
        if (data !== undefined) {
            if (isDef(i = data.hook) && isDef(i = i.destroy)) i(vnode);
            for (i = 0; i < cbs.destroy.length; ++i) {
                cbs.destroy[i](vnode);
            }if (vnode.children !== undefined) {
                for (j = 0; j < vnode.children.length; ++j) {
                    i = vnode.children[j];
                    if (i != null && typeof i !== "string") {
                        invokeDestroyHook(i);
                    }
                }
            }
        }
    }
    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
        for (; startIdx <= endIdx; ++startIdx) {
            var _i = void 0,
                listeners = void 0,
                rm = void 0,
                ch = vnodes[startIdx];
            if (ch != null) {
                if (isDef(ch.sel)) {
                    invokeDestroyHook(ch);
                    listeners = cbs.remove.length + 1;
                    rm = createRmCb(ch.elm, listeners);
                    for (_i = 0; _i < cbs.remove.length; ++_i) {
                        cbs.remove[_i](ch, rm);
                    }if (isDef(_i = ch.data) && isDef(_i = _i.hook) && isDef(_i = _i.remove)) {
                        _i(ch, rm);
                    } else {
                        rm();
                    }
                } else {
                    api.removeChild(parentElm, ch.elm);
                }
            }
        }
    }
    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
        var oldStartIdx = 0,
            newStartIdx = 0;
        var oldEndIdx = oldCh.length - 1;
        var oldStartVnode = oldCh[0];
        var oldEndVnode = oldCh[oldEndIdx];
        var newEndIdx = newCh.length - 1;
        var newStartVnode = newCh[0];
        var newEndVnode = newCh[newEndIdx];
        var oldKeyToIdx = void 0;
        var idxInOld = void 0;
        var elmToMove = void 0;
        var before = void 0;
        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
            if (oldStartVnode == null) {
                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
            } else if (oldEndVnode == null) {
                oldEndVnode = oldCh[--oldEndIdx];
            } else if (newStartVnode == null) {
                newStartVnode = newCh[++newStartIdx];
            } else if (newEndVnode == null) {
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newStartVnode)) {
                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
                oldStartVnode = oldCh[++oldStartIdx];
                newStartVnode = newCh[++newStartIdx];
            } else if (sameVnode(oldEndVnode, newEndVnode)) {
                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
                oldEndVnode = oldCh[--oldEndIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldStartVnode, newEndVnode)) {
                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
                oldStartVnode = oldCh[++oldStartIdx];
                newEndVnode = newCh[--newEndIdx];
            } else if (sameVnode(oldEndVnode, newStartVnode)) {
                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
                oldEndVnode = oldCh[--oldEndIdx];
                newStartVnode = newCh[++newStartIdx];
            } else {
                if (oldKeyToIdx === undefined) {
                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
                }
                idxInOld = oldKeyToIdx[newStartVnode.key];
                if (isUndef(idxInOld)) {
                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    newStartVnode = newCh[++newStartIdx];
                } else {
                    elmToMove = oldCh[idxInOld];
                    if (elmToMove.sel !== newStartVnode.sel) {
                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
                    } else {
                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
                        oldCh[idxInOld] = undefined;
                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
                    }
                    newStartVnode = newCh[++newStartIdx];
                }
            }
        }
        if (oldStartIdx > oldEndIdx) {
            before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
            addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
        } else if (newStartIdx > newEndIdx) {
            removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
        }
    }
    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
        var i = void 0,
            hook = void 0;
        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
            i(oldVnode, vnode);
        }
        var elm = vnode.elm = oldVnode.elm;
        var oldCh = oldVnode.children;
        var ch = vnode.children;
        if (oldVnode === vnode) return;
        if (vnode.data !== undefined) {
            for (i = 0; i < cbs.update.length; ++i) {
                cbs.update[i](oldVnode, vnode);
            }i = vnode.data.hook;
            if (isDef(i) && isDef(i = i.update)) i(oldVnode, vnode);
        }
        if (isUndef(vnode.text)) {
            if (isDef(oldCh) && isDef(ch)) {
                if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue);
            } else if (isDef(ch)) {
                if (isDef(oldVnode.text)) api.setTextContent(elm, '');
                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
            } else if (isDef(oldCh)) {
                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
            } else if (isDef(oldVnode.text)) {
                api.setTextContent(elm, '');
            }
        } else if (oldVnode.text !== vnode.text) {
            api.setTextContent(elm, vnode.text);
        }
        if (isDef(hook) && isDef(i = hook.postpatch)) {
            i(oldVnode, vnode);
        }
    }
    return function patch(oldVnode, vnode) {
        var i = void 0,
            elm = void 0,
            parent = void 0;
        var insertedVnodeQueue = [];
        for (i = 0; i < cbs.pre.length; ++i) {
            cbs.pre[i]();
        }if (!isVnode(oldVnode)) {
            oldVnode = emptyNodeAt(oldVnode);
        }
        if (sameVnode(oldVnode, vnode)) {
            patchVnode(oldVnode, vnode, insertedVnodeQueue);
        } else {
            elm = oldVnode.elm;
            parent = api.parentNode(elm);
            createElm(vnode, insertedVnodeQueue);
            if (parent !== null) {
                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
                removeVnodes(parent, [oldVnode], 0, 0);
            }
        }
        for (i = 0; i < insertedVnodeQueue.length; ++i) {
            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
        }
        for (i = 0; i < cbs.post.length; ++i) {
            cbs.post[i]();
        }return vnode;
    };
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.thunk = undefined;

var _h = __webpack_require__(5);

function copyToThunk(vnode, thunk) {
    thunk.elm = vnode.elm;
    vnode.data.fn = thunk.data.fn;
    vnode.data.args = thunk.data.args;
    thunk.data = vnode.data;
    thunk.children = vnode.children;
    thunk.text = vnode.text;
    thunk.elm = vnode.elm;
}
function init(thunk) {
    var cur = thunk.data;
    var vnode = cur.fn.apply(undefined, cur.args);
    copyToThunk(vnode, thunk);
}
function prepatch(oldVnode, thunk) {
    var i = void 0,
        old = oldVnode.data,
        cur = thunk.data;
    var oldArgs = old.args,
        args = cur.args;
    if (old.fn !== cur.fn || oldArgs.length !== args.length) {
        copyToThunk(cur.fn.apply(undefined, args), thunk);
    }
    for (i = 0; i < args.length; ++i) {
        if (oldArgs[i] !== args[i]) {
            copyToThunk(cur.fn.apply(undefined, args), thunk);
            return;
        }
    }
    copyToThunk(oldVnode, thunk);
}
var thunk = exports.thunk = function thunk(sel, key, fn, args) {
    if (args === undefined) {
        args = fn;
        fn = key;
        key = undefined;
    }
    return (0, _h.h)(sel, {
        key: key,
        hook: { init: init, prepatch: prepatch },
        fn: fn,
        args: args
    });
};
exports.default = thunk;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _event_emitter = __webpack_require__(0);

Object.defineProperty(exports, 'EventEmitter', {
  enumerable: true,
  get: function get() {
    return _event_emitter.EventEmitter;
  }
});

var _component = __webpack_require__(13);

Object.defineProperty(exports, 'Component', {
  enumerable: true,
  get: function get() {
    return _component.Component;
  }
});

var _pandom = __webpack_require__(4);

Object.defineProperty(exports, 'patch', {
  enumerable: true,
  get: function get() {
    return _pandom.patch;
  }
});
Object.defineProperty(exports, 'h', {
  enumerable: true,
  get: function get() {
    return _pandom.h;
  }
});

var _render = __webpack_require__(17);

Object.defineProperty(exports, 'Render', {
  enumerable: true,
  get: function get() {
    return _render.Render;
  }
});

var _dom = __webpack_require__(18);

Object.defineProperty(exports, 'createElement', {
  enumerable: true,
  get: function get() {
    return _dom.createElement;
  }
});

var _ajax = __webpack_require__(8);

Object.defineProperty(exports, 'Ajax', {
  enumerable: true,
  get: function get() {
    return _ajax.Ajax;
  }
});

var _detector = __webpack_require__(1);

Object.defineProperty(exports, 'Detector', {
  enumerable: true,
  get: function get() {
    return _detector.Detector;
  }
});

var _history = __webpack_require__(9);

Object.defineProperty(exports, 'History', {
  enumerable: true,
  get: function get() {
    return _history.History;
  }
});

var _keyboard = __webpack_require__(10);

Object.defineProperty(exports, 'Keyboard', {
  enumerable: true,
  get: function get() {
    return _keyboard.Keyboard;
  }
});

var _mouse = __webpack_require__(11);

Object.defineProperty(exports, 'Mouse', {
  enumerable: true,
  get: function get() {
    return _mouse.Mouse;
  }
});

var _offline = __webpack_require__(12);

Object.defineProperty(exports, 'Offline', {
  enumerable: true,
  get: function get() {
    return _offline.Offline;
  }
});

var _ticker = __webpack_require__(2);

Object.defineProperty(exports, 'Ticker', {
  enumerable: true,
  get: function get() {
    return _ticker.Ticker;
  }
});

var _router = __webpack_require__(15);

Object.defineProperty(exports, 'Router', {
  enumerable: true,
  get: function get() {
    return _router.Router;
  }
});

var _viewport = __webpack_require__(3);

Object.defineProperty(exports, 'Viewport', {
  enumerable: true,
  get: function get() {
    return _viewport.Viewport;
  }
});

var _gyroscope = __webpack_require__(14);

Object.defineProperty(exports, 'Gyroscope', {
  enumerable: true,
  get: function get() {
    return _gyroscope.Gyroscope;
  }
});

var _tools = __webpack_require__(16);

Object.defineProperty(exports, 'Tools', {
  enumerable: true,
  get: function get() {
    return _tools.Tools;
  }
});

/***/ })
/******/ ]);
});