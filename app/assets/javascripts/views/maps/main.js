//CompositeView? Regular View?
nycBNB.Views.Maps.Main = Backbone.View.extend({
  id: "main-map-container",
  className: "clearfix",
  template: JST["maps/main"],
  initialize: function () {
    this.mapView = new nycBNB.Views.Maps.Map(); //pass collection?
    // this.addSubview("#map-canvas", mapView); don't do this?
    // this.searchFilterView = new nycBNB.Views.Maps.searchFilter();
  },
  render: function () {

    this.$el.html(this.template());
    this.$el.append(this.mapView.$el);
    // $("#map-search-filter").html(this.searchFilterView.render());
    this.mapView.initMap();

    return this;
  },
  remove: function () {
    this.mapView.remove();
    Backbone.View.prototype.remove.call(this);
  },
})
