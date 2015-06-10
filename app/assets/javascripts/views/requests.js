nycBNB.Views.Requests = Backbone.CompositeView.extend({
  template: JST["trips/requests"],
  initialize: function () {
    //collection is of current user's listings
    this.listenTo(this.collection, 'sync', this.render)
  },
  render: function () {
    console.log("requests render");
    this.$el.html(this.template({
      listings: this.collection
    }));
    return this;
  }
});
