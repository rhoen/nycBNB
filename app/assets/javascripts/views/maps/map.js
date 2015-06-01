;(function(){
  "use strict";
  nycBNB.Views.Maps.Map = Backbone.View.extend({
  // template: ,
  initialize: function(options) {
    this.searchView = options.searchView;
  },
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
    this.checkAddressStore();
    this._markers = {};

  },
  checkAddressStore: function () {
    if (nycBNB.storeAddress) {
      this.centerAndSearch(nycBNB.storeAddress);
      nycBNB.storeAddress = null;
    }
  },
  centerAndSearch: function (address) {
    var geocoder = new google.maps.Geocoder()
    geocoder.geocode( {'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      this._map.setCenter(results[0].geometry.location);
      this.searchView.search(null, address);
    } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    }.bind(this));
  },
  addListeners: function () {
    google.maps.event.addListener(this._map, 'dragend', this.searchView.search.bind(this));
    google.maps.event.addListener(this._map, 'zoom_changed', this.searchView.search.bind(this));
    this.listenTo(this.collection, 'sync', this.updateMarkers);
  },
  updateMarkers: function () {
    this.clearMarkers();
    this.collection.each(this.addMarker.bind(this));
  },
  clearMarkers: function () {
    _.each(this._markers, function(marker) {
      marker.setMap(null);
      this._markers = {};
    }.bind(this))
  },
  addMarker: function(listing) {
    if (this._markers[listing.id]) { return };
    var view = this;
    var marker = new google.maps.Marker({
      position: { lat: listing.get('latitude'), lng: listing.get('longitude') },
      map: this._map,
      title: listing.get('street_address')
    });
    google.maps.event.addListener(marker, 'click', function (event) {
      view.showMarkerInfo(event, marker);
    });

    this._markers[listing.id] = marker;
  },
  showMarkerInfo: function(event, marker) {
    if (this.infoWindow) {
      this.infoWindow.close();
    }
    this.infoWindow = new google.maps.InfoWindow({
      content: marker.title //send a view with photo/title
    });

    this.infoWindow.open(this._map, marker);
  },


})
})();
