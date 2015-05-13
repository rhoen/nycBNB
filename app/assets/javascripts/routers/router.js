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
    this.currUser = new nycBNB.Models.CurrUser();
    this.currUser.fetch();
  },
  listingsIndex: function () {
    this.collection = new nycBNB.Collections.Listings();
    this.collection.fetch();
    var indexView = new nycBNB.Views.Listings.Index({
      collection: this.collection
    });
    debugger
  },
  newListing: function () {},
  listingShow: function () {},
  editListing: function () {},

  landingPage: function () {
    this.$rootEl.html("you've landed");
    console.log("about to create new rootView");
    var rootView = new nycBNB.Views.Root({model: this.currUser});
    this.$rootEl.append(rootView.render().$el);
  },

  // logout: function (event) {
  //   $.ajax("/sessions",{
  //     method: "DELETE",
  //   })
  // }



})
