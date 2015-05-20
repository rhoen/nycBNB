nycBNB.Collections.Listings = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Models.Listing,
  parse: function(payload) {
    return _.map(payload, function(list){
      return {listing: list};
    });
  },
  toJSON: function (response) {
    var query = response.data("query");
    if (query) {
      query.low_price && (query = parseInt(query.low_price.slice(1)));
      query.high_price && (query = parseInt(query.high_price.slice(1)));
    }
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
