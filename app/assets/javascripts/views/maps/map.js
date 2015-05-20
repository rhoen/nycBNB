nycBNB.Views.Maps.Map = Backbone.View.extend({
  // template: ,
  // initialize: function () {
  //
  // },
  id: "map-canvas",
  initMap: function () {
    var mapOptions = {
      center: { lat: 40.733567, lng: -73.993519 },
      zoom: 12
    };
    this._map = new google.maps.Map(
      this.el,
      mapOptions
    );

  },
  // render: function () {
  //
  //   return this;
  // },
})
