window.nycBNB = {
  Models: {},
  Collections: {},
  Views: {
    listings: {}
  },
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    new nycBNB.Routers.Router({
      $rootEl: $('#app-content')
    })
    Backbone.history.start();
  }
};
