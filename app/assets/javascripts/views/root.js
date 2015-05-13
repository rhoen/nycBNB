nycBNB.Views.Root = Backbone.View.extend({
  header: JST["root/header_nav"],
  template: JST["root/index"],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.header({user: this.model}));
    this.$el.append(this.template({user: this.model}));
    return this;
  }
})
