//

var assert = require("assert"),
	msgpack = require("msgpack"),
	parser = require("./parser"),
	s = new parser.Stream(),
	receivedData;

s.on("data", function(data) {
//	console.log("Data received: ", data);
	receivedData = data;
})

s.on("end", function() {
//    console.log("End");
})

function send(data) {
	s.write(msgpack.pack(data));
	s.end();
	return receivedData;
}

///
suite('Simple data', function(){
	setup(function() {
		receivedData = undefined;
	});

	test('positive fixint', function() {
		assert.equal(10, send(10));
		assert.equal(0, send(0));
		assert.equal(127, send(127));
	});
});

