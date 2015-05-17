nycBNB.Views.Dashboard.Dashboard = Backbone.CompositeView.extend({
  template: JST["shared/dashboard"],
  render: function () {
    this.$el.html(this.template({
      user: nycBNB.currUser,
    }));
    return this;
  }
})
