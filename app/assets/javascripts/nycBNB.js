window.nycBNB = {
  Models: {},
  Collections: {},
  Views: {
    Listings: {},
    Dashboard: {}
  },
  Routers: {},
  initialize: function() {
    // var currUser = new nycBNB.Models.CurrUser();
    var currUser = new nycBNB.Models.User()
    currUser.fetch({
      url: "/api/users/curr_user"
    });
    var rootView = new nycBNB.Views.Root({model: currUser});
    $('body').append(rootView.render().$el);
    $('body').append("<div id='app-content'></div>");
    new nycBNB.Routers.Router({
      $rootEl: $('#app-content'),
      currUser: currUser
    })
    Backbone.history.start();
  }
};
