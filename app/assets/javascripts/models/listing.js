nycBNB.Models.Listing = Backbone.Model.extend({
  urlRoot: "/api/listings",
  initialize: function () {
    this._photos = [];//new nycBNB.Collections.ListingPhotos();
  },
  parse: function(payload) {
    this._photos = payload.photos;
    delete payload.photos;
    return payload.listing
  }
})
