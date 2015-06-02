nycBNB.Models.Listing = Backbone.Model.extend({
  urlRoot: "/api/listings",
  initialize: function () {
    if (!this._photos) {
      this._photos = new nycBNB.Collections.ListingPhotos({
        listing: this
      });
    }
  },
  parse: function(payload) {
    if (!this._photos) {
      this._photos = new nycBNB.Collections.ListingPhotos({
        listing: this
      });
    }
    this._photos.add(payload.photos);
    delete payload.photos;
    return payload.listing;
  }
});
