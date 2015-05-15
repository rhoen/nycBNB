nycBNB.Views.RoomsList = Backbone.CompositeView.extend({
  template: JST["rooms/rooms_list"],
  initialize: function (options) {
    this.title = options.title;
    this.listenTo(this.collection, 'add', this.addRoom);

    this.collection.each(this.addRoom.bind(this));
  },
  render: function () {
    console.log("render rooms list view");
    var content = this.template({
      rooms: this.collection,
      status: this.status
    });

    this.$el.html(content);
    this.attachSubviews();

    return this;
  },
  addRoom: function(room) {
    console.log("addRoom function in roomsList");
    var subView = new nycBNB.Views.Room({model: room});
    this.addSubview("#rooms", subView);
  }
})
