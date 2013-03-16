window.HeaderView = Backbone.View.extend({
  tagName: 'header',
  id: 'content-header',
  initialize: function() { _.bindAll( this, 'render' ); },
  render: function() {
    var template = _.template( $('#content-header-template').html(), {} );
    $('#content-header-wrapper').html( $(this.el).html( template ) );
    $(this.el).height( $(window).height() + $(window).height() / 2 );
    $(this.el).fadeIn( 1000 );
  },
  colorizer: function() {
    if( $(window).scrollTop() > $(window).height() ) {
      
    }
  },
  bind_colorizer: function() {
    $(window).on( 'scroll', this.colorizer );
  }
}); 