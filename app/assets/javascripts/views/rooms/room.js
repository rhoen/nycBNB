nycBNB.Views.Room = Backbone.CompositeView.extend({
  template: JST["rooms/room"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  render: function () {
    console.log("render individual Room view");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
