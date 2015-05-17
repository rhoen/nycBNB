nycBNB.Views.Room = Backbone.CompositeView.extend({
  template: JST["rooms/room"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    "click button.status" : "toggleStatus",
    "click button.edit" : "editRoom",
    "click button.delete" : "deleteRoom"
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

    $target = $(event.currentTarget);
    if ($target.hasClass("inactive")) {

      this.model.set({"active": "true"});
      this.model.save({},{
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
          this.$el.append("<div id='errors'></div>")
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
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
