nycBNB.Views.Dashboard = Backbone.View.extend({
  dashNav: JST["shared/dashboard_nav"],
  render: function () {
    this.$el.html(this.dashNav());

    return this;
  }
})
