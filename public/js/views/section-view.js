define( ['views/art-view', 'models/art', 'models/section'], function( ArtView, Art, Section ) {

	var SectionView = Backbone.View.extend({
    tagName: 'section',
    className: 'article-section',
    initialize: function() { _.bindAll( this, 'render', 'on_deck' ); },
    render: function() {
      var template = _.template( $('#section-template').html(), {title: this.model.get( 'title' )} );
      $('#content').append( $(this.el).html( template ) );
      $(this.el).find('header.section-header').height( $(window).height() / 2 );
      var paragraphs = this.model.get( 'body' );
      this.paragraph_views = [];
      for( var i = 0; i < paragraphs.length; i++ ) {
        var paragraph_body = paragraphs[i];
        var p = new Paragraph({
          body: paragraph_body,
          parent: $(this.el)
        });
        var pv = new ParagraphView( { model: p } );
        pv.render();
        this.paragraph_views.push( pv );
      }
      if( this.model.get( 'id' ) == parseInt( window.current_position ) ) {
        $(window).on( 'scroll', this.on_deck );
      }
    },
    on_deck: function() {
      var _this = this;
      if( $(window).scrollTop() > $('body').height() - $(window).height() - 100 ) {
        $(window).off( 'scroll', _this.on_deck );
        var section = new Section( { id: parseInt( window.current_position ) + 1 } );
        section.fetch({
          success: function() {
            var section_view = new SectionView( { model: section } );
            section_view.render();
          }
        });
      }
    }
  });

	var Paragraph = Backbone.Model.extend();

	var ParagraphView = Backbone.View.extend({
	  tagName: 'p',
	  initialize: function() { _.bindAll( this, 'render' ); },
	  render: function() { this.model.get( 'parent' ).find('.section-content').append( $(this.el).html( this.model.get( 'body' ) ) ); }
	});

	return SectionView;
});