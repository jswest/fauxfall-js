define(
  [
    'views/paragraph-view',
    'models/paragraph',
    'views/art-view',
    'models/art',
    'models/section',
    'collections/section-guts'
  ], 
    function(
      ParagraphView,
      Paragraph,
      ArtView,
      Art,
      Section,
      SectionGuts
    ) {

	var SectionView = Backbone.View.extend({
    tagName: 'section',
    className: 'article-section',
    initialize: function() { _.bindAll( this, 'render', 'on_deck' ); },
    render: function() {
      var _this = this;
      var template = _.template( $('#section-template').html(), {title: this.model.get( 'title' )} );
      $('#content').append( $(this.el).html( template ) );
      $(this.el).find('header.section-header').height( $(window).height() / 2 );      
      section_guts = new SectionGuts( this.model.get( 'body' ) );
      section_guts.each( function( item ) {
        item.set( 'parent', $(_this.el) );
        if( item.get( 'type') == 'paragraph' ) {
          var item_view = new ParagraphView( { model: item } );
        } else {
          var item_view = new ArtView( { model: item } );
        }
        item_view.render();        
      });
      if( $('.article-section').length >  window.current_position - 2 ) {
        $(window).on( 'scroll', this.on_deck );
      } else if( $('.article-section').length == window.current_position - 2 ) {
        $(window).on( 'scroll', this.on_deck );
      }
    },
    on_deck: function() {
      var _this = this;
      if( $(window).scrollTop() > $('body').height() - $(window).height() - 100 ) {
        console.log( 'called' );
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



	return SectionView;
});