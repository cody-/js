///
var Parser = require("./parser.js").Parser,
	inherits = require("util").inherits;

Buffer.prototype.readUInt64BE = function(offset) {
	var high = this.readUInt32BE(offset),
		low = this.readUInt32BE(offset + 4);

	return high * 0x100000000 + low;
}

///
function NumberParser(type, bytes) {
	NumberParser.super_.prototype.constructor.apply(this);
	this.type = type;
	this.expectedLen = bytes;
}
inherits(NumberParser, Parser);

///
NumberParser.prototype.exec = function(data, offset) {
	var buffMethod = "read" + this.type;
	this.emit("success", data[buffMethod](offset), offset + this.expectedLen);
}

exports.NumberParser = NumberParser;
