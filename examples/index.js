var eventStream = require( 'event-stream' ),
	mock = require( './../lib' );

// Simulate some data:
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*100;
}

// Create a writable stream:
var writable = eventStream.map( function ( d, clbk ){
		clbk( null, d.toString()+'\n' );
	});

// Pipe to standard out:
writable.pipe( process.stdout );

// Start streaming...
mock( data, writable );