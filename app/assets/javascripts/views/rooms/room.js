nycBNB.Views.Room = Backbone.CompositeView.extend({
  template: JST["rooms/room"],
  render: function () {
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
