nycBNB.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    // "logout" : "logout"
    // "listings" : "listingsIndex",
    "listings/new" : "newListing",
    "listings/:id" : "listingShow",
    // "listings/:id/edit" : "editListing",
    "dashboard" : "dashboard",
    "rooms" : "rooms"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currUser = options.currUser;
    this.listings = new nycBNB.Collections.Listings();
  },

  rooms: function () {
    this.ensureDashNav();
    this.currUserListings = new nycBNB.Collections.Listings();
    this.currUserListings.fetch({
      data: {query: "current_user"}
    });
    var roomsView = new nycBNB.Views.Rooms({
      collection: this.currUserListings
    });

    this.$dashContent.html(roomsView.render().$el);
  },

  dashboard: function () {
    this.ensureDashNav();
    this.$dashContent.empty();

  },

  ensureDashNav: function () {
    if (!this.dashView) {
      this.dashView = new nycBNB.Views.Dashboard.Dashboard({});
      this.$rootEl.html(this.dashView.render().$el);

      this.$dashContent = $('#dash-content');
    }
  },
  ensureRemoveDashNav: function () {
    if (this.dashView) {
      this.dashView.remove();
      this.dashView = null;
    }
  },

  // listingsIndex: function () {
  //   this.listings.fetch();
  //   var indexView = new nycBNB.Views.Listings.Index({
  //     collection: this.listings
  //   });
  //
  //   this.$rootEl.html(indexView.render().$el);
  // },
  newListing: function () {
    this.ensureRemoveDashNav();
    var listing = new nycBNB.Models.Listing();
    var formView = new nycBNB.Views.Listings.Form({
      model: listing
    })
    this.$rootEl.html(formView.render().$el);
  },
  listingShow: function (id) {
    this.ensureRemoveDashNav();
    console.log("listing show view");
    var listing = this.listings.getOrFetch(id);
    var showView = new nycBNB.Views.Listings.Show({
      model: listing
    });

    this.$rootEl.html(showView.render().$el);
  },
  // editListing: function () {},

  landingPage: function () {
    // this.$rootEl.html("you've landed");
    // var index = new nycBNB.Views.Listings.Index({
    //   collection: this.listings
    // });
    // this.listings.fetch();
    // this.$rootEl.append(index.render().$el)
  },

  // logout: function (event) {
  //   $.ajax("/sessions",{
  //     method: "DELETE",
  //   })
  // }



})
