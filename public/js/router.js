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
    },
    about: function() {
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