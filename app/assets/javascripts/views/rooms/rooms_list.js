nycBNB.Views.RoomsList = Backbone.CompositeView.extend({
  template: JST["rooms/rooms_list"],
  tagName: "section",
  id: "rooms-list-view-container",
  initialize: function (options) {
    this.title = options.title;
    // this.listenTo(this.collection, 'add', this.addRoom);
    this.listenTo(this.collection, 'sync', this.checkSubviews);
    this.status = options.status;
  },
  checkSubviews: function () {
    console.log("checkSubviews");
    var roomsList = this;
    this.collection.where({active: this.status}).forEach(function(roomModel){
      // debugger
      var subviewExists = false;
      roomsList.eachSubview(function(subview, selector) {
        //remove the subview if it shouldn't be there
        // debugger
        if (subview.model.get("active") !== roomsList.status) {
          console.log("remove the model!");
          roomsList.removeSubview(selector, subview);
          return; //no need to finish out this iteration of the loop
        }

        //ensure that this model has a corresponding view
        if (subview.model == roomModel) {
          subviewExists = true;
        }
      })

      if (!subviewExists) {
        roomsList.addRoom(roomModel);
      }

    });
    var status = this.status ? "active" : "inactive"
    console.log(status, this._subviews);
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
