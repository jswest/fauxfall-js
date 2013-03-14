window.Smile = function() {
  var _this = this;
  
  this.smiler = $('h1.smile');
  this.degree = 0;
  
  this.smile = function() {
    _this.degree = _this.degree + 360;
    _this.smiler.css({
      '-webkit-transform': 'rotate(' + _this.degree + 'deg)',
      '-moz-transform': 'rotate(' + _this.degree + 'deg)',
      '-ms-transform': 'rotate(' + _this.degree + 'deg)',
      '-o-transform': 'rotate(' + _this.degree + 'deg)',
      'transform': 'rotate(' + _this.degree + 'deg)'
    });
    _this.timer = setTimeout( _this.smile, 5000 );
  }
  
  this.smile();
}

window.Fader = function( img ) {
  var _this = this;
  
  this.img = img;
  
  this.manipulate = function() {
    that.img.wrap( "<div class='fader-wrapper />" );
    that.img.before( "<div class='gloss' />" );
    that.img.parent().css({
      'position': 'relative'
      'width': that.img.width(),
      'height': that.img.height()
    });
  }
  this.gloss = function() {
    that.img.parent().find( '.gloss' ).css({
      'background-color': 'rgb(0,0,0)',
      'opacity': 1,
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%',
    });
  }
  this.set_opacity = function() {
    var window_height = $(window).height();
    var window_location = $(window).scrollTop();
    var window_center = scrollTop + (wh / 2);
    var image_location = that.img.scrollTop();  
  }
  this.bind = function() {
    var gloss = that.img.parent().find( '.gloss' );
  }
}


$(document).ready( function() {
  
  var smiler = new window.Smile();
  
});