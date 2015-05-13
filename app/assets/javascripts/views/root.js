nycBNB.Views.Root = Backbone.View.extend({
  // template: JST["header/nav"],
  template: JST["root"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({user: this.model}));
    return this;
  }
})
