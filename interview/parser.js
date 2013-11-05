//
var mkStack = require("./stack.js").mkStack;

///
function Stream() {
    this.events = {};
    this.stack = mkStack();
    
    this.tail;
}

///
Stream.prototype.on = function(eventName, callback) {
    this.events[eventName] = callback;    
}

///
function mapParser(len) {
    this.len = len;
    console.log("Len: ", len);
}

///
function parseCode(data, offset) {
    var code = data[offset];
    console.log(code.toString(2));
    var type;
    switch(code){
        case 0xc0: type = "nil"; break;
        case 0xc2: type = "false"; break;
        case 0xc3: type = "true"; break;
        case 0xc1:
        case 0xc4: case 0xc5: case 0xc6: case 0xc7: case 0xc8: case 0xc9:
        case 0xd4: case 0xd5: case 0xd6: case 0xd7: case 0xd8: case 0xd9:
            type = "reserved";
            break;
        case 0xca: type = "float"; break;
        case 0xcb: type = "double"; break;
        case 0xcc: type = "uint 8"; break;
        case 0xcd: type = "uint 16"; break;
        case 0xce: type = "uint 32"; break;
        case 0xcf: type = "uint 64"; break;

        case 0xd0: type = "int 8"; break;
        case 0xd1: type = "int 16"; break;
        case 0xd2: type = "int 32"; break;
        case 0xd3: type = "int 64"; break;

        case 0xda: type = "raw 16"; break;
        case 0xdb: type = "raw 32"; break;
        
        case 0xdc: type = "array 16"; break;
        case 0xdd: type = "array 32"; break;

        case 0xde: type = "map 16"; break;
        case 0xdd: type = "map 32"; break;
        default:
            if (0x00 <= code && code <= 0x7f) {
                type = "Positive FixNum";
            } else if (0x80 <= code && code <= 0x8f) {
                type = "FixMap";
            } else if (0x90 <= code && code <= 0x9f) {
                type = "FixArray";
            } else if (0xa0 <= code && code <= 0xbf) {
                type = "FixRaw";
            } else if (0xe0 <= code && code <= 0xff) {
                type = "Negative FixNum";
            }
            break;	
    }
    
    console.log("Type: ", type)
}

Stream.prototype.emit = function(event, data){
    this.events[event](data)
}

/// @data Buffer
Stream.prototype.write = function(data) {
    var dataPos = 0;
    if (this.tail) {
        var bytesToJoin = this.stack.top().expectedLen() - this.tail.length;
        var buf = Buffer.concat(this.tail, data.slice(0, bytesToJoin));
        this.stack.top().go(buff, 0);
        dataPos = bytesToJoin;
        this.tail = null;
    }
    
    while(dataPos < data.length) {
        if (this.stack.empty()) {
            this.stack.push(parseCode);
        }
        dataPos = this.stack.top().go(data, dataPos);
        if (p.result !== undefined) {
          var p = this.stack.pop();
          this.emit("data",p.result);
        } else {
            this.tail = data.slice(dataPos, data.length);
            break;
        }
    }
    this.events["data"](data);
}

///
Stream.prototype.end = function() {
    this.events["end"]();
}

exports.Stream = Stream;





