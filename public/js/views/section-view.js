define( ['views/art-view', 'models/art'], function( ArtView, Art ) {

	var SectionView = Backbone.View.extend({
    tagName: 'section',
    className: 'article-section',
    initialize: function() { _.bindAll( this, 'render', 'add_art_recursively' ); },
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
      this.add_art_recursively( 0 );
    },
    add_art_recursively: function( iteration ) {
      var _this = this;
      if( _this.paragraph_views.length > iteration ) {
        var a = new Art({
          section_id: this.model.get( 'id' ),
          id: iteration / 3,
          sibling: $(_this.paragraph_views[iteration].el)
        });
        a.fetch({
          success: function() {
            var av = new ArtView( { model: a } );
            av.render();
            $(av.el).find( 'img' ).on( 'load', function() {
              var fader = new Fader( $(av.el).find('img'), false );
              fader.init();
            });
            _this.add_art_recursively( iteration + 3 );
          }
        });
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