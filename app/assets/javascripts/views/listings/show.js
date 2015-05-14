nycBNB.Views.Listings.Show = Backbone.View.extend({
  tagName: "section",
  className: "trip-form",
  tripForm: JST["trips/form"],
  template: JST["listings/show"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    // var owner = this.model.owner.fetch();
    this.$el.html(this.template({listing: this.model}));
    this.$el.append(this.tripForm({listing: this.model}));
    return this;
  }
})
