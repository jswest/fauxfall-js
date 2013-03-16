/*
-----------------------------------*/
var express =   require( 'express' );
var path    =   require( 'path' );
var http    =   require( 'http' );
var data    =   require( './data/data');
var app     =   express();

app.configure( function() {
  app.set( 'port', process.env.PORT || 5000 );
  app.use( express.logger() );
  app.use( express.favicon() );
  app.use( express.cookieParser( 'super-secret' ) );
  app.use( express.session() );
  app.use( express.static( path.join( __dirname, 'public' ) ) );
  app.use( app.router );
});

app.configure( 'development', function(){
  app.use( express.errorHandler() );
});

app.get( '/pages/about', function( req, res ) {
  res.send( data.pages.about );
});
app.get( '/sections/list', function( req, res ) {
  res.send( data.article );
});
app.get( '/sections/:id', function( req, res) {
  var id = req.params.id;
  res.send( data.article[id] );
});


http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ) );
});