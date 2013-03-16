define([
    'views/section-list-view',
    'views/header-view',
    'models/section',
    'views/section-view',
    'models/about-page',
    'views/about-page-view'
  ], function(SectionListView,HeaderView,Section,SectionView,AboutPage,AboutPageView) {

    var add_primary_menu = function() {
      if( $('#primary-menu-wrapper').length < 1 ) {
        var primary_nav = new SectionListView();
        primary_nav.render();
      }
    }


    var AppRouter = Backbone.Router.extend({
      routes: {
        '': 'home',
        'pages/about': 'about',
      },
      home: function() {
        window.current_position = 0;
        add_primary_menu();
        var content_header = new HeaderView();
        var section = new Section( { id: window.current_position } );
        section.fetch({
          success: function() {
            var section_view = new SectionView( { model: section } );
            var content_timer = setTimeout( function() {
              content_header.render();
              section_view.render();
            }, 2000 );
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
      }
    });

    return AppRouter;
});