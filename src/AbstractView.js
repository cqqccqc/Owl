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

	$: function (selector) {
		return this.$el.find(selector);
	},
	
	// override this initialize method
	initialize: function () { },

	/**
	 * events: {
	 * 	
	 * }
	 */
	delegateEvents: function() {
		
	},
	
	render: function () { return this; },
	
	remove: function () {
		this.$el.remove(); // remove dom node
		this.removeAll(); // stop all event listener
	},
	
	_createElement: function () {
		var attr;
		var el = this.el = document.createElement(this.tagName);
		el.setAttribute('id', this.id);
		el.setAttribute('class', this.className);
		for (attr in this.attribute) {
			if (this.attribute.hasOwnProperty(attr)) {
				el[attr] = this.attribute[attr];
			}
		}
	}
});

Owl.AbstractView = AbstractView;
exports = module.exports = Owl;