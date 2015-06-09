nycBNB.Views.Trips = Backbone.CompositeView.extend({
  template: JST['trips/index']
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    var approved = new nycBNB.Collections.Trips(
      this.collection.filter(function(trip){
        return (trip.status == "APPROVED");
      });
    )
    var pending = new nycBNB.Collections.Trips(
      this.collection.filter(function(trip){
        return (trip.status == "PENDING");
      });
    )
    var denied = new nycBNB.Collections.Trips(
      this.collection.filter(function(trip){
        return (trip.status == "DENIED");
      })
    )
    this.$el.html(this.template({
      approved: approved,
      pending: pending
    }));
  },
});
