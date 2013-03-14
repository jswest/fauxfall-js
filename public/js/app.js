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

$(document).ready( function() {
  
  var smiler = new window.Smile();
  
});