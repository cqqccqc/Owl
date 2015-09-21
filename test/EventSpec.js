'use strict';
var chai = require('chai');
var Event = require('../src/Event.js');

describe("This test if for Event module", function () {

	it("can on and off event", function () {
		var emit = new Event.Event;

		function change(a) {
			console.log("change: " + a);
		}
		
		var change1 = change.bind(this, 1);
		var change2 = change.bind(this, 2);

		emit.on("change", change1);
		emit.trigger("change");
		
		emit.on("change", change2);
		emit.trigger("change");
		
		emit.off("change", change2);
		emit.trigger("change");
	});
	
	it("bind method is equal to on method and unbind method is equal to off method", function(){
		var emit = new Event.Event;

		function change(a) {
			console.log("change: " + a);
		}
		
		var change1 = change.bind(this, 1);
		var change2 = change.bind(this, 2);

		emit.bind("change", change1);
		emit.trigger("change");
		
		emit.bind("change", change2);
		emit.trigger("change");
		
		emit.unbind("change", change2);
		emit.trigger("change");
	});
	
	it("can bind event once", function () {
		var emit = new Event.Event;

		function change(a) {
			console.log("change: " + a);
		}
		
		var change1 = change.bind(this, 1);

		emit.once("change", change1);
		emit.trigger("change");
		
		emit.trigger("change");
	});
	
	it("can listening other object event", function(){
		var objEvt = new Event.Event;
		var listenEvt = new Event.Event;
		
		var show = function() {
			console.log("show");
		};
		listenEvt.listenTo(objEvt, "change", show);
		listenEvt.listenTo(objEvt, "change", show);
		listenEvt.listenTo(objEvt, "change", show);
		
		listenEvt.stopListening(objEvt, "change", show);
		objEvt.trigger("change");
	});
	
	it("can remove all listener", function(){
		var objEvt = new Event.Event;
		var listenEvt = new Event.Event;
		
		var show = function() {
			console.log("show");
		};
		listenEvt.listenTo(objEvt, "change", show);
		listenEvt.listenTo(objEvt, "change", show);
		listenEvt.listenTo(objEvt, "change", show);
		
		listenEvt.stopListening(objEvt, "change", show);
		
		listenEvt.on("change", show);
		objEvt.trigger("change");
		
		listenEvt.removeAll();
		chai.expect(listenEvt._callback).to.be.a('undefined');
		chai.expect(listenEvt._listenTo).to.be.a('undefined');
	});
});