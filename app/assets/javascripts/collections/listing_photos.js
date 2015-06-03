nycBNB.Collections.ListingPhotos = Backbone.Collection.extend({
  url: function () {
    return "/api/listings/" + this.listing.id + "/listing_photos"
  },
  model: nycBNB.Models.ListingPhoto,
  initialize: function (models, options) {
    this.listing = options.listing
  },
})
