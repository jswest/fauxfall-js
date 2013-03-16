requirejs.config({
	baseUrl: 'js'
});

require(['router'], function (AppRouter) {
	$(document).ready(function() {
		var router = new AppRouter();
		Backbone.history.start();
	});
});

