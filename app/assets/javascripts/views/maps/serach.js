nycBNB.Views.Maps.Search = Backbone.View.extend({
  template: JST[""],
  initialize: function () {
    // this.listenTo(this.collection, 'sync', this.renderResults);
    this.results = new nycBNB.Views.Maps.Results({
      collection: this.collection
    })
  },
  form: JST["maps/search_form"],
  id: "search-container",
  tagName: "section",
  // renderResults: function () {
  //
  // },
  render: function () {
    this.$el.html(this.form());

    this.$el.append(this.results.render());
    return this;
  },


})
