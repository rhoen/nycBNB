window.nycBNB = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    alert('Hello from Backbone!');
    new nycBNB.Routers.Router({
      $rootEl: $('#app-content')
    })
    Backbone.history.start();
  }
};