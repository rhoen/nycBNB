nycBNB.Views.Maps.Map = Backbone.View.extend({
  // template: ,
  // initialize: function () {
  //
  // },
  initialize: function () {
    this._markers = {};
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
    google.maps.event.addListener(this._map, 'dragend', this.search.bind(this));
    google.maps.event.addListener(this._map, 'zoom_changed', this.search.bind(this));

    // google.maps.event.addListener(marker, 'click', function(event) {
    //   // this._map.setCenter(marker.getPosition());
    //   this.showMarkerInfo(event, marker);
    //
    //   //load marker details
    // }.bind(this));

    var submit = document.getElementById("submit-search");
    google.maps.event.addDomListener(submit, 'click', this.search.bind(this))
  },
  search: function (event) {
    event.preventDefault();
    var formData = $(document.getElementById("search-form")).serializeJSON();

    // This method will re-fetch the map's collection, using the
    // map's current bounds as constraints on latitude/longitude.
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
     data: { query: formData },
     success: function () {
       this.collection.each(this.addMarker.bind(this));
     }.bind(this)
   });
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
  removeMarker: function (listing) {
    var marker = this._markers[listing.id];
    marker.setMap(null);
    delete this._markers[listing.id];
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