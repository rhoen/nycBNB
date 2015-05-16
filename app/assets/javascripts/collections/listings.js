nycBNB.Collections.Listings = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Models.Listing,
  getOrFetch: function(id) {
    var listing = this.get(id);
    if (listing) {
      listing.fetch();
    } else {
      listing = new nycBNB.Models.Listing({id: id});
      listing.fetch();
    }

    return listing;
  }
})
