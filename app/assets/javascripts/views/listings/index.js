nycBNB.Views.Listings.Index = Backbone.View.extend({
  tagName: "ul",
  template: JST["listings/index"],
  render: function () {
    this.$el.html(this.template({listings: this.collection}));
    return this;
  }
})
