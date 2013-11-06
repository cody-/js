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

function check(val) {
	assert.strictEqual(val, send(val));
}

///
suite('Simple data', function(){

///
setup(function() {
	receivedData = undefined;
});

///
test('positive fixint', function() {
	check(10);
	check(0);
	check(0x7f);
});

///
test('negative fixint', function() {
	check(-1);
	check(-32);
});

///
test('uint 8', function() {
	check(0x80);
	check(0xff);
});

///
test('uint 16', function() {
	check(0x100);
	check(0xffff);
});

///
test('uint 32', function() {
	check(0x10000);
	check(0xffffffff);
});

///
test('uint 64', function() {
	check(0x100000000);
	check(0xfffffffffffffff);
});

}); // suite('Simple data')

