nycBNB.Views.ListingRequests = Backbone.CompositeView.extend({
  template: JST["trips/request"],
  initialize: function () {
    this.render();
    this.addTripSubviews();
    this.listenTo(this.model, 'sync', this.render)
  },
  addTripSubviews: function () {
    var trips = new nycBNB.Collections.Trips(this.model.get("trips"));
    trips.forEach(function(trip){
      var traveler = new nycBNB.Models.User({id: trip.get("traveler_id")});
      traveler.fetch();
      console.log('make trip request view');
      var tripSubview = new nycBNB.Views.TripRequest({
        model: trip,
        traveler: traveler
      })
      this.addSubview("#listing-requests", tripSubview)
    }.bind(this))
  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    this.addTripSubviews();
    return this;
  }
})
