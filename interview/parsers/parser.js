//

var EventEmitter = require("events").EventEmitter,
	inherits = require("util").inherits;

///
function Parser() {
	this.delegate = null;
}
inherits(Parser, EventEmitter);

///
Parser.prototype.go = function(data, offset) {
	if (this.delegate) {
		delegate.go(data, offset);
		return;
	}

	if (data.length - offset < this.expectedLen) {
		this.emit("fail", offset);
	} else {
		this.exec(data, offset);
	}
}

///
Parser.prototype.delegateWork = function(parser, data, offset) {
	parser.on("success", (function() {
		this.delegate = null;
	}).bind(this));
	this.delegate = parser;
	this.delegate.go(data, offset);
}

exports.Parser = Parser;
