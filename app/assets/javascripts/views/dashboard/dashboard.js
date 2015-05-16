nycBNB.Views.Dashboard.Dashboard = Backbone.CompositeView.extend({
  dashNav: JST["shared/dashboard_nav"],
  events: {
    "click button":"createListing"
  },
  createListing: function (event) {
    debugger
    event.preventDefault();
    Backbone.history.navigate("listings/new", {trigger: true});
  },
  render: function () {
    this.$el.html(this.dashNav());
    this.$el.append("<div id='dash-content'></div>");
    return this;
  },
})
