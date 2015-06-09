nycBNB.Views.Trip = Backbone.CompositeView.extend({
  template: JST['trips/show'],
  initialize: function () {
    this.listing = new nycBNB.Models.Listing({id: this.model.get("listing_id")});
    this.listing.fetch();
    this.listenTo(this.listing, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({
      trip: this.model,
      listing: this.listing,
    }));
    return this;
  },
});
