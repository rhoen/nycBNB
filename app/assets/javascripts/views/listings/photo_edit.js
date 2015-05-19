nycBNB.Views.Listings.PhotoEdit = Backbone.CompositeView.extend({
  className: "photo-edit"
  template: JST["listings/photo_edit"],
  initialize: function () {
    // this.model.fetch();
  },
  render: function () {
    this.html(this.template({room: this.model}));
    return this;
  }
})
