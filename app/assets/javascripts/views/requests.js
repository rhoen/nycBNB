nycBNB.Views.Requests = Backbone.CompositeView.extend({
  template: JST["trips/requests"],
  id: "requests-are-made",
  addListingSubviews: function () {
    this.collection.forEach(function(listing){
      var listingSubview = new nycBNB.Views.ListingRequests({model: listing});
      this.addSubview("#listings", listingSubview);
    })
  },
  initialize: function () {
    //collection is of current user's listings
    // this.listenTo(this.collection, 'sync', this.render)
  },
  render: function () {
    this.$el.html(this.template({
      listings: this.collection
    }));
    this.addListingSubviews();
    return this;
  }
});
