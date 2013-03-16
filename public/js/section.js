window.Section = Backbone.Model.extend({
  url: function() {
    return 'sections/' + this.id 
  } 
});
window.SectionView = Backbone.View.extend({
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
      var p = new window.Paragraph({
        body: paragraph_body,
        parent: $(this.el)
      });
      var pv = new window.ParagraphView( { model: p } );
      pv.render();
      this.paragraph_views.push( pv );
    }
    this.add_art_recursively( 0 );
  },
  add_art_recursively: function( iteration ) {
    var _this = this;
    if( _this.paragraph_views.length > iteration ) {
      var a = new window.Art({
        section_id: this.model.get( 'id' ),
        id: iteration / 3,
        sibling: $(_this.paragraph_views[iteration].el)
      });
      a.fetch({
        success: function() {
          var av = new window.ArtView( { model: a } );
          av.render();
          $(av.el).find( 'img' ).on( 'load', function() {
            var fader = new window.Fader( $(av.el).find('img'), false );
            fader.init();
          });
          _this.add_art_recursively( iteration + 3 );
        }
      });
    }
  }
});
window.Paragraph = Backbone.Model.extend();
window.ParagraphView = Backbone.View.extend({
  tagName: 'p',
  initialize: function() { _.bindAll( this, 'render' ); },
  render: function() { this.model.get( 'parent' ).find('.section-content').append( $(this.el).html( this.model.get( 'body' ) ) ); }
});

window.Art = Backbone.Model.extend({
  url: function() {
    return 'art/' + this.get( 'section_id' ) + "/" + this.id;
  }
});
window.ArtView = Backbone.View.extend({
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
})


window.SectionLi = Backbone.Model.extend({});
window.SectionList = Backbone.Collection.extend({
  url: 'sections/list',
  model: window.SectionLi
});
window.SectionLiView = Backbone.View.extend({
  tagName: 'li',
  className: 'ordinal-menu-li',
  initialize: function() { _.bindAll( this, 'render' ); },
  render: function() {
    var template = _.template( $('#section-li-template').html(), this.model.toJSON() );
    $('ul#primary-menu').append( $(this.el).html( template ) );
  }
});
window.SectionListView = Backbone.View.extend({
  tagName: 'nav',
  className: 'ordinal-menu',
  id: 'primary-menu',
  initialize: function() { _.bindAll( this, 'render' ); },
  render: function() {
    var _this = this;
    var template = _.template( $('#primary-nav-template').html(), {} );
    $('header#primary-nav-wrapper').html( $(this.el).html( template ) );
    var section_list = new window.SectionList();
    section_list.fetch({
      success: function() {
        var length = section_list.length
        var index = 0;
        section_list.each( function( section_li ) {
          var section_li_view = new SectionLiView( { model: section_li } );
          section_li_view.render();
          $(_this.el).find('li').width( $(_this.el).find('ul').width() / $(_this.el).find('li').length );
          index++;
          if( index == length ) {
            $(_this.el).find('li').css( 'display', 'block' );
          }
        });
        //console.log( $(this.el).find('li').length );
        //$(this.el).find('li').width( $(this.el).width() / $(this.el).find('li').length );
      }
    });
  }
});