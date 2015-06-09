nycBNB.Views.Trips = Backbone.CompositeView.extend({
  template: JST['trips/index'],
  className: "all-trips",
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template());

    var approved = this.collection.filter(function(trip){
      return (trip.get("status") == "APPROVED");
    });
    approved.forEach(function(trip){
      sub = new nycBNB.Views.Trip({
        model: trip
      });
      this.addSubview("#approved",sub);
    }.bind(this));
    var pending = this.collection.filter(function(trip){
      return (trip.get("status") == "PENDING");
    });
    pending.forEach(function(trip){
      sub = new nycBNB.Views.Trip({
        model: trip
      });
      this.addSubview("#pending",sub);
    }.bind(this));

    var denied = this.collection.filter(function(trip){
      return (trip.get("status") == "DENIED");
    });
    denied.forEach(function(trip){
      sub = new nycBNB.Views.Trip({
        model: trip
      });
      this.addSubview("#denied",sub);
    }.bind(this));

    return this;
  },
});
