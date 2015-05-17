nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  template: JST["root/rooms"],
  initialize: function () {
    this.setCollections();
    this.listenTo(this.collection, 'sync', this.setCollections)
    this.listenTo(this.collection, 'sync', this.render)
  },
  setCollections: function () {
    var active = this.collection.where({active: true});
    var inactive = this.collection.where({active: false});

    this.activeRooms = new nycBNB.Collections.Listings(active);
    this.activeRooms.status = "active-rooms";
    this.inactiveRooms = new nycBNB.Collections.Listings(inactive);
    this.inactiveRooms.status = "inactive-rooms";
  },
  render: function () {
    console.log("rooms with an S render");
    this.$el.html(this.template());
    this.renderRoomLists();
    this.$el.append
    return this;
  },
  renderRoomLists: function () {
    this.addRoomsList(this.activeRooms);
    this.addRoomsList(this.inactiveRooms);
  },
  addRoomsList: function (roomsList) {
    var subView = new nycBNB.Views.RoomsList({
      collection: roomsList,
      status: roomsList.status
    });
    this.addSubview("#" + roomsList.status, subView);
  }
})
