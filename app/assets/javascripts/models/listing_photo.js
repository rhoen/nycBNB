nycBNB.Models.ListingPhoto = Backbone.Model.extend({
  urlRoot: "/api/listing_photos",
  toJSON: function(response) {
    var json = {listing_photo: _.clone(this.attributes)};
    return json;
  },
})
