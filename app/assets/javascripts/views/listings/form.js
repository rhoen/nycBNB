nycBNB.Views.Listings.Form = Backbone.CompositeView.extend({
  className:"form-container",
  template: JST["listings/form"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    "click button.toggle-address" : "toggleAddress",
    "click button.submit" : "createListing",
    "change .home-type": "validateSubmit",
    "change .room-type": "validateSubmit",
    "input #city": "validateSubmit",
    "input #price": "validateSubmit",
    "input #title": "validateSubmit",
  },
  validateSubmit: function () {
    console.log("validateSubmit fired");
    if (!this.homeType) {
      this.homeType = $('.home-type input');
      this.roomType = $('.room-type');
      this.city = $('#city');
      this.price = $('#price');
      this.title = $('#title');
    }
    if (
      // (this.homeType.filter("checked").length > 0) &&
      // (this.roomType.filter("checked").length > 0) &&
      this.price.val() !== "" &&
      this.city.val() !== "" &&
      this.title.val() !== ""
    ) {
      this.ensureEnabled();
      return true;
    } else {
      this.ensureDisabled();
      return false;
    }

  },
  ensureEnabled: function () {
    console.log("ensureEnabled");
    $("button.submit").removeClass("disabled");
  },
  ensureDisabled: function() {
    console.log("ensureDisabled");
    $("button.submit").addClass("disabled");
  },
  toggleAddress: function(event) {
    event.preventDefault();
    $details = $('section.address-details');
    if ($details.hasClass('hide-form')) {
      $details.removeClass('hide-form');
    } else {
      $details.addClass('hide-form');
    }
  },
  createListing: function (event) {
    console.log("createListing");
    event.preventDefault();
    if (this.validateSubmit()) {
      var formData = $(event.currentTarget
        .parentElement.parentElement.parentElement)
        .serializeJSON();

      this.setLatLon(formData);

      // set lat/lon or skip
      // if (!this.model.get("latitude") && formData.listing.street_address) {
      //   this.setLatLon(formData);
      // } else {
      //   this.saveModel(formData);
      // }
    }

  },
  saveModel: function (formData) {
    console.log("saveModel");
    this.model.save(formData,{
      success: function (model, response) {
        this.model.set(response);
        this.collection.add(this.model, {merge: true})
        Backbone.history.navigate("#listings/" + this.model.id,
          {trigger: true});
      }.bind(this)
    })
  },
  setLatLon: function(formData) {
    console.log("setLatLon");
    var geocoder = new google.maps.Geocoder();
    var listing = formData.listing
    var address = "" + listing.street_address + " "+ listing.city + " " + listing.state + " " + listing.zip;

    geocoder.geocode({'address': address}, function( results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //fix based on location var
        formData.listing.latitude = results[0].geometry.location["A"];
        formData.listing.longitude = results[0].geometry.location["F"];
      }
      this.saveModel(formData);
    }.bind(this))

  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    return this;
  }
})
