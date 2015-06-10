nycBNB.Views.Requests = Backbone.CompositeView.extend({
  template: JST["trips/requests"],
  id: "requests-are-made",
  addListingSubviews: function () {
    console.log('make listing subs');
    this.collection.forEach(function(listing){
      console.log('new listing sub!');
      var listingSubview = new nycBNB.Views.ListingRequests({model: listing});
      this.addSubview("#listings", listingSubview);
    }.bind(this))
  },
  initialize: function () {
    //collection is of current user's listings
    this.listenToOnce(this.collection, 'sync', this.render)
  },
  render: function () {
    this.$el.html(this.template({
      listings: this.collection
    }));
    this.addListingSubviews();
    return this;
  }
});
