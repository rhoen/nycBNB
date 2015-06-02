;(function(){
"use strict";
nycBNB.Views.Listings.PhotoEdit = Backbone.CompositeView.extend({
  // className: "photo-edit",
  photo: JST["listings/photo"],
  template: JST["listings/display_photos"],
  addPhotoForm: JST["listings/add_photo_form"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.collection.fetch();
    this.listenTo(this.collection, 'sync', this.render);
  },
  events: {
    "click .add-photo-button": "savePhoto",
    "click button.delete" : "deletePhoto",
    "click .show-photo img" : "setAsPrimary"
  },
  setAsPrimary: function(event) {
    event.preventDefault();
    console.log("setAsPrimary");
    var id = $(event.currentTarget).attr("data-id");
    var photo = this.collection.get({id: id});
    photo.save({
      primary_photo: true
    }, {
      success: function (model, response) {
        console.log("set as primary was success");
        $('#detail-view .selected').removeClass("selected");
        $(event.currentTarget.parentElement).addClass("selected");
        $('#add-photo-' + model.escape('listing_id') + ' img').attr(
          'src',
          $(event.currentTarget).attr('src')
        );
        this.model.set("primary_photo", photo);
      }.bind(this),
      error: function () {
        console.log("error callback");
      }
    })
    // $.ajax("/api/listing_photos/" + id, {
    //   method: "patch",
    //   data: {}
    //   success: function () {
    //     $('#detail-view .selected').removeClass("selected");
    //     $(event.currentTarget.parentElement).addClass("selected");
    //   }
    // })
  },
  deletePhoto: function(event) {
    event.preventDefault();
    // var photo = this.collection.get($(event.target.attr('data-id')))
    // photo.destroy();
    // $(event.target).
    var $target = $(event.currentTarget);
    $target.addClass("deleting");
    var id = $(event.currentTarget).attr('data-id');
    $.ajax("/api/listing_photos/" + id, {
      method: "delete",
      success: function () {
        $(event.currentTarget.parentElement).empty()
      }
    })
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
    this.$el.html(this.template({photos: this.collection}));
    this.$el.append(this.addPhotoForm());
    return this;
  },
  markButtonSaved: function () {
    $(".add-photo-button")
      .addClass("saved")
      .delay(500)
      .removeClass("saved");
  },
})
}())
