define(function() {

  var SectionLi = Backbone.Model.extend({});

  var SectionList = Backbone.Collection.extend({
    url: 'sections/list',
    model: SectionLi
  });

  var SectionLiView = Backbone.View.extend({
    tagName: 'li',
    className: 'ordinal-menu-li',
    initialize: function() { _.bindAll( this, 'render' ); },
    render: function() {
      var template = _.template( $('#section-li-template').html(), this.model.toJSON() );
      $('ul#primary-menu').append( $(this.el).html( template ) );
    }
  });


  var SectionListView = Backbone.View.extend({
    tagName: 'nav',
    className: 'ordinal-menu',
    id: 'primary-menu',
    initialize: function() { _.bindAll( this, 'render' ); },
    render: function() {
      var _this = this;
      var template = _.template( $('#primary-nav-template').html(), {} );
      $('header#primary-nav-wrapper').html( $(this.el).html( template ) );
      var section_list = new SectionList();
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

  return SectionListView;
});
