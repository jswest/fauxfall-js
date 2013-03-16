define(function() {
  var Art = Backbone.Model.extend({
    url: function() {
      return 'art/' + this.get( 'section_id' ) + "/" + this.id;
    }
  });
  
  return Art;
});
