nycBNB.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    // "logout" : "logout"
    "listings" : "listingsIndex",
    "listings/new" : "newListing",
    "listings/:id" : "listingShow",
    "listings/:id/edit" : "editListing"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currUser = options.currUser;
  },
  listingsIndex: function () {
    this.listings = new nycBNB.Collections.Listings();
    this.listings.fetch();
    var indexView = new nycBNB.Views.Listings.Index({
      collection: this.listings
    });

  },
  newListing: function () {},
  listingShow: function () {
    var listing = new nycBNB.Views.Listings.Show();
  },
  editListing: function () {},

  landingPage: function () {
    this.$rootEl.html("you've landed");    
  },

  // logout: function (event) {
  //   $.ajax("/sessions",{
  //     method: "DELETE",
  //   })
  // }



})
