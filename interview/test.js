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
	check(0xefffffffffffffff);

//  This passess 0x10000000000000000 to the check function instead of 0xffffffffffffffff
//	check(0xffffffffffffffff);
});

///
test('int 8', function() {
	check(-33);
	check(-0x80);
});

///
test('int 16', function() {
	check(-0x81);
	check(-0x8000);
});

///
test('int 32', function() {
	check(-0x8001);
	check(-0x80000000);
});

///
test('int 64', function() {
	check(-0x80000001);
	check(-0x8000000000000000);
});

// TODO(cody): may be some tests for float, but looks like msgpack doesn't actually use float

///
test('double', function() {
	check(parseFloat('3.14'));
});

}); // suite('Simple data')

