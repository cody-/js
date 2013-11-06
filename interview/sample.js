

// prerequisites

//https://github.com/msgpack/msgpack/blob/master/spec.md#overview

var msgpack = require("msgpack"),
	parser = require("./parser"),
	s = new parser.Stream(),
	receivedData = [];

s.on("data", function(data) {
	console.log("Data received: ", data);
	receivedData.push(data);
})

s.on("end", function() {
    console.log("End");
    //process.exit()
})

///
function simpleTest(testName, data) {
	console.log("Test %s", testName);
	receivedData = [];

	var packedData = msgpack.pack(data);
	console.log("Data:", data);
	console.log("Packed data:", packedData);

	s.write(packedData);
	s.end();

	console.log("Received data:", receivedData);

	console.log("----");
}

simpleTest("Positive number", 11);
//var o0 = { a: 10, b: 20, c: [1,2,3,4, 0xffffffff] }







// s.write(b0)
//s.write(b0.slice(0,1));
//  s.write(b0.slice(0,5))
//  s.write(b0.slice(5,10))
//  s.write(b0.slice(10))

//s.end()
