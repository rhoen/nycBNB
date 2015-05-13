nycBNB.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "landingPage"
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.currUser = new nycBNB.Models.CurrUser();
    this.currUser.fetch();
  },

  landingPage: function () {
    alert("landing page");
    this.$rootEl.html("you've landed");
    var rootView = nycBNB.Views.Root({model: this.currUser});
    this.$rootEl.append(rootView.render().$el);
  }



})
