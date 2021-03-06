nycBNB.Views.Listings.Index = Backbone.View.extend({
  tagName: "ul",
  template: JST["listings/index"],
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({listings: this.collection}));
    return this;
  }
})
