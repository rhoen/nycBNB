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
    "input #title": "validateSubmit"
  },
  validateSubmit: function () {
    console.log("validateSubmit fired");
    if (!this.homeType) {
      this.homeType = $('.home-type input');
      this.roomType = $('.room-type');
      this.price = $('#price');
      this.title = $('#title');
    }
    if (
      this.homeType.filter("checked") &&
      this.roomType.filter("checked") &&
      this.price.val() !== "" &&
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

      this.model.save(formData, {
        success: function () {
          this.collection.add(this.model, {merge: true});
          Backbone.history.navigate("#listings/" + this.model.id,
            {trigger: true});
        }.bind(this)
      });
    } else {
      console.log("hello");

    }
  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    return this;
  }
})
