define(function(AboutPage) {


  var AboutPageView = Backbone.View.extend({
    tagName: 'section',
    className: 'page',
    id: 'about-page',
    initialize: function() { _.bindAll( this, 'render' ); },
    render: function() {
      var primary_template = _.template( $('#about-page-template').html(), this.model.toJSON() );
      $('#content').html( $(this.el).html( primary_template ) );
      $('#content').find('img').each( function() {
        $(this).on( 'load', function() {
          var f = new window.Fader( $(this) );
          f.init();
        })
      });
    }
  });

  return AboutPageView;
});