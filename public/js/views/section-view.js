define( ['views/art-view', 'models/art', 'models/section'], function( ArtView, Art, Section ) {

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
        var item_view = new ParagraphView( { model: item } );
        item_view.render();        
      });
      console.log( 'wcp: ' +  window.current_position );
      console.log( 'asl: ' + $('.article-section').length );
      console.log( 'id: ' + this.model.get( 'id' ) );
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

	var Paragraph = Backbone.Model.extend();

  var SectionGuts = Backbone.Collection.extend({
    model: Paragraph
  });

	var ParagraphView = Backbone.View.extend({
	  tagName: 'p',
	  initialize: function() { _.bindAll( this, 'render' ); },
	  render: function() {
	    this.model.get( 'parent' ).find('.section-content').append( $(this.el).html( this.model.get( 'body' ) ) );
	  }
	});

	return SectionView;
});