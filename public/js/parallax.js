define(function() {

  var AbstractParallax = {
    // Translates the element according to the speed
    updateParallax: function( position ) {
      debugger;
      if ( this.needsUpdate( position ) ) {
        var el = $( this.$el.find(this.parallaxEl) || this.el );
        var transformation = this.getTransformation( position );
        this.transform( el, transformation );
      }
    },

    needsUpdate: function( position ) {
      var offset = _.result(this, 'offset');
      return position < offset + this.range
        && position > offset;
    },

    transform: function( el, transformation ) {
      el.css('-webkit-transform', transformation);
      el.css('-moz-transform', transformation);
      el.css('transform', transformation);
    },

    getTransformation: function( position ) {
      var relativePosition = position - _.result(this.offset);
      var css = 'translate3d(' + this.horizontalSpeed( relativePosition ) + 'px, '
        + this.verticalSpeed( relativePosition )
        + 'px, 0 )';
      return css;
    },

    // Scroll offset at which to trigger the parallax, to be overidden
    offset: 0,

    // The scroll range past the offset through which the elt will be moving
    range: 500,

    verticalSpeed: function() {
      return 0;
    },

    horizontalSpeed: function() {
      return 0;
    },
  };

  var SimpleParallax = _.extend( AbstractParallax, {
    verticalSpeed: function( position ) {
      return -position * .25;
    }
  });

  return {
    simple: SimpleParallax,
    abstract: AbstractParallax
  };

});