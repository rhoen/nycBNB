nycBNB.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    // "logout" : "logout"
    "listings" : "listingsIndex",
    "listings/new" : "newListing",
    "listings/:id" : "listingShow",
    "listings/:id/edit" : "editListing",
    "dashboard" : "dashboard"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currUser = options.currUser;
    this.listings = new nycBNB.Collections.Listings();
  },

  dashboard: function () {
    this.currUserListings = new nycBNB.Views.Listings.Index();
    this.currUserListings.fetch({
      query: {filter: "current_user"}
    })
    debugger
  },

  listingsIndex: function () {
    this.listings.fetch();
    var indexView = new nycBNB.Views.Listings.Index({
      collection: this.listings
    });

    this.$rootEl.html(indexView.render().$el);
  },
  newListing: function () {
    var listing = new nycBNB.Models.Listing();
    var formView = new nycBNB.Views.Listings.Form({
      model: listing
    })
    this.$rootEl.html(formView.render().$el);
  },
  listingShow: function (id) {
    console.log("listing show view");
    var listing = this.listings.getOrFetch(id);
    var showView = new nycBNB.Views.Listings.Show({
      model: listing
    });

    this.$rootEl.html(showView.render().$el);
  },
  editListing: function () {},

  landingPage: function () {
    this.$rootEl.html("you've landed");
    var index = new nycBNB.Views.Listings.Index({
      collection: this.listings
    });
    this.listings.fetch();
    this.$rootEl.append(index.render().$el)
  },

  // logout: function (event) {
  //   $.ajax("/sessions",{
  //     method: "DELETE",
  //   })
  // }



})
