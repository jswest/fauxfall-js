define([
    'views/section-list-view',
    'views/header-view',
    'models/section',
    'views/section-view',
    'models/about-page',
    'views/about-page-view'
  ], function(SectionListView,HeaderView,Section,SectionView,AboutPage,AboutPageView) {

    var add_primary_menu = function() {
      if( $('#primary-nav-wrapper').find('nav').length == 0 ) {
        var primary_nav = new SectionListView();
        primary_nav.render();
        $('h1.smile').remove();
      }
    }

    var AppRouter = Backbone.Router.extend({
      routes: {
        '': 'home',
        'pages/about': 'about',
        'section/:section_id': 'section'
      },
      home: function() {
        window.current_position = 0;
        add_primary_menu();
        var content_header = new HeaderView();
        var section = new Section( { id: window.current_position } );
        section.fetch({
          success: function() {
            var section_view = new SectionView( { model: section } );
            content_header.render();
            section_view.render();
          }
        });
      },
      about: function() {
        window.current_position = 0;
        var about_page = new AboutPage();
        about_page.fetch({
          success: function() {
            var about_page_view = new AboutPageView( { model: about_page } );
            var about_page_timer = setTimeout( about_page_view.render, 2000 );
          }
        });
      },
      section: function( section_id ) {
        window.current_position = section_id;
        if( $('header#content-header').length == 0 ) {
          var content_header = new HeaderView();
          content_header.render();
        }
        add_primary_menu();
        var sections = $('.article-section').length
        var render_section = function( index ) {
          if( index <= section_id ) {
            var section = new Section( { id: index } );
            section.fetch({
              success: function() {
                var section_view = new SectionView( { model: section } );
                section_view.render();
                render_section( index + 1 );
              }
            });
          } else {
            $(window).scrollTop( $('.article-section').eq( window.current_position ).offset().top + 1 );
            window.l.update_menu();
          }
        }
        render_section( sections );
      }
    });

    return AppRouter;
});