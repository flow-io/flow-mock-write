/**
*
*	STREAM: mock-write
*
*
*	DESCRIPTION:
*		- Provides a mock source for writable streams.
*
*
*	NOTES:
*		[1] Based on Dominic Tarr's through module: https://github.com/dominictarr/through
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	/**
	* FUNCTION: readable( array, stream )
	*	Mocks writing to a stream.
	*
	* @param {Array} array - array of values to write
	* @param {stream} stream - stream to write to
	*/
	function readable( array, stream ) {
		var value;
		array = array.slice();
		next();
		return;

		/**
		* FUNCTION: next()
		*	Mocks stream drain.
		*/
		function next() {
			while ( array.length ) {
				value = array.shift();
				if ( stream.write( value ) === false ) {
					return stream.once( 'drain', next );
				}
			}
			stream.end();
		} // end FUNCTION next()
	} // end FUNCTION readable()


	// EXPORTS //

	module.exports = readable;

})();