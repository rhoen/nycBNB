nycBNB.Views.Dashboard.DashNav = Backbone.CompositeView.extend({
  dashNav: JST["shared/dashboard_nav"],
  render: function () {
    this.$el.html(this.dashNav());
    this.$el.append("<div id='dash-content'></div>");
    return this;
  },
})
