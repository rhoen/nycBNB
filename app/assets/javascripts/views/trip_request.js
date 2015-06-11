nycBNB.Views.TripRequest = Backbone.CompositeView.extend({
  template: JST["trips/trip_request"],
  className: 'request-trip-container',
  initialize: function(options) {
    this.traveler = options.traveler;
    this.listenTo(this.traveler, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    'click .approve-request' : "approveRequest",
    'click .deny-request' : "denyRequest"
  },
  approveRequest: function(event) {
    this.model.save({
      status: "APPROVED"
    }, {
      success: function () {
        console.log("request approved!");
      }
    })
  },
  denyRequest: function(event) {
    this.model.save({
      status: "DENIED"
    }, {
      success: function () {
        console.log('request denied');
      }
    })
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
