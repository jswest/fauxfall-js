requirejs.config({
	baseUrl: 'js'
});

require(
  [
    'router',
    'library/locator'
  ],
  function(
    AppRouter,
    Locator
  ) {
  	$(document).ready(function() {
      var l = new Locator();
      l.init();
  		var router = new AppRouter();
  		Backbone.history.start();
  	});
  }
);

