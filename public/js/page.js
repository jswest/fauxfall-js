window.AboutPage = Backbone.Model.extend({
  url: 'pages/about'
});
window.AboutPageView = Backbone.View.extend({
  tagName: 'section',
  className: 'page',
  id: 'about-page',
  initialize: function() { _.bindAll( this, 'render' ); },
  render: function() {
    var primary_template = _.template( $('#about-page-template').html(), this.model.toJSON() );
    $('#content').html( $(this.el).html( primary_template ) );
  }
});
