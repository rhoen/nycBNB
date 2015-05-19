nycBNB.Views.Room = Backbone.CompositeView.extend({
  className: "room",
  template: JST["rooms/room"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  attributes: function () {
    return  {
      "data-id": this.model.id
    }
  },
  events: {
    "click button.status" : "toggleStatus",
    "click button.edit" : "editRoom",
    "click button.delete" : "deleteRoom",
    "click" : "roomDetail"
  },
  deleteRoom: function(event) {
    event.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        // this.collection.remove(this.model);
      }.bind(this)
    });
  },
  editRoom: function(event) {
    event.preventDefault();
    Backbone.history.navigate("/listings/" + this.model.id + "/edit", {
      trigger: true
    });
  },
  toggleStatus: function (event) {
    event.preventDefault();

    var $target = $(event.currentTarget);
    if ($target.hasClass("inactive")) {

      // this.model.set({});
      this.model.save({"active": true},{
        success: function () {
          $target.removeClass("inactive");
          $target.addClass("active");
        },
        error: function (model, response) {
          //response.responseJSON
          this.model.set({"active": false});
          if (this.errorView) {
            this.removeSubview("#errors", this.errorView);
          }
          this.errorView = new nycBNB.Views.Listings.Error({
            errors: response.responseJSON
          });
          this.$el.append("<div id='errors'></div>");
          this.addSubview("#errors",this.errorView);
        }.bind(this)
      });
    } else {
      $target.removeClass("active");
      $target.addClass("inactive");
      this.model.set({"active": "false"});
      this.model.save();
    }
  },
  render: function () {
    console.log("room view render");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
