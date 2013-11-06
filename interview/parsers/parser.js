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
Parser.prototype.done = function(result, offset) {
	Parser.prototype.pop();
	this.emit("success", result, offset);
}

exports.Parser = Parser;
