nycBNB.Models.User = Backbone.Model.extend({
  urlRoot: "/api/users",
  toJSON: function(payload) {
    var json = {user: _.clone(this.attributes)};

    return json;
  },
})
