nycBNB.Views.Rooms = Backbone.View.extend({
  template: JST["root/rooms"],
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    console.log('rendered rooms view');
    this.$el.html(this.template({listings: this.collection}));
    return this;
  }
})
