(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pan", function() { return Pan; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pan_core_event_emitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Pan_tools_Viewport__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Pan_tools_Mouse__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Pan_tools_Scroll__ = __webpack_require__(8);




var Pan = {
    EventEmitter: __WEBPACK_IMPORTED_MODULE_0__Pan_core_event_emitter__["a" /* EventEmitter */],
    Viewport: __WEBPACK_IMPORTED_MODULE_1__Pan_tools_Viewport__["a" /* Viewport */],
    Mouse: __WEBPACK_IMPORTED_MODULE_2__Pan_tools_Mouse__["a" /* Mouse */],
    Scroll: __WEBPACK_IMPORTED_MODULE_3__Pan_tools_Scroll__["a" /* Scroll */]
};


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventEmitter; });
var EventEmitter = /** @class */ (function () {
    // private constructor() {
    //     this.map = {};
    // }
    function EventEmitter() {
        this.map = {};
    }
    Object.defineProperty(EventEmitter, "Instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    EventEmitter.prototype.on = function (identifier, callback) {
        var key = this.map[identifier];
        if (key === undefined || key === null) {
            this.map[identifier] = new Array();
        }
        this.map[identifier].push(callback);
    };
    EventEmitter.prototype.emit = function (identifer) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var callbacks = this.map[identifer];
        if (callbacks === undefined || callbacks === null) {
            return;
        }
        for (var _a = 0, callbacks_1 = callbacks; _a < callbacks_1.length; _a++) {
            var callback = callbacks_1[_a];
            callback.apply(void 0, args);
        }
    };
    return EventEmitter;
}());



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Viewport; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_event_emitter__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Viewport = /** @class */ (function (_super) {
    __extends(Viewport, _super);
    function Viewport() {
        var _this = _super.call(this) || this;
        _this.viewportModel = {
            aspectRatio: 0,
            devicePixelRatio: 0,
            height: 0,
            width: 0,
        };
        _this.internalEvent();
        _this.initEvents();
        _this.resizeCallback();
        return _this;
    }
    Object.defineProperty(Viewport, "Instance", {
        get: function () {
            return this._viewportInstance || (this._viewportInstance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Viewport.prototype.internalEvent = function () {
        var _this = this;
        window.addEventListener('resize', function (e) { _this.resizeCallback(e); });
    };
    Viewport.prototype.initEvents = function () {
    };
    Viewport.prototype.resizeCallback = function (e) {
        this.viewportModel.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.viewportModel.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.viewportModel.devicePixelRatio = window.devicePixelRatio;
        this.viewportModel.aspectRatio = this.viewportModel.width / this.viewportModel.height;
        this.emit('resize', this.viewportModel);
    };
    Viewport.prototype.emitUpdate = function () {
        this.resizeCallback();
    };
    Viewport.prototype.getWidth = function () {
        return this.viewportModel.width;
    };
    Viewport.prototype.getHeight = function () {
        return this.viewportModel.height;
    };
    return Viewport;
}(__WEBPACK_IMPORTED_MODULE_0__core_event_emitter__["a" /* EventEmitter */]));



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Mouse; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_event_emitter__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Viewport__ = __webpack_require__(6);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Mouse = /** @class */ (function (_super) {
    __extends(Mouse, _super);
    function Mouse() {
        var _this = _super.call(this) || this;
        _this.viewport = __WEBPACK_IMPORTED_MODULE_1__Viewport__["a" /* Viewport */].Instance;
        _this.mouseModel = {
            position: {
                page: { x: 0, y: 0, ratio: { x: 0, y: 0 } },
                viewport: { x: 0, y: 0, ratio: { x: 0, y: 0 } },
            },
            delta: {
                x: 0,
                y: 0
            },
            element: null,
            mouseDown: false
        };
        _this.initEvents();
        return _this;
    }
    Object.defineProperty(Mouse, "Instance", {
        get: function () {
            return this._mouseInstance || (this._mouseInstance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Mouse.prototype.initEvents = function () {
        document.addEventListener('mousemove', this.mouseMoveEvent.bind(this));
        document.addEventListener('mousedown', this.mouseDownEvent.bind(this));
        document.addEventListener('mouseup', this.mouseUpEvent.bind(this));
    };
    // events
    Mouse.prototype.mouseEvent = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.mouseModel.position.page.x = ev.pageX;
        this.mouseModel.position.page.y = ev.pageY;
        this.mouseModel.position.viewport.x = ev.clientX;
        this.mouseModel.position.viewport.y = ev.clientY;
        this.mouseModel.position.viewport.ratio.x = ev.clientX / this.viewport.getWidth();
        this.mouseModel.position.viewport.ratio.y = ev.clientY / this.viewport.getHeight();
        this.mouseModel.element = ev.target;
        this.mouseModel.delta.x = ev.movementX;
        this.mouseModel.delta.y = ev.movementY;
    };
    Mouse.prototype.mouseUpEvent = function (ev) {
        this.mouseEvent(ev);
        this.mouseModel.mouseDown = false;
        this.emit('up', this.mouseModel);
    };
    Mouse.prototype.mouseDownEvent = function (ev) {
        this.mouseEvent(ev);
        this.mouseModel.mouseDown = true;
        this.emit('down', this.mouseModel);
    };
    Mouse.prototype.mouseMoveEvent = function (ev) {
        this.mouseEvent(ev);
        this.emit('move', this.mouseModel);
    };
    return Mouse;
}(__WEBPACK_IMPORTED_MODULE_0__core_event_emitter__["a" /* EventEmitter */]));



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Scroll; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Viewport__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_event_emitter__ = __webpack_require__(5);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Scroll = /** @class */ (function (_super) {
    __extends(Scroll, _super);
    function Scroll() {
        var _this = _super.call(this) || this;
        _this.viewport = __WEBPACK_IMPORTED_MODULE_0__Viewport__["a" /* Viewport */].Instance;
        _this.scrollModel = {
            position: { x: window.scrollX, y: window.scrollY },
            delta: { x: 0, y: 0 }
        };
        _this.initEvents();
        return _this;
    }
    Object.defineProperty(Scroll, "Instance", {
        get: function () {
            return this._scrollInstace || (this._scrollInstace = new this());
        },
        enumerable: true,
        configurable: true
    });
    Scroll.prototype.initEvents = function () {
        window.addEventListener("scroll", this.scrollEvent.bind(this));
        window.addEventListener("wheel", this.wheelScrollEvent.bind(this));
    };
    Scroll.prototype.scrollEvent = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        var xdiff = this.scrollModel.position.x - window.scrollX;
        var ydiff = window.scrollY - this.scrollModel.position.y;
        this.scrollModel.position.x = window.scrollX;
        this.scrollModel.position.y = window.scrollY;
        this.scrollModel.delta.x = xdiff;
        this.scrollModel.delta.y = ydiff;
        this.emit('scroll', this.scrollModel);
    };
    Scroll.prototype.wheelScrollEvent = function (ev) {
        this.scrollModel.position.x = window.scrollX;
        this.scrollModel.position.y = window.scrollY;
        this.scrollModel.delta.x = ev.deltaX;
        this.scrollModel.delta.y = ev.deltaY;
        this.emit('wheel', this.scrollModel);
    };
    return Scroll;
}(__WEBPACK_IMPORTED_MODULE_1__core_event_emitter__["a" /* EventEmitter */]));



/***/ })
/******/ ]);
});