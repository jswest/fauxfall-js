define(function () {

  var Section = Backbone.Model.extend({
    url: function() {
      return 'sections/' + this.id
    }
  });

  return Section;
})