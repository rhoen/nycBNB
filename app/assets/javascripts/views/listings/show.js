nycBNB.Views.Listings.Show = Backbone.CompositeView.extend({
  tagName: "section",
  className: "trip-form",
  tripForm: JST["trips/form"],
  template: JST["listings/show"],
  initialize: function () {

    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.addOwnerView);
    this.addOwnerView();
  },
  addOwnerView: function () {
    if (this.model.get("owner_id") && !this.owner) {
      this.owner = new nycBNB.Models.User({id: this.model.get("owner_id")});
      var ownerView = new nycBNB.Views.Listings.Owner({model: this.owner})

      this.owner.fetch();
      this.$el.append("<div class='owner-profile'></div>");
      this.addSubview('.owner-profile', ownerView);
    }
  },
  addTripForm: function () {},
  render: function () {
    this.$el.html(this.template({
      listing: this.model,
      owner: this.owner
    }));
    this.$el.append(this.tripForm({listing: this.model}));
    return this;
  }

})
