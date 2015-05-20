nycBNB.Views.Maps.Search = Backbone.View.extend({
  template: JST[""],
  initialize: function () {
    // this.listenTo(this.collection, 'sync', this.renderResults);
    this.results = new nycBNB.Views.Maps.Results({
      collection: this.collection
    })
  },
  form: JST["maps/search_form"],
  id: "search-container",
  events: {
    "click .submit-search" : "search"
  },
  search: function (event) {
    event.preventDefault();
    var formData = $(event.currentTarget.parentElement).serializeJSON();

    this.collection.fetch({
        data: { query: formData}
      }
    )
  },
  tagName: "section",
  // renderResults: function () {
  //
  // },
  render: function () {
    this.$el.html(this.form());
    this.slider();
    this.$el.append(this.results.render());
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
  }


})
