nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  className: "roomsContainer",
  template: JST["root/rooms"],
  initialize: function () {
    this.setCollections();
    this.listenTo(this.collection, 'sync', this.setCollections)
    this.listenTo(this.collection, 'sync', this.render)
  },
  events: {
    "click .room": "detailView"
  },
  detailView: function (event) {
    console.log("rooms over view method");
    $target = $(event.target);
    var room = this.collection.getOrFetch($target.data('id'));
    debugger
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
