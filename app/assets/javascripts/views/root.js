nycBNB.Views.Root = Backbone.View.extend({
  header: JST["root/header_nav"],
  template: JST["root/index"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    console.log("render root");
    this.$el.empty();
    this.$el.append(this.header());
    this.$el.append(this.template({user: this.model}));
    return this;
  }
})
