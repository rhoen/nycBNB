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
    if (formData.listing.start_date.indexOf("/") != -1) {
      var start_date = formData.listing.start_date.split("/");
      var y = start_date[2];
      start_date.pop();
      start_date = [y].concat(start_date).join("-");
      formData.listing.start_date = start_date;
    }
    if (formData.listing.end_date.indexOf("/") != -1) {
      var end_date = formData.listing.end_date.split("/");
      var y1 = end_date[2];
      end_date.pop();
      end_date = [y1].concat(end_date).join("-");
      formData.listing.end_date = end_date;
    }
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
  changePage: function(event) {
    console.log("changePage function");
    event && event.preventDefault();
    var formData = $(document.getElementById("search-form")).serializeJSON();
    var change = $(event.target).data("change")
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
    formData.page = this.collection.currPage + change;
    //this.colleciton is collection of listings
    this.collection.fetch({
     data: { query: formData },
     reset: true,
     success: function () {
       this.collection.currPage += change;
     }.bind(this)
   });
  },
  tagName: "section",
  render: function () {
    this.$el.html(this.form());
    this.slider();
    this.datePicker();
    this.$el.append(this.resultsView.$el);
    this.$el.append("<div id='pagination'></div>");
    this.resultsView.render();
    return this;
  },
  datePicker: function () {
    $("#datepicker-start").datepicker();
    $("#datepicker-end").datepicker();
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
