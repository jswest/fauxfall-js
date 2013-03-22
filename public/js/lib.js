window.Locator = function() {
  var _this = this;
  
  this.listen = function() {
    var current = $('.article-section').eq( window.current_position );
    if( current.length > 0 ) {
      var top = current.offset().top;
      var bottom = current.offset().top + current.height();
      if( $(window).scrollTop() < top ) {
        if( window.current_position > 0 ) {
          window.current_position--;
          _this.update_menu();
          Backbone.history.navigate( '#section/' + window.current_position, false );
        }
      } else if( $(window).scrollTop() > bottom ) {
        window.current_position = parseInt( window.current_position ) + 1;
        _this.update_menu();
        Backbone.history.navigate( '#section/' + window.current_position, false );
      } else {
      }
    }
  }
  this.update_menu = function() {
    $('nav#primary-menu').find( 'li' ).removeClass( 'current' );
    $('nav#primary-menu').find( 'li' ).eq( window.current_position ).addClass( 'current' );    
  }
  
  this.bind = function() {
    $(window).on( 'scroll', _this.listen );
  }
  this.init = function() {
    _this.bind();
  }
}

window.Fader = function( img, needs_wrapper ) {
  var _this = this;
    
  this.img = img;
  this.needs_wrapper = needs_wrapper;
  
  this.manipulate = function() {
    if( _this.needs_wrapper ) {
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
  this.set_opacity = function() {
    
    var window_height = $(window).height();
    var window_location = $(window).scrollTop();
    var window_center = window_location + (window_height / 2);
    var window_quarter = window_height / 4;
    
    var image_height = _this.img.height();
    var image_location = _this.img.offset().top;
    var image_center = image_location + (image_height / 2);
    
    var to_percent = function() { return ( (image_center - window_location) / window_height) - 0.6; }
        
    if( image_center > window_center + window_quarter ) { var opacity = (0.7 * to_percent()) / 0.4; }
    else { var opacity = 0; }
    _this.img.parent().find('.gloss').css( 'opacity', opacity );
  }
  this.bind = function() {
    _this.set_opacity();
    $(window).on( 'scroll', _this.set_opacity );
    $(window).on( 'resize', _this.set_opacity );
  }
  this.init = function() {
    this.manipulate();
    this.gloss();
    this.bind();    
  }
}


$(document).ready( function() {
  window.l = new window.Locator();
  window.l.init();
});