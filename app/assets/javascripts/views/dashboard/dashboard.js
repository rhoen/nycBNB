nycBNB.Views.Dashboard.Dashboard = Backbone.CompositeView.extend({
  template: JST["shared/dashboard"],
  initialize: function(options) {
    this.currUser = options.currUser;
    this.listings = options.listings;
    this.addRequests();
    this.listenToOnce(this.currUser, "sync", this.render);
  },
  events: {
    "submit form": "uploadPhoto"
  },
  addRequests: function () {
    this.render();
    requestsView = new nycBNB.Views.Requests({
      collection: this.listings
    });
    this.addSubview("#requests-container", requestsView);
  },
  uploadPhoto: function (event) {
    event.preventDefault();
    $(".add-photo-button").addClass("saving");
    var file = $.find("#input-user-avatar")[0].files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
      // $()
      var result = reader.result;
      this.currUser.save({avatar: result}, {
        parse: true,
        success: function () {
          $(".add-photo-button").removeClass("saving");
          $(".profile-picture.thumb").attr("src", reader.result);
          $(".user-profile img").attr("src", reader.result);
        }.bind(this)
      })
      var formData = event;
    }.bind(this);
    if (file) {
      reader.readAsDataURL(file) //async process
    }

    // this.currUser.save({avatar: },{});
  },
  render: function () {
    this.$el.html(this.template({
      user: this.currUser
    }));



    return this;
  }
})
