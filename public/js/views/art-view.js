define(function() {
  
  var ArtView = Backbone.View.extend({
    className: 'art-wrapper',
    initialize: function() { _.bindAll( this, 'render' ); },
    render: function() {
      console.log( this.model.toJSON() );
      var template = _.template( $('#art-template').html(), this.model.toJSON() );
      this.model.get( 'sibling' ).after( $(this.el).html( template ) );
      $(this.el).on( 'load', function() {
        var fader = new window.Fader( $(this.el), false );
        fader.init();  
      });
    }
  });

  return ArtView;
});