define(function() {

  var HeaderView = Backbone.View.extend({
    tagName: 'header',
    id: 'content-header',
    initialize: function() { _.bindAll( this, 'render', 'parallax' ); },
    render: function() {
      var template = _.template( $('#content-header-template').html(), {} );
      $('#content-header-wrapper').html( $(this.el).html( template ) );
      $(this.el).height( $(window).height() - 50 );
      $(this.el).fadeIn( 1000 );
    },
    parallax: function() {

    },
    colorizer: function() {
      if( $(window).scrollTop() > $(window).height() ) {

      }
    },
    bind_colorizer: function() {
      $(window).on( 'scroll', this.colorizer );
    }
  });

  return HeaderView;
});