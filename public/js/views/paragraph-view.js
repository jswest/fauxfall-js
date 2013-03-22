define(function() {

  var ParagraphView = Backbone.View.extend({
    tagName: 'p',
    initialize: function() { _.bindAll( this, 'render' ); },
    render: function() {
      this.model.get( 'parent' ).find('.section-content').append( $(this.el).html( this.model.get( 'body' ) ) );
    }
  });

  return ParagraphView;
});