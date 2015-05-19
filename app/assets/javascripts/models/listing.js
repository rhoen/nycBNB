nycBNB.Models.Listing = Backbone.Model.extend({
  urlRoot: "/api/listings",
  parse: function(payload) {
    debugger
    this._photos = payload.photos;
    delete payload.photos;
    return payload.listing
  }
})
