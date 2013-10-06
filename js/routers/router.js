/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Router
	// ----------
	var TodoRouter = Backbone.Router.extend({
		routes: {
			'': 'setFilter',
			':filter': 'setFilter',
			':filter/:sort/:order': 'setFilterSort',
		},

		setFilter: function (filter) {
			// Set the current filter to be used
			app.TodoFilter = filter || '';

			app.TodoSortField = 'order';
			app.TodoSortOrder = 1;
			app.todos.sort();

			// Trigger a collection filter event, causing hiding/unhiding
			// of Todo view items
			app.todos.trigger('filter');
		},

		setFilterSort: function(filter, field, order) {
			this.setFilter(filter);
			app.TodoSortField = field || 'order';
			app.TodoSortOrder = order || 1;		// or -1 for reverse
			app.todos.sort();
		}
	});

	app.TodoRouter = new TodoRouter();
	Backbone.history.start();
})();
