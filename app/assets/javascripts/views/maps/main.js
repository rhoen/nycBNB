//CompositeView? Regular View?
nycBNB.Views.Maps.Main = Backbone.View.extend({
  id: "main-map-container",
  className: "clearfix",
  // template: JST["maps/main"],
  initialize: function () {
    this.collection = new nycBNB.Collections.Listings();
    this.searchView = new nycBNB.Views.Maps.Search({
      collection: this.collection
    });
    this.mapView = new nycBNB.Views.Maps.Map({
      collection: this.collection,
      searchView: this.searchView
    });
    nycBNB.mapView = this.mapView;
  },
  render: function () {
    this.$el.append(this.searchView.$el);
    this.searchView.render();
    this.$el.append(this.mapView.$el);
    this.mapView.initMap();

    return this;
  },
  remove: function () {
    nycBNB.mapView = null;
    this.mapView.remove();
    this.searchView.remove();
    Backbone.View.prototype.remove.call(this);
  },

})
