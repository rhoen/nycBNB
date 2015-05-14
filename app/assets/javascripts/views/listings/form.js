nycBNB.Views.Listings.Form = Backbone.View.extend({
  template: JST["listings/form"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    "click button.submit" : "createListing"
  },
  createListing: function (event) {
    event.preventDefault();
    var formData =
      $(event.currentTarget.parentElement).serializeJSON();
    this.model.save(formData, {
      success: function () {
        Backbone.history.navigate("#listings/" + this.model.id,
          {trigger: true});
      }.bind(this)
    });
  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    return this;
  }
})
