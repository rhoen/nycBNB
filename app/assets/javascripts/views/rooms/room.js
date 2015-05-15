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
    if ($(event.currentTarget).hasClass("inactive")) {
      $(event.currentTarget).removeClass("inactive");
      $(event.currentTarget).addClass("active");
    } else {
      $(event.currentTarget).removeClass("active");
      $(event.currentTarget).addClass("inactive");
    }
  },
  render: function () {
    console.log("render individual Room view");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
