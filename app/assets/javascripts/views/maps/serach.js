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
  events: {
    "click .submit-search" : "search"
  },
  search: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget.parentElement).serializeJSON();
    this.collection.fetch({
        data: { query: formData}
      }
    )
  },
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
