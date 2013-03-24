define( function() {

  var Locator = function() {
    var _this = this;
    
    this.listen = function() {
      var current = $('.article-section').eq( window.current_position );
      if( current.length > 0 ) {
        var top = current.offset().top;
        var bottom = current.offset().top + current.height();
        if( $(window).scrollTop() < top ) {
          if( window.current_position > 0 ) {
            window.current_position--;
            _this.updateMenu();
          }
        } else if( $(window).scrollTop() > bottom ) {
          window.current_position = parseInt( window.current_position ) + 1;
          _this.updateMenu();
        }
      }
    }
    this.updateMenu = function() {
      $('nav#primary-menu').find( 'li' ).removeClass( 'current' );
      $('nav#primary-menu').find( 'li' ).eq( window.current_position ).addClass( 'current' );    
      Backbone.history.navigate( '#section/' + window.current_position, false );
    }
    
    this.bind = function() {
      $(window).on( 'scroll', _this.listen );
    }
    this.init = function() {
      _this.bind();
    }
  }

  return Locator;

});