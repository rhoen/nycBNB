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
  checkAddressStore: function () {
    if (nycBNB.storeAddress) {
      this.search(nycBNB.storeAddress);
      nycBNB.storeAddress = null;
    }
  },
  search: function (address) {
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode( {'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      this._map.setCenter(results[0].geometry.location);
      // var marker = new google.maps.Marker({
      //     map: this._map,
      //     position: results[0].geometry.location
      // });
    } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }.bind(this));
  },

})
