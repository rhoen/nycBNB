nycBNB.Views.Listings.Show = Backbone.CompositeView.extend({
  tagName: "section",
  className: "listing-show",
  tripForm: JST["trips/form"],
  template: JST["listings/show"],
  showPhotos: JST["listings/show_photos"],
  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model, 'sync', this.setBackground);
    this.listenTo(this.model, 'sync', this.addOwnerView.bind(this));
    this.addOwnerView();
  },
  setBackground: function () {
    if (this.model._photos) {
      var primaryPhoto;
      this.model._photos.forEach(function(photo){
        if (photo.get("primary_photo")) {
          primaryPhoto = photo;
        }
      })
      $("#high-light-photo")
        .css("background-image", "url(" + primaryPhoto.get('original_url') + ")");
    }
  },
  addOwnerView: function () {
    if (this.model.get("owner_id")) {
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
    }));
    if (this.model._photos){
      this.$("#show-photos").html(this.showPhotos({photos: this.model._photos}));
    }
    // this.$el.append(this.tripForm({listing: this.model}));
    return this;
  }

})
