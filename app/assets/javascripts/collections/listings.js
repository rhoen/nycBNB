nycBNB.Collections.Listings = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Models.Listing,
  parse: function(payload) {
    var listings = payload.listings;
    this.totalPages = payload.total_pages;
    this.currPage = this.currPage || 1;
    this.listingsPerPage = payload.listings_per_page;
    this.totalListings = payload.total_listings;
    return _.map(listings, function(list){
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
