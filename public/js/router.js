$(document).ready( function() {
  
  window.AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'pages/about': 'about',
    },
    home: function() {
    },
    about: function() {
      var about_page = new window.AboutPage();
      about_page.fetch({
        success: function() {
          var about_page_view = new window.AboutPageView( { model: about_page } );
          about_page_view.render();
        }
      });
    }
  });
  var router = new window.AppRouter();
  Backbone.history.start();
  
});