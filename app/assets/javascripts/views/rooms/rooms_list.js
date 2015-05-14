nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  template: JST["root/rooms"],
  initialize: function (options) {
    this.title = options.title;
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    var content = this.template({
      rooms: this.collection,
      title: this.title
    }));

    this.$el.html(content);
    this.renderRooms();

    return this;
  },
  renderRooms: function () {
    this.colleciton.each(this.addRoom.bind(this));
  },
  addRoom: function(room) {
    var subView = new nycBNB.Views.Room({model: room});
    this.addSubView( , subView);
  }
})
