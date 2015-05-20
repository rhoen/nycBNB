nycBNB.Views.Listings.PhotoEdit = Backbone.CompositeView.extend({
  // className: "photo-edit",
  photo: JST["listings/photo"],
  template: JST["listings/photo_edit"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo(this.collection, 'sync', this.render);
  },
  events: {
    "click .add-photo-button": "savePhoto",
    "click button.delete" : "deletePhoto"
  },
  deletePhoto: function(event) {
    // event.preventDefault();
    // var photo = this.collection.get($(event.target.attr('data-id')))
    // photo.destroy();
    // $(event.target).
  },
  savePhoto: function(event) {
    event.preventDefault();
    var file = $.find(".add-photo input")[0].files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      var result = reader.result;
      var photo = new nycBNB.Models.ListingPhoto()
      $(".add-photo-button").addClass("saving");
      photo.save({
        listing_id: this.model.id,
        photo: result
      }, {
        success: function (model, response) {
          $('.photos').append(this.photo({photo: response}))
          $(".add-photo-button").removeClass("saving");
          this.markButtonSaved();
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
  },
  markButtonSaved: function () {
    debugger
    $(".add-photo-button")
      .addClass("saved")
      .delay(500)
      .removeClass("saved");
  },
})
