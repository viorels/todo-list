/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	var priorityNames = ['Low', 'Medium', 'High'];

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false,
			priority: 1,
			due: null,
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

		nextPriority: function () {
			this.save({
				priority: (this.get('priority') + 1) % priorityNames.length,
			});
		},

		priorityName: function() {
			return priorityNames[this.get('priority')];
		}
	});
})();
