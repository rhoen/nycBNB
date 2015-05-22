nycBNB.Views.RoomsList = Backbone.CompositeView.extend({
  template: JST["rooms/rooms_list"],
  tagName: "section",
  className: "rooms-list",
  id: "rooms-list-view-container",
  initialize: function (options) {
    this.title = options.title;
    // this.listenTo(this.collection, 'add', this.addRoom);
    this.listenTo(this.collection, 'change:active', this.checkSubviews);
    this.listenToOnce(this.collection, 'sync', this.syncSubviews);
    this.status = options.status;
  },
  syncSubviews: function () {
    this.collection.where({active: this.status}).forEach(function(room){
      this.addRoom(room);
    }.bind(this))
  },
  checkSubviews: function (model, value) {
    //remove subview if it doesn't belong
    if (this.status != value) {
      this.removeModelSubview(".rooms", model);
    }
    //add subview if it does belong
    if (this.status == value) {
      this.addRoom(model);
    }
  },
  render: function () {
    var content = this.template({
      rooms: this.collection,
      status: this.status
    });
    this.$el.html(content);

    return this;
  },
  addRoom: function(room) {
    console.log("add room on a room list");
    var subView = new nycBNB.Views.Room({
      model: room,
      collection: this,
    });
    this.addSubview(".rooms", subView);
  },

})
