

// prerequisites

//https://github.com/msgpack/msgpack/blob/master/spec.md#overview

var msgpack = require("msgpack")

var o0 = { a: 10, b: 20, c: [1,2,3,4, 0xffffffff] }
var b0 = msgpack.pack(o0)

console.log(b0)

console.log(msgpack.unpack(b0))
console.log("----");


//var b1= new Buffer(len)

// b1.fill(0)

// b[1] = 255

// b[2] = 0xac


// b[2] -> 0xac



//actual task

var parser = require("./parser")
var s = new parser.Stream()


s.on("data",function(obj){
    // console.log("Data received: ", obj[0].toString(16))
    // console.log("Try unpack: ", msgpack.unpack(s.data))
})

s.on("end",function(){
    // console.log("End: ", msgpack.unpack(s.data));
    process.exit()
})


// s.write(b0)
s.write(b0.slice(0,1));
//  s.write(b0.slice(0,5))
//  s.write(b0.slice(5,10))
//  s.write(b0.slice(10))

s.end()
