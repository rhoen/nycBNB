nycBNB.Collections.Listings = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Models.Listing,
  getOrFetch: function(id) {
    console.log("get or fetch from collection");
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
