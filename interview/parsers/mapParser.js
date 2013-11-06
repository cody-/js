//

var Parser = require("./parser.js").Parser,
	inherits = require("util").inherits;

///
function MapParser(len) {
	MapParser.super_.prototype.constructor.apply(this);
	this.len = len;
	this.data = [];
}
inherits(MapParser, Parser);

function toObject(arrayOfPairs) {
	var obj = {};
	arrayOfPairs.forEach(function(a) {
		obj[a[0]] = a[1];
	});
	return obj;
}

///
MapParser.prototype.exec = function(data, offset) {
	if (this.len === this.data.length) {
		this.emit("success", toObject(this.data), offset);
	}
}

exports.MapParser = MapParser;
