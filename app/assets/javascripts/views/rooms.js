nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  id: "rooms-container clearfix",
  template: JST["root/rooms"],
  initialize: function () {
    this.setCollections();
    this.listenToOnce(this.collection, 'sync', this.setCollections)
    this.listenToOnce(this.collection, 'sync', this.render)
  },
  events: {
    "click .room": "detailView"
  },
  detailView: function (event) {
    console.log("detail view method");
    if (this._photoEditView) {
      var id = this._photoEditView.model.id
      $(".room").data({id: id}).removeClass("selected");
      this.removeSubview("#detail-view", this._photoEditView);
    }
    $target = $(event.target);
    $target.addClass("selected");
    var room = this.collection.getOrFetch($target.data('id'));
    this._photoEditView = new nycBNB.Views.Listings.PhotoEdit({
      model: room
    });
    this.addSubview("#detail-view", this._photoEditView);
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
    console.log("room over view render");
    this.$el.html(this.template());
    this.renderRoomLists();
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
