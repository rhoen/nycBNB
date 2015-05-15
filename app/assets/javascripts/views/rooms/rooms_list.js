nycBNB.Views.RoomsList = Backbone.CompositeView.extend({
  template: JST["rooms/rooms_list"],
  initialize: function (options) {
    this.title = options.title;
    this.listenTo(this.collection, 'add', this.addRoom);
    this.colleciton.each(this.addRoom.bind(this));
  },
  render: function () {
    var content = this.template({
      rooms: this.collection,
      status: this.status
    });

    this.$el.html(content);
    this.attachSubViews();

    return this;
  },
  addRoom: function(room) {
    var subView = new nycBNB.Views.Room({model: room});
    this.addSubView("#rooms", subView);
  }
})
