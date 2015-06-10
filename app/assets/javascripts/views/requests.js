nycBNB.Views.Requests = Backbone.CompositeView.extend({
  template: JST["trips/requests"],
  initialize: function () {
    //collection is of current user's listings
  },
  render: function () {
    this.$el.html(this.template({
      listings: this.collection
    }));
    return this;
  }
});
