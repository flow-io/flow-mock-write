flow-mock-write
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Provides a mock source for writable streams.


## Installation

``` bash
$ npm install flow-mock-write
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To create a mock for writing to writable streams,

``` javascript
var mock = require( 'flow-mock-write' );
```

The method accepts two input arguments: an array of values to write and a writable stream.

``` javascript
var eventStream = require( 'event-stream' );

// Simulate some data:
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random()*100;
}

// Create a writable stream:
var writable = eventStream.map( function( d, clbk ){
		clbk( null, d.toString()+'\n' );
	});

// Pipe to standard out:
writable.pipe( process.stdout );

// Start streaming...
mock( data, writable );
```


## Examples

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The mock implements the [classic stream](https://github.com/substack/stream-handbook#classic-streams) paradigm in Node; e.g., using `write()` and `end()` methods.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/flow-mock-write.svg
[npm-url]: https://npmjs.org/package/flow-mock-write

[travis-image]: http://img.shields.io/travis/flow-io/flow-mock-write/master.svg
[travis-url]: https://travis-ci.org/flow-io/flow-mock-write

[coveralls-image]: https://img.shields.io/coveralls/flow-io/flow-mock-write/master.svg
[coveralls-url]: https://coveralls.io/r/flow-io/flow-mock-write?branch=master

[dependencies-image]: http://img.shields.io/david/flow-io/flow-mock-write.svg
[dependencies-url]: https://david-dm.org/flow-io/flow-mock-write

[dev-dependencies-image]: http://img.shields.io/david/dev/flow-io/flow-mock-write.svg
[dev-dependencies-url]: https://david-dm.org/dev/flow-io/flow-mock-write

[github-issues-image]: http://img.shields.io/github/issues/flow-io/flow-mock-write.svg
[github-issues-url]: https://github.com/flow-io/flow-mock-write/issues
