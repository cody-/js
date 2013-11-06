//

var EventEmitter = require("events").EventEmitter,
	inherits = require("util").inherits;

///
function Parser() {
	Parser.prototype.stack.push(this);
}
inherits(Parser, EventEmitter);

///
Parser.prototype.stack = [];

///
Parser.prototype.go = function(data, offset) {
	if (data.length - offset < this.expectedLen) {
		this.emit("fail", offset);
	} else {
		this.exec(data, offset);
	}
}

///
Parser.prototype.emit = function(event) {
	if (event === "success") {
		Parser.prototype.stack.pop();
	}
	Parser.super_.prototype.emit.apply(this, arguments);
}

exports.Parser = Parser;
