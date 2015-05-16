nycBNB.Views.Listings.Show = Backbone.View.extend({
  tagName: "section",
  className: "trip-form",
  tripForm: JST["trips/form"],
  template: JST["listings/show"],
  initialize: function () {
    this.owner = new nycBNB.Models.User({id: this.model.owner_id});
    this.owner.fetch();
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.owner, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model,
      owner: this.owner
    }));
    this.$el.append(this.tripForm({listing: this.model}));
    return this;
  }

})
