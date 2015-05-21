nycBNB.Views.RoomsList = Backbone.CompositeView.extend({
  template: JST["rooms/rooms_list"],
  tagName: "section",
  id: "rooms-list-view-container",
  initialize: function (options) {
    this.title = options.title;
    this.listenTo(this.collection, 'add', this.addRoom);
    this.listenToOnce(this.collection, 'sync', this.addSubviews);
    this.status = options.status;
  },
  addSubviews: function () {
    this.collection.where({active: this.status}).forEach(function(room){
      this.addRoom(room);
    }.bind(this));
  },
  // renderSubViews: function () {
  //   this.eachSubview(function(subview, selector) {
  //     console.log("calling render on a roomslist subview");
  //     subview.render();
  //     // subview.renderSubviews && subview.renderSubviews();
  //   })
  // },
  render: function () {
    var content = this.template({
      rooms: this.collection,
      status: this.status
    });

    this.$el.html(content);

    this.eachSubview(function (subview, selector) {
      debugger
      if (subview.model.status === this.status) {
        console.log("attach subview");
        this.attachSubview(selector, subview);
      }
    }.bind(this))

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
