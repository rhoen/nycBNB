nycBNB.Views.Listings.Form = Backbone.View.extend({
  template: JST["listings/form"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo($('.home-type'), 'change', this.validateSubmit)
    this.listenTo($('.room-type'), 'change', this.validateSubmit)
    this.listenTo($('#city'), 'change', this.validateSubmit)
    this.listenTo($('#price'), 'change', this.validateSubmit)
    this.listenTo($('#title'), 'change', this.validateSubmit)
  },
  events: {
    "click button.submit" : "createListing",
    "click button.toggle-address" : "toggleAddress"
  },
  validateSubmit: function () {
    if (!this.home-type) {
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
      $("button.submit").removeClass(".disabled")
      $("button.submit").addEventListener("click", this.createListing)
    } else {
      $("button.submit").addClass(".disabled")
      $("button.submit").removeEventListener("click", this.createListing)
    }

  },
  ensureEnabled: function () {},
  ensureDisabled: function() {},
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
    event.preventDefault();
    var formData =
      $(event.currentTarget.parentElement).serializeJSON();
    this.model.save(formData, {
      success: function () {
        this.collection.add(this.model, {merge: true});
        Backbone.history.navigate("#listings/" + this.model.id,
          {trigger: true});
      }.bind(this)
    });
  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    return this;
  }
})
