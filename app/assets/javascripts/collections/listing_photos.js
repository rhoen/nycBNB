nycBNB.Collections.ListingPhotos = Backbone.Collection.extend({
  url: "/api/listings",
  model: nycBNB.Models.ListingPhoto
})
