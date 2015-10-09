"use strict";
var Owl = require('./Core');
var Event = Owl.Event;

var AbstractView = new Owl.Class(Event, {	
	// some default configuration
	
	// The real construct method
	_init: function () {
		if (Owl.isFunction(this._super)) this._super.apply(this, arguments);
		this.uniqueId = Owl.uniqueId('view-');
		this._createElement();
		this.initialize.apply(this, arguments);
	},

	id: '',
	tagName: 'div',
	className: '',
	attribute: {},

	_createElement: function () {
		this.el = document.createElement(this.tagName);

	},
	
	// override this initialize method
	initialize: function () { },

	render: function () { return this; },

	remove: function () {

	}
});

Owl.AbstractView = AbstractView;
exports = module.exports = Owl;