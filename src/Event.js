"use strict";

var Owl = require('./Core');

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

	off: function (event, callback) {

		var events, name;
		if (!Owl.isString(event) || !Owl.isFunction(callback)) {
			return this;
		}

		events = event.split(" ");
		for (var i = 0; i < events.length; i++) {
			name = events[i];
			if(name in this._callbacks) {
				if(callback in this._callbacks[name]) {
					delete this._callbacks[name];
				}
			}
		}
		
		return this;
	},

	once: function () { },

	listenTo: function () { },

	stopListening: function () { },

	trigger: function (event) { 
		var events, name, callback;
		if(!Owl.isString(event)){
			return this;
		}
		events = event.split(" ");
		for(var i = 0; i <events.length; i++) {
			name = events[i];
			if(name in this._callbacks) {
				for(var j = 0; j < this._callbacks[name].length; j++) {
					callback = this._callbacks[name][j];
					if(Owl.isFunction(callback)) {
						callback.apply(this, arguments);
					} else {
						continue;
					}
				}
			} else {
				continue;
			}
		} 
	},

	removeAll: function () {
		this._callbacks = {};
		return this;
	}
});

Owl.Event = Event;
exports = module.exports = Owl;