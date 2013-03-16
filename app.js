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
  console.log( "/pages/about..." );
  res.writeHead( 200, { 'Content-Type': 'application/json' } );
  res.write( JSON.stringify( data.pages.about ) );
  res.end();
  console.log( "...is served.\n" );
});
app.get( '/sections/list', function( req, res ) {
  console.log( "/sections/list..." );
  res.writeHead( 200, { 'Content-Type': 'application/json' } );
  res.write( JSON.stringify( data.article ) );
  res.end();
  console.log( "...is served.\n" );
});
app.get( '/sections/:id', function( req, res) {
  var id = req.params.id;
  console.log( "/sections/" + id + "...");
  res.writeHead( 200, { 'Content-Type': 'application/json' } );
  res.write( JSON.stringify( data.article[id] ) );
  res.end();
  console.log( "...is served.\n" );
});
app.get( '/art/:section_id/:id', function( req, res ) {
  var id = parseInt( req.params.id );
  var section_id = parseInt( req.params.section_id );
  console.log( "/art/" + section_id + "/" + id + "..." );
  res.writeHead( 200, { 'Content-Type': 'application/json' } );
  var number_of_paragraphs = 0;
  var actual_art_limit = data.art.length;
  for( var i = 0; i <= section_id; i++ ) {
    if( id + number_of_paragraphs < actual_art_limit && i == section_id ) {
      console.log( 'here' );
      res.write( JSON.stringify( data.art[ id + number_of_paragraphs] ) );
    }
    number_of_paragraphs = number_of_paragraphs + data.article[i].body.length;
  }
  res.end();
  console.log( "...is served.\n" );
});


http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ) );
});