var Parser = require("./parser.js").Parser,
	NumberParser = require("./numberParser.js").NumberParser,
	StringParser = require("./stringParser.js").StringParser,
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
        case 0xc0: val = null; break;
        case 0xc2: val = false; break;
        case 0xc3: val = true; break;
        case 0xc1:
        case 0xc4: case 0xc5: case 0xc6: case 0xc7: case 0xc8: case 0xc9:
        case 0xd4: case 0xd5: case 0xd6: case 0xd7: case 0xd8:
            type = "reserved";
            break;
        case 0xca: parser = new NumberParser("FloatBE", 4); break;
        case 0xcb: parser = new NumberParser("DoubleBE", 8); break;
        case 0xcc: parser = new NumberParser("UInt8", 1); break;
        case 0xcd: parser = new NumberParser("UInt16BE", 2); break;
        case 0xce: parser = new NumberParser("UInt32BE", 4); break;
        case 0xcf: parser = new NumberParser("UInt64BE", 8); break;

        case 0xd0: parser = new NumberParser("Int8", 1); break;
        case 0xd1: parser = new NumberParser("Int16BE", 2); break;
        case 0xd2: parser = new NumberParser("Int32BE", 4); break;
        case 0xd3: parser = new NumberParser("Int64BE", 8); break;

		case 0xd9: type = "str 8"; break;
        case 0xda: type = "str 16"; break;
        case 0xdb: type = "str 32"; break;
        
        case 0xdc: type = "array 16"; break;
        case 0xdd: type = "array 32"; break;

        case 0xde: type = "map 16"; break;
        case 0xdd: type = "map 32"; break;
        default:
            if (0x00 <= code && code <= 0x7f) { // positive fixint
				val = code & 0x7f;
            } else if (0x80 <= code && code <= 0x8f) { // FixMap (up to 15 elements)
				parser = new MapParser(code & 0xf);
            } else if (0x90 <= code && code <= 0x9f) {
                type = "FixArray";
            } else if (0xa0 <= code && code <= 0xbf) {
                type = "fixstr";
				parser = new StringParser(code & 0x1f);
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
	this.delegateWork(parser, data, offset + 1);
}

exports.GenericParser = GenericParser;
