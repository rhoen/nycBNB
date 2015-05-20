nycBNB.Views.Maps.Results = Backbone.View.extend({
  tagName: "section",
  id: "search-results",
  template: JST["maps/results"],
  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render)
  },
  render: function () {
    this.$el.html(this.template({
      listings: this.collection
    }));
    return this;
  }
})
