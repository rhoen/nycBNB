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
    this.addListeners();

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
  addListeners: function () {
    google.maps.event.addListener(this._map, 'center_changed', function() {
      //fire search based on new location boundaries
    }.bind(this));

    google.maps.event.addListener(marker, 'click', function(event) {
      // this._map.setCenter(marker.getPosition());
      this.showMarkerInfo(event, marker);

      //load marker details
    }.bind(this));
  },
  showMarkerInfo: function(event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title //send a view with photo/title
    });

    infoWindow.open(this._map, marker);
  },
  search: function (searchFormParams) {
    // This method will re-fetch the map's collection, using the
    // map's current bounds as constraints on latitude/longitude.

    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    var boundaries = {
     lat: [sw.lat(), ne.lat()],
     lng: [sw.lng(), ne.lng()]
    };

    this.collection.fetch({
     data: { filter_data: filterData }
    });
  },

})
