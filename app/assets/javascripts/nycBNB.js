window.nycBNB = {
  Models: {},
  Collections: {},
  Views: {
    Listings: {}
  },
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    var currUser = new nycBNB.Models.CurrUser();
    currUser.fetch();
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
