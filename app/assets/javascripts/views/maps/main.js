//CompositeView? Regular View?
nycBNB.Views.Maps.Main = Backbone.View.extend({
  id: "main-map-container",
  className: "clearfix",
  template: JST["maps/main"],
  initialize: function () {
    this.collection = new nycBNB.Collections.listings();
    this.mapView = new nycBNB.Views.Maps.Map({
      collection: this.collection
    }); //pass collection?
    // this.addSubview("#map-canvas", mapView); don't do this?
    this.searchView = new nycBNB.Views.Maps.Search({
      collection: this.collection
    });
  },
  render: function () {

    this.$el.html(this.template());
    this.$el.append(this.mapView.$el);
    // $("#map-search-filter").html(this.searchView.render());
    this.mapView.initMap();

    return this;
  },
  remove: function () {
    this.mapView.remove();
    Backbone.View.prototype.remove.call(this);
  },
})
