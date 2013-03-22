define(function() {
  
  var ArtView = Backbone.View.extend({
    className: 'art-wrapper',
    initialize: function() { _.bindAll( this, 'render' ); },
    render: function() {
      var _this = this;
      var template = _.template( $('#art-template').html(), this.model.toJSON() );
      this.model.get( 'parent' ).find('.section-content').append( $(this.el).html( template ) );
      $(this.el).find('img').on( 'load', function() {
        var fader = new window.Fader( $(_this.el).find('img'), false );
        fader.init();  
      });
    }
  });

  return ArtView;
});