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
      this.centerMap(nycBNB.storeAddress);
      nycBNB.storeAddress = null;
    }
  },
  centerMap: function (address) {
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
    this.search();
  },
  addListeners: function () {
    google.maps.event.addListener(this._map, 'dragend zoom_changed', this.search);

    // google.maps.event.addListener(marker, 'click', function(event) {
    //   // this._map.setCenter(marker.getPosition());
    //   this.showMarkerInfo(event, marker);
    //
    //   //load marker details
    // }.bind(this));

    var submit = document.getElementById("submit-search");
    google.maps.event.addDomListener(submit, 'click', this.search.bind(this))
  },
  showMarkerInfo: function(event, marker) {
    var infoWindow = new google.maps.InfoWindow({
      content: marker.title //send a view with photo/title
    });

    infoWindow.open(this._map, marker);
  },
  search: function (event) {
    if ($(event.currentTarget)) {//is the button)
      event.preventDefault();
    }

    var formData = $(document.getElementById("search-form")).serializeJSON();

    //not sure what the default behavior is for moving the map,
    //don't want to prevent loading of the map.

    // This method will re-fetch the map's collection, using the
    // map's current bounds as constraints on latitude/longitude.
    debugger
    var mapBounds = this._map.getBounds();
    var ne = mapBounds.getNorthEast();
    var sw = mapBounds.getSouthWest();

    var boundaries = {
     lat: [sw.lat(), ne.lat()],
     lng: [sw.lng(), ne.lng()]
    };

    formData.listing.boundaries = boundaries;

    //this.colleciton is collection of listings
    this.collection.fetch({
     data: { query: formData }
    });
  },

})
