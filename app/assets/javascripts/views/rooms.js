nycBNB.Views.Rooms = BackBone.View.extend({
  template: JST["root/rooms"],
  render: function () {
    this.$el.html(this.template({listings: this.collection}));
    return this;
  }
})
