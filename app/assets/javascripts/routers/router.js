nycBNB.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage",
    // "logout" : "logout"
    // "listings" : "listingsIndex",
    "listings/new" : "newListing",
    "listings/:id" : "listingShow",
    "listings/:id/edit" : "editListing",
    "dashboard" : "dashboard",
    "rooms" : "rooms"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currUser = options.currUser;
    this.listings = new nycBNB.Collections.Listings();
    this.currUserListings = new nycBNB.Collections.Listings();
  },

  rooms: function () {
    this.ensureDashNav();
    this.currUserListings.fetch({
      data: {query: "current_user"},
      reset: true
    });
    var roomsView = new nycBNB.Views.Rooms({
      collection: this.currUserListings
    });

    this.swapView(roomsView);
  },

  dashboard: function () {
    this.ensureDashNav();
    var dashboardView = new nycBNB.Views.Dashboard.Dashboard({

    });
    this.swapView(dashboardView);

  },

  ensureDashNav: function () {
    if (!this.dashView) {
      this.dashView = new nycBNB.Views.Dashboard.DashNav({});
      this.$rootEl.prepend(this.dashView.render().$el);
    }
  },
  ensureRemoveDashNav: function () {
    if (this.dashView) {
      this.dashView.remove();
      this.dashView = null;
    }
  },

  swapDashView: function (newDashView) {
    var subs = this.dashView.subviews("#dash-content");
    subs.each(function(sub) {
      sub.remove();
    })
    this.dashView.addSubview("#dash-content", newDashView);
  },
  swapView: function(newView) {
    if (this.contentView) {
      this.contentView.remove();
    }
    this.contentView = newView;
    this.$rootEl.append(newView.render().$el);
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
      model: listing,
      collection: this.currUserListings
    })
    // this.$rootEl.html(formView.render().$el);
    this.swapView(formView);
  },
  listingShow: function (id) {
    this.ensureRemoveDashNav();
    var listing = this.listings.getOrFetch(id);
    var showView = new nycBNB.Views.Listings.Show({
      model: listing
    });

    // this.$rootEl.html(showView.render().$el);
    this.swapView(showView);
  },
  editListing: function (id) {
    this.ensureRemoveDashNav();
    var listing = this.currUserListings.getOrFetch(id);
    var formView = new nycBNB.Views.Listings.Form({
      model: listing,
      collection: this.currUserListings
    })
    // this.$rootEl.html(formView.render().$el);
    this.swapView(formView);
  },

  landingPage: function () {
    // this.$rootEl.html("you've landed");
    // var index = new nycBNB.Views.Listings.Index({
    //   collection: this.listings
    // });
    // this.listings.fetch();
    // this.$rootEl.append(index.render().$el)
  },

})
