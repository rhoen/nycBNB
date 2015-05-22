nycBNB.Views.Listings.Show = Backbone.CompositeView.extend({
  tagName: "section",
  className: "listing-show",
  tripForm: JST["trips/form"],
  template: JST["listings/show"],
  displayPhotos: JST["listings/display_photos"],
  initialize: function () {

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addOwnerView.bind(this));
    this.addOwnerView();
  },
  addOwnerView: function () {
    if (this.model.get("owner_id") && !this.owner) {
      this.owner = new nycBNB.Models.User({id: this.model.get("owner_id")});
      var ownerView = new nycBNB.Views.Listings.Owner({model: this.owner})

      this.owner.fetch();
      this.addSubview('#owner', ownerView);
    }
  },
  addTripForm: function () {},
  render: function () {
    this.$el.html(this.template({
      listing: this.model,
      owner: this.owner
    }));
    this.$("#show-photos").html(this.displayPhotos({room: this.model}));
    // this.$el.append(this.tripForm({listing: this.model}));
    return this;
  }

})
