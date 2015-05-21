nycBNB.Views.Listings.Form = Backbone.CompositeView.extend({
  template: JST["listings/form"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    // this.listenTo($("button.submit"), "click", this.createListing)
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
    // $("button.submit").addEventListener("click", this.createListing);
    // this.listenTo($("button.submit"), "click", this.createListing)
    // $("div.submit-container").delegate(
    //   "button.submit", "click", this.createListing
    //   );
  },
  ensureDisabled: function() {
    console.log("ensureDisabled");
    $("button.submit").addClass("disabled");
    // Events.stopListening($("button.submit"), "createListing")
    // $("button.submit").removeEventListener("click", this.createListing)
    // $("div.submit-container").undelegate(
    //   "button.submit", "click"
    //   );
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
    console.log("createListing fired");
    event.preventDefault();
    if (this.validateSubmit()) {
      var formData = $(event.currentTarget
        .parentElement.parentElement.parentElement)
        .serializeJSON();
      // set lat/lon
      debugger
      if (!this.model.get("latitude") && formData.listing.street_address) {
        this.setLatLon(formData);
      } else {
        this.saveModel(formData);
      }
    }

  },
  saveModel: function (formData) {
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
    var geocoder = new google.maps.Geocoder();
    var listing = formData.listing
    var address = "" + listing.street_address + listing.city + listing.state + listing.zip;
    geocoder.geocode({'address': address}, function( results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        //fix based on location var
        debugger
        this.model.set({
          "latitude": results[0].geometry.location["A"],
          "longitude": results[0].geometry.location["F"]
        });

        this.saveModel(formData);
      }
    }.bind(this))

  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    return this;
  }
})
