/******/ (function(modules) { // webpackBootstrap
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

	var Core = __webpack_require__(1);
	var Class = __webpack_require__(2);
	var Event = __webpack_require__(3);
	var AbstractView = __webpack_require__(4);
	var AbstractModel = __webpack_require__(5);


	var Owl = Core;

	exports = module.exports = Owl;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var Owl = Owl || {};

	Owl.isObject = function (obj) {
		return typeof obj === "object" && obj !== null;
	}

	Owl.isFunction = function (func) {
		return typeof func === 'function' || false;
	};

	Owl.isArray = Array.isArray || function (arr) {
		return 	Object.prototype.toString.apply(arr) === "[object Array]";
	};

	Owl.isString = function (str) {
		return Object.prototype.toString.apply(str) === "[object String]";
	};


	Owl.uniqueIdGenerator = function(prefix) {
		var idCounter = 0;
		return function(){
			var id = ++idCounter + '';	
			return prefix? prefix + id : id;
		}
		
	}

	exports = module.exports = Owl;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Owl = __webpack_require__(1);

	var Class = function (Super, properties) {

		var _class, _proto, _props;

		_class = function () {
			this._init.apply(this, arguments);
		};
		_props = properties || {};

		if (Owl.isFunction(Super)) {
			// Check if constructor
			_proto = Class.create(Super.prototype);
			_class.prototype = Class.assign(_proto, _props);
			_class.prototype._super = Super.prototype.init;
		} else if (Owl.isObject(Super)) {
							
			// Check if Array
			if (Owl.isArray(Super)) { }
			
			// plain object
			else {
				_class.prototype = Super;
				_class.prototype._super = function () { };
			}
		}
		// default constructor method
		_class.prototype._init = _class.prototype._init || function () { if (Owl.isFunction(this._super)) this._super.apply(this, arguments); };
		return _class;
	};

	Class.create = Object.create || function (proto) {
		var F = function () { };
		F.prototype = proto;
		return new F();
	};

	Class.mixin = Class.assign = Object.assign || function (target, sources) {
		var sourceList = Array.prototype.slice.call(sources, 1);
		sourceList.forEach(function (source) {
			if (Owl.isArray(source)) {
				return;
			}
			for (var prop in source) {
				target[prop] = source[prop];
			}
		});
		return target;
	};

	Class.clone = function (obj, deep) {
		var _deep = deep || false;
		var res;

		var shallowClone = function (target) {
			var o = {};
			for (var prop in target) {
				o[prop] = target[prop];
			}
			return o;
		};

		var deepClone = function (target) {
			var o;
			if (typeof target === "object") {
				if (target === null) {
					o = null
				} else if (Owl.isArray(target)) {
					o = [];
					for (var i = 0; i < target.length; i++) {
						o.push(deepClone(target[i]));
					}
				} else {
					o = {};
					for (var k in target) {
						o[k] = deepClone(target[k]);
					}
				}
			} else {
				o = target;
			}
			return o;
		};

		if (_deep) {
			res = deepClone(obj);
		} else {
			res = shallowClone(obj);
		}
		return res;
	};

	Owl.Class = Class;
	exports = module.exports = Owl;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Owl = __webpack_require__(1);

	var Event = new Owl.Class({

		on: function (event, callback) {

			var events, name;
			if (!Owl.isString(event) || !Owl.isFunction(callback)) {
				return this;
			}
			this._callbacks = this._callbacks || {};
			events = event.split(" ");
			for (var i = 0; i < events.length; i++) {
				name = events[i];
				if (name in this._callbacks) {
				} else {
					this._callbacks[name] = [];
				}
				this._callbacks[name].push(callback);

			}

			return this;
		},

		bind: function () {
			return this.on.apply(this, arguments);
		},

		off: function (event, callback) {

			var events, name, cbList, newCbList, cb, i, j, k;
			if (!Owl.isString(event)) {
				return this;
			}
			if (!this._callbacks) return;

			events = event.split(" ");
			for (i = 0; i < events.length; i++) {
				name = events[i];
				if (name in this._callbacks) {
					cbList = this._callbacks[name];
					if (!callback) {
						delete this._callbacks[name];
						continue;
					}
					
					// check if the callback in the event callback array in a loop
					for (j = k = 0; k < cbList.length; k = ++j) {
						cb = cbList[j];
						if (cb !== callback) {
							continue;
						}
						newCbList = cbList.slice();
						newCbList.splice(j, 1);
						this._callbacks[name] = newCbList;
						break;
					}
				}
			}

			return this;
		},

		unbind: function () {
			return this.off.apply(this, arguments);
		},

		once: function (event, callback) {
			var handler = function () {
				this.off(event, handler);
				return callback.apply(this, arguments);
			}.bind(this);
			return this.on(event, handler);
		},

		listenTo: function (obj, event, callback) {
			obj.bind(event, callback);
			this._listenTo = this._listenTo || [];
			this._listenTo.push({
				obj: obj,
				event: event,
				callback: callback
			});
			return this;
		},

		stopListening: function (obj, event, callback) {
			var listenTo, newListenTo, events, item, res, i, j;
			if (!this._listenTo) { return this; }
			listenTo = this._listenTo;
			// If there is no argument, remove all listener
			if (arguments.length === 0) {
				listenTo.forEach(function (item) {
					item.obj.unbind(item.event, item.callback);
				});
				this._listenTo = void 0;
			} else if (obj) {
				events = event.split(' ');
				for (i = j = 0; j < listenTo.length; i = ++j) {
					item = listenTo[i];
					if (item.obj === obj) {
						item.obj.unbind(item.event, item.callback);
					}
					newListenTo = listenTo.slice();
					newListenTo.splice(i, 1);
					this._listenTo = newListenTo;
					break;
				}
				this._listenTo = res;
			}

			return this;
		},

		trigger: function (event) {
			var events, name, callback;
			if (!Owl.isString(event)) {
				return this;
			}
			events = event.split(" ");
			for (var i = 0; i < events.length; i++) {
				name = events[i];
				if (name in this._callbacks) {
					for (var j = 0; j < this._callbacks[name].length; j++) {
						callback = this._callbacks[name][j];
						callback();
					}
				} else {
					continue;
				}
			}

			return this;
		},

		removeAll: function () {
			this._callbacks = void 0;
			this._listenTo = void 0;
			return this;
		}
	});

	Owl.Event = Event;
	exports = module.exports = Owl;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Owl = __webpack_require__(1);
	var Event = Owl.Event;

	var AbstractView = new Owl.Class(Event, {	
		// some default configuration
		uniqueIdGen: Owl.uniqueIdGenerator('view-'),
		// The real construct method
		_init: function () {
			if (Owl.isFunction(this._super)) this._super.apply(this, arguments);
			this.uniqueId = this.uniqueIdGen();
			this.initialize.apply(this, arguments);
		},

		tagName: 'div',

		// override this initialize method
		initialize: function () { },

		render: function () { return this; }


	});

	Owl.AbstractView = AbstractView;
	exports = module.exports = Owl;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Owl = __webpack_require__(1);
	var Event = Owl.Event;
	var Class = Owl.Class;

	var AbstractModel = new Owl.Class(Event, {

		uniqueIdGen: Owl.uniqueIdGenerator('model-'),

		_init: function (attributes, options) {
			if (Owl.isFunction(this._super)) this._super.apply(this, arguments);

			var attrs = attributes;
			this.uniqueId = this.uniqueIdGenerator();
			this.attributes = {};
			this.set(attrs, options);
			this.initialize.apply(this, arguments);
		},

		initialize: function () { },

		get: function (attr) {
			return this.attributes[attr];
		},

		set: function (key, value, options) {
			
			if (key == null) return this;
			
			// Hanlde key-value and {key: value} style
			if(Owl.isObject(key)) {
				
			}
			
			// Trigger change event
			this.trigger('change');
		},
		
		has: function(attr) {
			return this.get(attr) !== null;
		},

		toJS: function () {
			return this.attributes;
		},

		toJSON: function () {
			return JSON.stringify(this.attributes);
		}
	});

	Owl.AbstractModel = AbstractModel;
	exports = module.exports = Owl;

/***/ }
/******/ ]);