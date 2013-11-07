///
var Parser = require("./parser.js").Parser,
	inherits = require("util").inherits;

///
function StringParser(len) {
	StringParser.super_.prototype.constructor.apply(this);
	this.expectedLen = len;
}
inherits(StringParser, Parser);

///
StringParser.prototype.exec = function(data, offset) {
	var strEnd = offset + this.expectedLen;
	this.emit("success", data.toString("utf8", offset, strEnd), strEnd);
}

exports.StringParser = StringParser;
