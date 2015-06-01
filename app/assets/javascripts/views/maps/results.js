nycBNB.Views.Maps.Results = Backbone.View.extend({
  tagName: "section",
  id: "search-results",
  className: "clearfix search-results",
  template: JST["maps/results"],
  pagination: JST["maps/pagination"],
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  render: function () {
    this.$el.html(this.template({
      listings: this.collection
    }));
    $("#pagination").html(this.pagination({listings: this.collection}));
    return this;
  }
})
