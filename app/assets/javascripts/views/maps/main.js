nycBNB.Views.Maps.main = Backbone.CompositeView.extend({
  id: "main-map-container"
  template: ,
  initialize: function () {
    var mapView = nycBNB.Views.Maps.Map();
    this.addSubview("#map-canvas", mapView);
  },
  render: function () {

    return this;
  },
})
