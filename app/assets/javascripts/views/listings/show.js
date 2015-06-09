nycBNB.Views.Listings.Show = Backbone.CompositeView.extend({
  tagName: "section",
  className: "listing-show",
  tripForm: JST["trips/form"],
  template: JST["listings/show"],
  showPhotos: JST["listings/show_photos"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.setBackground);
    this.listenTo(this.model, 'sync', this.addOwnerView.bind(this));
    this.addOwnerView();
  },
  events: {
    "submit .reserve-form" : "createTrip"
  },
  createTrip: function () {
    event.preventDefault();
    console.log("createTrip function");
    formData = $(event.target).serializeJSON();
    debugger
    trip = new nycBNB.Models.Trip({
      formData
    })
    trip.save({},{
      success: function () {
        console.log("new trip!");
      },
    })
  },
  setBackground: function () {
    if (this.model._photos) {
      var primaryPhoto;
      this.model._photos.forEach(function(photo){
        if (photo.get("primary_photo")) {
          primaryPhoto = photo;
        }
      })
      $("#high-light-photo")
        .css("background-image", "url(" + primaryPhoto.get('original_url') + ")");
    }
  },
  addOwnerView: function () {
    if (this.model.get("owner_id")) {
      this.owner = new nycBNB.Models.User({id: this.model.get("owner_id")});
      var ownerView = new nycBNB.Views.Listings.Owner({model: this.owner})
      this.owner.fetch();
      this.addSubview('#owner', ownerView);
    }
  },
  addTripForm: function () {},
  render: function () {
    this.$el.html(this.template({
      listing: this.model,
    }));
    if (this.model._photos){
      this.$("#show-photos").html(this.showPhotos({photos: this.model._photos}));
    }
    //datepicker
    $( "#datepicker-start" ).datepicker({
      beforeShowDay: this.beforeShowDayFunction
    });
    $( "#datepicker-end" ).datepicker({
      beforeShowDay: this.beforeShowDayFunction
    });
    return this;
  },
  beforeShowDayFunction: function (date) {
    var dateStr = jQuery.datepicker.formatDate('yy-mm-dd', date);
    return;
  },

})
