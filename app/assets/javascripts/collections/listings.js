nycBNB.Collections.Listings = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Models.Listing,
  parse: function(payload) {
    return _.map(payload, function(list){
      return {listing: list};
    });
  },
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
