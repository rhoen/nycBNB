nycBNB.Views.RoomsList = Backbone.CompositeView.extend({
  template: JST["rooms/rooms_list"],
  tagName: "section",
  id: "rooms-list-view-container",
  initialize: function (options) {
    this.title = options.title;
    this.listenTo(this.collection, 'add', this.addRoom);
    this.listenTo(this.collection, "change sync", this.checkHide);
    this.status = options.status;
    this.collection.each(this.addRoom.bind(this));
  },
  checkHide: function () {
    if (this.collection.length === 0) {
      // $('rooms-list-view-container').addClass("hidden");
      // this.remove();
    }
  },
  render: function () {
    console.log("rooms_list render");
    // if (this.collection.length > 0 ) {
      var content = this.template({
        rooms: this.collection,
        status: this.status
      });

      this.$el.html(content);
      this.attachSubviews();
    // } else {
    //
    // }

    return this;
  },
  addRoom: function(room) {
    var subView = new nycBNB.Views.Room({
      model: room,
      collection: this
    });
    this.addSubview("#rooms", subView);
  },

})
