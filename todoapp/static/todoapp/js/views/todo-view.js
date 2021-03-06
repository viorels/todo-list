/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Todo Item View
	// --------------

	// The DOM element for a todo item...
	app.TodoView = Backbone.View.extend({
		//... is a list tag.
		tagName:  'li',

		// Cache the template function for a single item.
		template: _.template($('#item-template').html()),

		// The DOM events specific to an item.
		events: {
			'click .toggle': 'toggleCompleted',
			'dblclick label': 'edit',
			'click .priority': 'changePriority',
			'click .due': 'selectDue',
			'click .destroy': 'clear',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close',
		},

		// The TodoView listens for changes to its model, re-rendering. Since there's
		// a one-to-one correspondence between a **Todo** and a **TodoView** in this
		// app, we set a direct reference on the model for convenience.
		initialize: function () {
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.remove);
			this.listenTo(this.model, 'visible', this.toggleVisible);
		},

		// Re-render the titles of the todo item.
		render: function () {
			this.$el.html(this.template(this.model.toJSON()));
			this.$('.due').html(this.model.dueDescription());
			var todoView = this;
			this.$('.due-edit').val(this.model.dueDescription()).datepicker({
				dateFormat: this.model.dateFormat,
				onClose: function () { todoView.closeDue() },
				minDate: 0});
			this.$el.find('span.priority').html(this.model.priorityName());
			this.$el.toggleClass('completed', this.model.get('completed'));
			this.toggleVisible();
			this.$input = this.$('.edit');
			return this;
		},

		toggleVisible: function () {
			this.$el.toggleClass('hidden', this.isHidden());
		},

		isHidden: function () {
			var isCompleted = this.model.get('completed');
			return (// hidden cases only
				(!isCompleted && app.TodoFilter === 'completed') ||
				(isCompleted && app.TodoFilter === 'active')
			);
		},

		// Toggle the `"completed"` state of the model.
		toggleCompleted: function () {
			this.model.toggle();
		},

		// Switch this view into `"editing"` mode, displaying the input field.
		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		// Close the `"editing"` mode, saving changes to the todo.
		close: function () {
			var trimmedValue = this.$input.val().trim();
			this.$input.val(trimmedValue);

			if (trimmedValue) {
				this.model.save({ title: trimmedValue });
			} else {
				this.clear();
			}

			this.$el.removeClass('editing');
		},

		// Close the `"due editing"` mode, saving changes to the todo.
		closeDue: function () {
			var due = this.$('.due-edit').datepicker('getDate');
			var dueISO_8601 = $.datepicker.formatDate($.datepicker.ISO_8601, due)
			this.model.save({ due: dueISO_8601 });
			this.$el.removeClass('editing-due');
		},

		// If you hit `enter`, we're through editing the item.
		updateOnEnter: function (e) {
			if (e.which === ENTER_KEY) {
				this.close();
			}
		},

		changePriority: function (e) {
			this.model.nextPriority();
		},

		selectDue: function (e) {
			this.$el.addClass('editing-due');
			this.$('.due-edit').focus();
		},

		// Remove the item, destroy the model from *localStorage* and delete its view.
		clear: function () {
			this.model.destroy();
		}
	});
})(jQuery);
