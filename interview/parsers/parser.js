//

var EventEmitter = require("events").EventEmitter,
	inherits = require("util").inherits;

///
function Parser(settings) {
	this.settings = settings || {addToStack: true};
	if (this.settings.addToStack) {
		Parser.prototype.stack.push(this);
	}
}
inherits(Parser, EventEmitter);

///
Parser.prototype.stack = [];

///
Parser.prototype.done = function(result, offset) {
	if (this.settings.addToStack) {
		Parser.prototype.pop();
	}
	this.emit("success", result, offset);
}

exports.Parser = Parser;
