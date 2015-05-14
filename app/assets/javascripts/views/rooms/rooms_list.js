nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  template: JST["rooms/rooms"],
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    this.$el.html(this.template({listings: this.collection}));
    return this;
  },
  
})
