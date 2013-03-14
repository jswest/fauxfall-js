/*
-----------------------------------*/
var express =   require( 'express' );
var path    =   require( 'path' );
var http    =   require( 'http' );
var data    =   require( './data/data');
var app     =   express();

app.configure( function() {
  app.set( 'port', process.env.PORT || 5000 );
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
  console.log( "/pages/about" );
  res.writeHead( 200, { 'Content-Type': 'application/json' } );
  res.write( JSON.stringify( data.pages.about ) );
  res.end();
  console.log( "SERVED!" );
});


http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ) );
});