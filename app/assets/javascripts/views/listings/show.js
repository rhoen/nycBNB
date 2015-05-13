nycBNB.Views.Listings.Show = Backbone.View.extend({
  template: JST["listings/show"],
  render: function () {
    var owner = this.model.owner.fetch();
    this.$el.html(this.template({listing: this.model}));
    return this;
  }
})
