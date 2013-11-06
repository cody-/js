//

var assert = require("assert"),
	msgpack = require("msgpack"),
	parser = require("../parser.js"),
	s = new parser.Stream(),
	receivedData;

s.on("data", function(data) {
	receivedData = data;
})

function send(data) {
	s.write(msgpack.pack(data));
	s.end();
	return receivedData;
}

function check(val) {
	assert.strictEqual(val, send(val));
}

suite('Container', function() {

///
setup(function() {
	receivedData = undefined;
	s.end();
});

///
test('FixMap', function() {
	check({});
});

}); // suite('Container')
