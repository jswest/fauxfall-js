define( function() {

  var Fader = function( img, needsWrapper ) {
    var _this = this;
      
    this.img = img;
    this.needsWrapper = needsWrapper;
    
    this.manipulate = function() {
      if( _this.needsWrapper ) {
        _this.img.wrap( "<div class='fader-wrapper' />" );
        _this.img.before( "<div class='gloss' />" );
      }
    }
    this.gloss = function() {
      _this.img.parent().find( '.gloss' ).css({
        'background-color': 'rgb(255,255,255)',
        'opacity': 0,
        'position': 'absolute',
        'top': 0,
        'left': 0,
        'width': '100%',
        'height': '100%',
        'z-index': 2
      });
    }
    this.setOpacity = function() {
      
      var windowHeight = $(window).height();
      var windowLocation = $(window).scrollTop();
      var windowCenter = windowLocation + (windowHeight / 2);
      var windowQuarter = windowHeight / 4;
      
      var imageHeight = _this.img.height();
      var imageLocation = _this.img.offset().top;
      var imageCenter = imageLocation + (imageHeight / 2);
      
      var to_percent = function() { return ( (imageCenter - windowLocation) / windowHeight) - 0.6; }
          
      if( imageCenter > windowCenter + windowQuarter ) { var opacity = (0.7 * to_percent()) / 0.4; }
      else { var opacity = 0; }
      _this.img.parent().find('.gloss').css( 'opacity', opacity );
    }
    this.bind = function() {
      _this.setOpacity();
      $(window).on( 'scroll', _this.setOpacity );
      $(window).on( 'resize', _this.setOpacity );
    }
    this.init = function() {
      _this.manipulate();
      _this.gloss();
      _this.bind();    
    }
  }

  return Fader;

});