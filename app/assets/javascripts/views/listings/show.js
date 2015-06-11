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
    $("#request-button").addClass("booked");
    setTimeout(function(){
      $("#request-button").removeClass("booked");
    }, 1900)
    formData = $(event.target).serializeJSON();
    formData.listing_id = parseInt(Backbone.history.getFragment().slice(9));
    trip = new nycBNB.Models.Trip()
    trip.save(formData,{
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
      beforeShowDay: this.beforeShowDayFunction.bind(this),
      onSelect: function (dateStr) {
        console.log('onSelect');
        var date = new Date(dateStr);
        var trips = this.model.get('trips');
        if (date > new Date(trips[trips.length - 1])) {
          return;
        } else {
          for (var i = 0; i < trips.length; i++) {
            if (new Date(trips[i]) > date) {
              console.log(trips[i]);
              $("#datepicker-end").datepicker({
                maxDate: new Date(trips[i])
              })
              break;
            }
          }
        }
      }.bind(this)
    });
    $( "#datepicker-end" ).datepicker({
      beforeShowDay: this.beforeShowDayFunction.bind(this)
    });
    return this;
  },
  beforeShowDayFunction: function (date) {
    if (date < new Date()) {
      return [false, ""];
    }
    var formattedDate = jQuery.datepicker.formatDate('yy-mm-dd',date);
    return [(this.model.get('trips').indexOf(formattedDate) == -1), ""];
  },

})
