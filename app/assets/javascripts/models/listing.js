nycBNB.Models.Listing = Backbone.Model.extend({
  urlRoot: "/api/listings",
  // initialize: function () {
  //   debugger
  //   if (!this._photos) {
  //     this._photos = new nycBNB.Collections.ListingPhotos({
  //       listing: this
  //     });
  //   }
  // },
  parse: function(payload) {
    if (!this._photos) {
      this._photos = new nycBNB.Collections.ListingPhotos([], {
        listing: this
      });
    }
    this._photos.add(payload.photos);
    this.primaryPhoto = this._photos.filter(function(photo){
      if (photo.get("primary_photo")) {
        return photo;
      }
    })[0];
    if (this.primaryPhoto === undefined) {
      this.primaryPhoto = payload.room_missing;
    }
    delete payload.photos;
    return payload;
  }
});
