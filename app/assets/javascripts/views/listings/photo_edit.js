nycBNB.Views.Listings.PhotoEdit = Backbone.CompositeView.extend({
  // className: "photo-edit",
  photo: JST["listings/photo"],
  template: JST["listings/photo_edit"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render)
  },
  events: {
    "click .add-photo-button": "savePhoto"
  },
  savePhoto: function(event) {
    event.preventDefault();
    var file = $.find(".add-photo input")[0].files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      var result = reader.result;
      var photo = new nycBNB.Models.ListingPhoto()
      photo.save({
        listing_id: this.model.id,
        photo: result
      }, {
        success: function (model, response) {
          debugger
          $('.photos').append(this.photo({photo: model}))
        }.bind(this)
      })
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file);
    }
  },
  render: function () {
    console.log("photo edit view render");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
