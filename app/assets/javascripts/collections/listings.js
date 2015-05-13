nycBNB.Collections.Listings = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Model.Listing
})
