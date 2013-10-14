/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'': 'setFilterSort',
			':filter': 'setFilterSort',
			':sort/:order': 'setFilterSort',
			':filter/:sort/:order': 'setFilterSort',
		},

		setFilterSort: function() {
			app.TodoFilter = ''
			app.TodoSortField = 'order';
			app.TodoSortOrder = 1; // or -1 for reverse

			for(var i = arguments.length - 1; i >= 0; i--) {
				var argument = arguments[i];
				if (_.contains(['active', 'completed'], argument)) {
					app.TodoFilter = argument;
				}
				if (_.contains(['title', 'priority', 'due'], argument)) {
					app.TodoSortField = argument;
				}
				if (_.contains(['1', '-1'], argument)) {
					app.TodoSortOrder = parseInt(argument);		// or -1 for reverse
				}
			}

			// Trigger sort
			app.todos.sort();

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.todos.trigger('filter');
		},

		urlForFilter: function(name) {
			var url = '#'
			if (name) {
				url += '/' + name;
			}
			url += '/' + app.TodoSortField + '/' + app.TodoSortOrder;
			return url;
		},

		urlForSort: function(name) {
			var url = '#'
			if (app.TodoFilter) {
				url += '/' + app.TodoFilter;
			}
			var order = 1;
			if (app.TodoSortField == name) {
				order = -app.TodoSortOrder;
			}
			url += '/' + name + '/' + order;
			return url;
		},
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
