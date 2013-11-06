var Parser = require("./parser.js").Parser,
	NumberParser = require("./numberParser.js").NumberParser,
	MapParser = require("./mapParser.js").MapParser,
	inherits = require("util").inherits;

///
function GenericParser() {
	GenericParser.super_.prototype.constructor.apply(this);
}
inherits(GenericParser, Parser);

///
GenericParser.prototype.expectedLen = 1;

///
GenericParser.prototype.exec = function(data, offset) {
	var code = data[offset],
		type, val,
		parser;

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
        case 0xcc: parser = new NumberParser("UInt8", 1); break;
        case 0xcd: parser = new NumberParser("UInt16BE", 2); break;
        case 0xce: parser = new NumberParser("UInt32BE", 4); break;
        case 0xcf: parser = new NumberParser("UInt64BE", 8); break;

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
            if (0x00 <= code && code <= 0x7f) { // positive fixint
				val = code & 0x7f;
            } else if (0x80 <= code && code <= 0x8f) {
                type = "FixMap";
				parser = new MapParser(code & 0xf);
            } else if (0x90 <= code && code <= 0x9f) {
                type = "FixArray";
            } else if (0xa0 <= code && code <= 0xbf) {
                type = "FixRaw";
            } else if (0xe0 <= code && code <= 0xff) { // negative fixint
				val = code - 0x100;
            }
            break;	
    }

	// TODO(cody): remove this logging
	if (type !== undefined) {
		console.log("GenericParser: code == %s, type == %s", code.toString(2), type);
	}

	if (val !== undefined) {
		this.emit("success", val, offset + 1);
		return;
	}

	parser.on("success", (function(result, offset) {
		this.emit("success", result, offset);
	}).bind(this));
	parser.on("fail", (function(offset) {
		this.emit("fail", offset);
	}).bind(this));
	parser.go(data, offset + 1);
}

exports.GenericParser = GenericParser;
