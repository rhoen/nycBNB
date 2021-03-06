nycBNB.Views.Root = Backbone.View.extend({
  header: JST["root/header_nav"],
  template: JST["root/index"],

  initialize: function () {
    this.listenToOnce(this.model, 'sync', this.render);
  },
  events: {
    "click .submit" : "search"
  },
  search: function(event) {
    event.preventDefault();
    var address = $("#search-bar").val();
    if ( address === "" ) {
      address = "New York";
    }

    if (nycBNB.mapView) {
      nycBNB.mapView.centerAndSearch(address);
    } else {
      nycBNB.storeAddress = address;
      Backbone.history.navigate("#map", {trigger: true});
    }
  },
  render: function () {
    this.$el.empty();
    this.$el.append(this.header({
      user: this.model,
    }));
    this.$el.append(this.template({user: this.model}));
    return this;
  }
})
