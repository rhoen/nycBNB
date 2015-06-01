nycBNB.Views.Maps.Search = Backbone.View.extend({
  results: JST["maps/results"],
  form: JST["maps/search_form"],
  initialize: function () {
    this.resultsView = new nycBNB.Views.Maps.Results({
      collection: this.collection
    })
  },
  id: "search-container",
  events: {
    "click #submit-search" : "search",
    "click #pagination" : "changePage"
  },
  search: function (event, address) {
    console.log("search function");
    event && event.preventDefault();
    var formData = $(document.getElementById("search-form")).serializeJSON();

    // This method will re-fetch the map's collection, using the
    // map's current bounds as constraints on latitude/longitude.
    var mapBounds = nycBNB.mapView._map.getBounds();
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
     reset: true,
     success: function () {
      //  prevResults.each(this.removeMarker.bind(this));
       this.collection.currPage = 1;
      //  this.collection.each(this.addMarker.bind(this));
     }.bind(this)
   });
  },
  changePage: function(event, change) {
    console.log("changePage function");
  //   event && event.preventDefault();
  //   var formData = $(document.getElementById("search-form")).serializeJSON();
   //
  //   // This method will re-fetch the map's collection, using the
  //   // map's current bounds as constraints on latitude/longitude.
  //   var mapBounds = this._map.getBounds();
  //   var ne = mapBounds.getNorthEast();
  //   var sw = mapBounds.getSouthWest();
   //
  //   var boundaries = {
  //    lat: [sw.lat(), ne.lat()],
  //    lng: [sw.lng(), ne.lng()]
  //   };
   //
  //   formData.listing.boundaries = boundaries;
  //   this.collection.currPage += change;
  //   formData.page = this.collection.currPage;
  //   //this.colleciton is collection of listings
  //   prevResults = new nycBNB.Collections.Listings(this.collection.models);
  //   this.collection.fetch({
  //    data: { query: formData },
  //    reset: true,
  //    success: function () {
  //      prevResults.each(this.removeMarker.bind(this));
  //      this.collection.each(this.addMarker.bind(this));
  //    }.bind(this)
  //  });
  },
  tagName: "section",
  render: function () {
    this.$el.html(this.form());
    this.slider();
    this.$el.append(this.resultsView.$el);
    this.$el.append("<div id='pagination'></div>");
    this.resultsView.render();
    return this;
  },
  slider: function () {
    $( "#price-range" ).slider({
      range: true,
      min: 10,
      step:5,
      max: 1000,
      values: [ 40, 250 ],
      slide: function( event, ui ) {
        $( "#low-val" ).val(ui.values[ 0 ]);
        $( "#high-val" ).val(ui.values[ 1 ]);
      }
    });

    $( "#low-val" ).val($("#price-range").slider("values", 0 ));
    $( "#high-val" ).val($("#price-range").slider("values", 1 ));
  },
  remove: function () {
    this.resultsView.remove()
    Backbone.View.prototype.remove.call(this);
  },


})
