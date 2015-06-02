nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  id: "rooms-container",
  className: "rooms-container clearfix",
  template: JST["root/rooms"],
  initialize: function () {
    this.$el.html(this.template());
    this.setCollections2();
  },
  events: {
    "click .room-highlight-photo": "photoEdit"
  },
  renderSubViews: function () {
    console.log("eachSubview");
    this.eachSubview(function(subview, selector) {
      console.log("calling render on subview");
      subview.render();
      this.attachSubview(selector, subview);
    }.bind(this))
  },
  photoEdit: function(event) {
    if (this._photoEditView) {
      var modelId = this._photoEditView.model.id
      $(".room").data({id: modelId}).removeClass("selected");
      this.removeSubview("#detail-view", this._photoEditView);
    }
    $target = $(event.currentTarget.parentElement.parentElement);
    $target.addClass("selected");
    var room = this.collection.getOrFetch($target.attr('data-id'));
    this._photoEditView = new nycBNB.Views.Listings.PhotoEdit({
      model: room,
      collection: room._photos
    });
    this.addSubview("#detail-view", this._photoEditView);
  },
  setCollections2: function () {
    var activeRoomsView = new nycBNB.Views.RoomsList({
      collection: this.collection,
      status: true
    });
    var inactiveRoomsView = new nycBNB.Views.RoomsList({
      collection: this.collection,
      status: false
    });


    this.addSubview("#active-rooms", activeRoomsView);
    this.addSubview("#inactive-rooms", inactiveRoomsView);
  },
  render: function () {
    console.log("room over view render");
    return this;
  },
})
