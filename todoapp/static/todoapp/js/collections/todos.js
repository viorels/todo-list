/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Collection
	// ---------------

	// The collection of todos is backed by *localStorage* instead of a remote
	// server.
	var Todos = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Todo,

		urlRoot: '/api/v1/todo',

		// Filter down the list of all todo items that are finished.
		completed: function () {
			return this.filter(function (todo) {
				return todo.get('completed');
			});
		},

		// Filter down the list to only todo items that are still not finished.
		remaining: function () {
			return this.without.apply(this, this.completed());
		},

		// We keep the Todos in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},

		// Todos are sorted by their original insertion order.
		comparator: function (todoA, todoB) {
			var valueA = todoA.get(app.TodoSortField || 'order');
			if (app.TodoSortField == 'due') {
				valueA = $.datepicker.formatDate('@', new Date(valueA));
			}
			var valueB = todoB.get(app.TodoSortField || 'order');
			if (app.TodoSortField == 'due') {
				valueB = $.datepicker.formatDate('@', new Date(valueB));
			}
			var order = app.TodoSortOrder;
			if (valueA < valueB) return -order;
			if (valueA > valueB) return order;
			return 0;
		}
	});

	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();
