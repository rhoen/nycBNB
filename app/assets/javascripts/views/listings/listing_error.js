nycBNB.Views.Listings.Error = Backbone.View.extend({
  template: JST["listings/error"],

  initialize: function(options) {
    this.errors = options.errors;
    options.className && (this.className = options.className);
  },
  render: function () {
    this.$el.html(this.template({errors: this.errors}));
    return this;
  }
})
