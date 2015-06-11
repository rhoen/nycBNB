nycBNB.Views.Trip = Backbone.CompositeView.extend({
  template: JST['trips/show'],
  className: "trip-show clearfix",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    'click .cancel-trip' : "deleteTrip"
  },
  deleteTrip: function(event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        console.log('delete success!');
        this.collection.trigger('sync');
        this.collection.remove(this.model);
      }.bind(this)
    });
  },
  checkListing: function () {
    if (this.model.get("listing_id") && this.listing === undefined) {
      console.log("make listing");
      this.listing = new nycBNB.Models.Listing({id: this.model.get("listing_id")});
      this.listing.fetch();
      this.listenTo(this.listing, 'sync', this.render);
    }
  },
  render: function () {
    console.log("render trip");
    debugger
    this.checkListing();
    this.$el.html(this.template({
      trip: this.model,
      listing: this.listing,
    }));
    return this;
  },
});
