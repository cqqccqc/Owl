"use strict";
var Owl = require('./Core');
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