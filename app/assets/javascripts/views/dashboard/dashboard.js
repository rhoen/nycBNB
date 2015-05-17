nycBNB.Views.Dashboard.Dashboard = Backbone.CompositeView.extend({
  template: JST["shared/dashboard"],
  initialize: function(options) {
    this.currUser = options.currUser;
  },
  render: function () {
    this.$el.html(this.template({
      user: this.currUser
    }));
    return this;
  }
})
