
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Event stream:
	through = require( 'through2' ),

	// Event emitter:
	EventEmitter = require( 'events' ).EventEmitter,

	// Module to be tested:
	mock = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-mock-write', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( mock ).to.be.a( 'function' );
	});

	it( 'should write to a writeable stream', function test( done ) {
		var data = new Array( 100 ),
			actual = [],
			writeable;

		for ( var i = 0; i < data.length; i++ ) {
			data[ i ] = Math.random()*100;
		}

		writeable = through({'objectMode':true}, onData, onEnd );

		mock( data, writeable );

		function onData( chunk, enc, clbk ) {
			actual.push( chunk );
			clbk( null, chunk );
		}

		function onEnd() {
			assert.deepEqual( data, actual );
			done();
		}
	});

	it( 'should wait until a writeable stream has drained', function test( done ) {
		var data = [ 1, 2, 3, 4],
			idx = 0,
			stream;

		stream = new EventEmitter();

		stream.write = function( value ) {
			assert.strictEqual( data[idx], value );
			idx += 1;

			// Force next event-loop...
			setTimeout( function() {
				stream.emit( 'drain', null );
			}, 0 );
			return false;
		};
		stream.end = function() {
			assert.ok( true );
			done();
		};

		mock( data, stream );
	});

});