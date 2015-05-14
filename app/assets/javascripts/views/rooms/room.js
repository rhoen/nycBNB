nycBNB.Views.Room = Backbone.CompositeView.extend({
  template: ,
  render: function () {
    this.$el.html(this.template({room: this.model}));
    return this;
  }
})
