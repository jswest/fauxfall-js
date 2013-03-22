define(
  [
    'models/paragraph',
    'models/art'
  ], 
    function(
      Paragraph,
      Art
    ) {

  var SectionGuts = Backbone.Collection.extend({
    model: function( attrs, options ) {
      if( attrs.type == 'paragraph' ) {
        return new Paragraph( attrs, options );
      } else if( attrs.type == 'art' ) {
        return new Art( attrs, options );
      }
    }
  });

	return SectionGuts;
});