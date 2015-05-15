nycBNB.Views.Room = Backbone.CompositeView.extend({
  template: JST["rooms/room"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },
  events: {
    "click button.status" : "toggleStatus"
  },
  toggleStatus: function (event) {
    event.preventDefault();
    $target = $(event.currentTarget);
    if ($target.hasClass("inactive")) {
      $target.removeClass("inactive");
      $target.addClass("active");
      this.model.set("active", "true");
    } else {
      $target.removeClass("active");
      $target.addClass("inactive");
      this.model.set("active", "false");
    }
  },
  render: function () {
    console.log("render individual Room view");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
