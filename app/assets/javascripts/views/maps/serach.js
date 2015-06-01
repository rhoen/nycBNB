nycBNB.Views.Maps.Search = Backbone.View.extend({
  results: JST["maps/results"],
  form: JST["maps/search_form"],
  initialize: function () {
    this.resultsView = new nycBNB.Views.Maps.Results({
      collection: this.collection
    })
  },
  id: "search-container",
  events: {
    // "click .submit-search" : "search"
  },
  // search: function (event) {
  //   event.preventDefault();
  //   var formData = $(event.currentTarget.parentElement).serializeJSON();
  //
  //   this.collection.fetch({
  //       data: { query: formData}
  //     }
  //   )
  // },
  tagName: "section",
  render: function () {
    this.$el.html(this.form());
    this.slider();
    this.$el.append(this.resultsView.$el);
    this.$el.append("<div id='pagination'></div>");
    this.resultsView.render();
    return this;
  },
  slider: function () {
    $( "#price-range" ).slider({
      range: true,
      min: 10,
      step:5,
      max: 1000,
      values: [ 40, 250 ],
      slide: function( event, ui ) {
        $( "#low-val" ).val(ui.values[ 0 ]);
        $( "#high-val" ).val(ui.values[ 1 ]);
      }
    });

    $( "#low-val" ).val($("#price-range").slider("values", 0 ));
    $( "#high-val" ).val($("#price-range").slider("values", 1 ));
  },
  remove: function () {
    this.resultsView.remove()
    Backbone.View.prototype.remove.call(this);
  },


})
