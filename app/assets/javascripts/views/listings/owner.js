nycBNB.Views.Listings.Owner = Backbone.View.extend({
  template: JST["listings/owner"],
  className: "show-profile",
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({owner: this.model}));
    return this;
  },
})
