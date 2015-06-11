window.nycBNB = {
  Models: {},
  Collections: {},
  Views: {
    Listings: {},
    Dashboard: {},
    Maps: {}
  },
  Routers: {},
  initialize: function() {
    // var currUser = new nycBNB.Models.CurrUser();
    nycBNB.onMaps = false
    nycBNB.currUser = new nycBNB.Models.User()
    nycBNB.currUser.fetch({
      url: "/api/users/curr_user",
      error: function () {
        console.log('fetch error call back');
        nycBNB.currUser = null;
        console.log(this.currUser);
      }.bind(this)
    });
    var rootView = new nycBNB.Views.Root({model: nycBNB.currUser});
    $('body').append(rootView.render().$el);
    $('body').append("<div id='app-content'></div>");
    new nycBNB.Routers.Router({
      $rootEl: $('#app-content'),
    })
    Backbone.history.start();
  }
};
