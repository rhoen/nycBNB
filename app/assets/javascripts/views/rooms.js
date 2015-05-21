nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  id: "rooms-container clearfix",
  template: JST["root/rooms"],
  initialize: function () {
    this.setCollections();
    // this.listenToOnce(this.collection, 'sync', this.setCollections)
    // this.listenToOnce(this.collection, 'sync', this.render)
    // this.listenTo(this.collection, 'sync', this.setCollections)
    // this.listenTo(this.collection, 'sync', this.render)
    this.setCollections2();
    this.listenTo(this.collection, 'sync', this.renderSubViews)

  },
  events: {
    "click .room": "photoEdit"
  },
  renderSubViews: function () {
    console.log("eachSubview");
    this.eachSubview(function(subview, selector) {
      console.log("calling render on subview");
      // subview.render();
      subview.renderSubviews && subview.renderSubviews();
    })
  },
  photoEdit: function(event) {
    if (this._photoEditView) {
      var modelId = this._photoEditView.model.id
      $(".room").data({id: modelId}).removeClass("selected");
      this.removeSubview("#detail-view", this._photoEditView);
    }
    $target = $(event.target);
    $target.addClass("selected");
    var room = this.collection.getOrFetch($target.attr('data-id'));
    this._photoEditView = new nycBNB.Views.Listings.PhotoEdit({
      model: room,
      // collection: room._photos
    });
    this.addSubview("#detail-view", this._photoEditView);
  },
  setCollections2: function () {
    this.activeRooms = new nycBNB.Collections.Listings({
      this.collection
    });
    this.activeRooms.status = "active-rooms";
    this.inactiveRooms = new nycBNB.Collections.Listings({
      this.collection
    });
    this.inactiveRooms.status = "inactive-rooms";
  },
  // setCollections: function () {
  //   var active = this.collection.where({active: true});
  //   var inactive = this.collection.where({active: false});
  //
  //   this.activeRooms = new nycBNB.Collections.Listings(active);
  //   this.activeRooms.status = "active-rooms";
  //   this.inactiveRooms = new nycBNB.Collections.Listings(inactive);
  //   this.inactiveRooms.status = "inactive-rooms";
  //
  // },
  render: function () {
    console.log("room over view render");
    this.$el.html(this.template());
    this.renderRoomLists();
    return this;
  },
  // renderRoomLists: function () {
  //   console.log("trigger room lists render");
  //   this.addRoomsList(this.activeRooms);
  //   this.addRoomsList(this.inactiveRooms);
  // },
  addRoomsList: function(roomsList) {
    var subView = new nycBNB.Views.RoomsList({
      collection: roomsList,
      status: roomsList.status
    });
    this.addSubview("#" + roomsList.status, subView);
  }
})
