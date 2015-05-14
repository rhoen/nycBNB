nycBNB.Views.Listings.Show = Backbone.View.extend({
  template: JST["listings/show"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    // var owner = this.model.owner.fetch();
    this.$el.html(this.template({listing: this.model}));
    return this;
  }
})
