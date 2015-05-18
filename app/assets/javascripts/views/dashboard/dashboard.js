nycBNB.Views.Dashboard.Dashboard = Backbone.CompositeView.extend({
  template: JST["shared/dashboard"],
  initialize: function(options) {
    this.currUser = options.currUser;
    this.listenTo(this.currUser, "sync", this.render);
  },
  render: function () {
    this.$el.html(this.template({
      user: this.currUser
    }));
    return this;
  }
})
