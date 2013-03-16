define(function() {

	var SectionView = Backbone.View.extend({
	  tagName: 'section',
	  className: 'article-section',
	  initialize: function() { _.bindAll( this, 'render' ); },
	  render: function() {
	    $('#content').append( $(this.el) );
	    var paragraphs = this.model.get( 'body' );
	    for( var i = 0; i < paragraphs.length; i++ ) {
	      var paragraph_body = paragraphs[i];
	      var p = new Paragraph({
	        body: paragraph_body,
	        parent: $(this.el)
	      });
	      var pv = new ParagraphView( { model: p } );
	      pv.render();
	    }
	  }
	});

	var Paragraph = Backbone.Model.extend();

	var ParagraphView = Backbone.View.extend({
	  tagName: 'p',
	  initialize: function() { _.bindAll( this, 'render' ); },
	  render: function() { this.model.get( 'parent' ).append( $(this.el).html( this.model.get( 'body' ) ) ); }
	});

	return SectionView;
});