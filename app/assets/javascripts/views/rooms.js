nycBNB.Views.Rooms = Backbone.CompositeView.extend({
  template: JST["root/rooms"],
  initialize: function () {
    this.setCollections();
    this.listenTo(this.collection, 'sync', this.setCollections);
    this.listenTo(this.collection, 'sync', this.render);
  },
  render: function () {
    console.log('rendered rooms view');
    this.$el.html(this.template({listings: this.collection}));
    return this;
  },
  setCollections: function () {
    this.listedRooms = this.collection.where({active: true});
    this.unlistedRooms = this.collection.where({active: false});
  }
})
