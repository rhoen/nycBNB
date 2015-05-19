nycBNB.Views.Listings.PhotoEdit = Backbone.CompositeView.extend({
  // className: "photo-edit",
  template: JST["listings/photo_edit"],
  initialize: function () {
    // this.listenTo(this.model, 'sync', this.render)
  },
  render: function () {
    console.log("photo edit view render");
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
