nycBNB.Views.Listings.Form = Backbone.View.extend({
  template: JST["listngs/form"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({
      listing: this.model
    }));
    return this;
  }
})
