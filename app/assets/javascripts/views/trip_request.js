nycBNB.Views.TripRequest = Backbone.CompositeView.extend({
  template: JST["trips/trip_request"],
  initialize: function(options) {
    this.traveler = options.traveler;
    this.listenTo(this.traveler, 'sync', this.render);
  },
  render: function () {
    console.log("render trip request");
    this.$el.html(this.template({
      traveler: this.traveler,
      trip: this.model
    }))
    return this;
  }
})
