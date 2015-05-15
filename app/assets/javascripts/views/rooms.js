nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  template: JST["root/rooms"],
  initialize: function () {
    this.setCollections();
    this.listenTo(this.collection, 'sync', this.setCollections)
  },
  setCollections: function () {
    var active = this.collection.where({active: true});
    var inactivie = this.collection.where({active: !true});

    this.activeRooms = new nycBNB.Collections.Listings(active);
    this.inactiveRooms = new nycBNB.Collections.Listings(inactive);
    this.render();
  },
  render: function () {
    console.log('rendered Rooms view');
    this.$el.html(this.template());
    this.renderRoomLists();
    this.$el.append
    return this;
  },
  renderRoomLists: function () {
    this.addRoomsList(activeRooms);
    this.addRoomsList(inactiveRooms);
  },
  addRoomsList: function (roomsList) {
    var subView = new nycBNB.Views.RoomsList({
      collection: roomsList,
      status: roomsList.status
    });
    this.addSubViews("#rooms-list", subView);
  }
})
