/*
-----------------------------------*/
var express =   require( 'express' );
var path    =   require( 'path' );
var http    =   require('http');
var app     =   express();

app.configure( function() {
  app.set( 'port', process.env.PORT || 3000 );
  app.use( express.favicon() );
  app.use( express.cookieParser( 'super-secret' ) );
  app.use( express.session() );
  app.use( express.static( path.join( __dirname, 'public' ) ) );
  app.use( app.router );
});

app.configure( 'development', function(){
  app.use( express.errorHandler() );
});

http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ) );
});