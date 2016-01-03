"use strict";
var Owl = require('./Core');
var Event = Owl.Event;
var Class = Owl.Class;

var AbstractModel = new Class(Event, {

	_init: function (attributes, options) {
		if (Owl.isFunction(this._super)) this._super.apply(this, arguments);

		var attrs = attributes;
		this.uniqueId = Owl.uniqueId('model-');
		this.attributes = {};
		this.set(attrs, options);
		this.initialize.apply(this, arguments);
	},

	initialize: function () { },

	get: function (attr) {
		return this.attributes[attr];
	},

	set: function (key, value, options) {
		var attr, attrs, current;
		if (key === null) return this;
		
		// Handle 'key,value' and '{key: value}' style
		if (Owl.isObject(key)) {
			attrs = key;
			options = value;
		} else {
			(attrs = {})[key] = value;
		}

		
		// Copy attrs
		current = this.attributes;
		for (attr in attrs) {
			current[attr] = attrs[attr];
		}
		// Trigger change event
		this.trigger('change');

		return this;
	},

	has: function (attr) {
		return this.get(attr) !== null;
	},

	// Return a copy of the attributes
	toJS: function () {
		// true for deep copy
		return Class.clone(this.attributes, true);
	},

	// Return a string of the attributes
	toJSON: function () {
		return JSON.stringify(this.attributes);
	}
});

Owl.AbstractModel = AbstractModel;
exports = module.exports = Owl;