//
var mkStack = require("./stack.js").mkStack,
	CodeParser = require("./parsers/codeParser.js").CodeParser,
	EventEmitter = require("events").EventEmitter,
	inherits = require("util").inherits;

///
function Stream() {
    this.parserStack = mkStack();
    this.tail;
}
inherits(Stream, EventEmitter);

///
Stream.prototype.parse = function(data, offset) {
	if (this.parserStack.empty()) {
		this.parserStack.push(new CodeParser({
			"success": (function(result, newOffset) {
				this.parserStack.pop();
				this.emit("data", result);
				this.parse(data, newOffset);
			}).bind(this),
			"fail": (function(newOffset) {
				this.tail = data.slice(offset, data.length);
			}).bind(this)
		}));
	}

	this.parserStack.top().go(data, offset);
}

/// @data Buffer
Stream.prototype.write = function(data) {
    if (this.tail) {
        var bytesToJoin = this.parserStack.top().expectedLen() - this.tail.length;
		if (bytesToJoin > data.length) {
			this.tail = Buffer.concat(this.tail, data);
			return;
		}

        this.tail = Buffer.concat(this.tail, data.slice(0, bytesToJoin));
		this.parse(this.tail, 0);
		this.parse(data, bytesToJoin);
        this.tail = null;
    } else {
		this.parse(data, 0);
	}
}

///
Stream.prototype.end = function() {
    this.emit("end");
}

exports.Stream = Stream;





