nycBNB.Views.Room = Backbone.CompositeView.extend({
  className: "room",
  template: JST["rooms/room"],
  initialize: function (options) {
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
  },
  deleteRoom: function(event) {
    event.preventDefault();
    $(event.currentTarget).addClass("deleting");
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

      this.model.save({"active": true},{
        wait: true,
        success: function () {
          $target.removeClass("inactive");
          $target.addClass("active");
        },
        error: function (model, response) {
          //response.responseJSON
          if (this.errorView) {
            this.removeSubview("#errors", this.errorView);
          }
          this.errorView = new nycBNB.Views.Listings.Error({
            errors: response.responseJSON
          });
          this.addSubview(".errors",this.errorView);
        }.bind(this)
      });
    } else {
      this.model.save({"active": false}, {
        success: function () {
          $target.removeClass("active");
          $target.addClass("inactive");
        }
      });
    }
  },
  render: function () {
    console.log("ROOM");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
