/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Todo = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			title: '',
			completed: false,
			priority: 1,
			due: new Date(),
		},

		// Toggle the `completed` state of this todo item.
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		},

		dueDateFormat: "mm/dd/yy",

		dueDescription: function () {
			var date = new Date(this.get('due'));
			return $.datepicker.formatDate(this.dueDateFormat, date);
		},

		priorityNames: ['Low', 'Medium', 'High'],

		nextPriority: function () {
			this.save({
				priority: (this.get('priority') + 1) % this.priorityNames.length,
			});
		},

		priorityName: function() {
			return this.priorityNames[this.get('priority')];
		}
	});
})();
