nycBNB.Views.Root = Backbone.View.extend({
  // template: JST["header/nav"],
  template: JST["root/index"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log("render root");
    this.$el.html(this.template({user: this.model}));
    return this;
  }
})
