//

var Parser = require("./parser.js").Parser,
	inherits = require("util").inherits;

///
function MapParser(len) {
	MapParser.super_.prototype.constructor.apply(this);
	this.len = len;
}
inherits(MapParser, Parser);

///
MapParser.prototype.exec = function(data, offset) {
	console.log("MapParser: len == %d", this.len);
}

exports.MapParser = MapParser;
