$(document).ready( function() {
  
  var add_primary_menu = function() {
    if( $('#primary-menu-wrapper').length < 1 ) {
      var primary_nav = new window.SectionListView();
      primary_nav.render();
    }
  }
  
  
  window.AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'pages/about': 'about',
    },
    home: function() {
      window.current_position = 0;
      add_primary_menu();
      var content_header = new window.HeaderView();
      var section = new window.Section( { id: window.current_position } );
      section.fetch({
        success: function() {
          $('#content').html( '' );
          var section_view = new window.SectionView( { model: section } );
          var content_timer = setTimeout( function() {
            content_header.render();
            section_view.render();
          }, 2000 );          
        }
      });
    },
    about: function() {
      window.current_position = 0;
      var about_page = new window.AboutPage();
      about_page.fetch({
        success: function() {
          var about_page_view = new window.AboutPageView( { model: about_page } );
          var about_page_timer = setTimeout( about_page_view.render, 2000 );
        }
      });
    }
  });
  var router = new window.AppRouter();
  Backbone.history.start();
  
});