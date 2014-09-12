
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Event stream:
	through = require( 'through2' ),

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

});