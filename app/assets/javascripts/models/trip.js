nycBNB.Models.Trip = Backbone.Model.extend({
  urlRoot: "/api/trips",
  toJSON: function() {
    return {trip: _.clone(this.attributes)}
  },
})
