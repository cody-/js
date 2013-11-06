//

var mkStack = require("./stack.js").mkStack,
	Parser = require("./parsers/parser.js").Parser,
	GenericParser = require("./parsers/genericParser.js").GenericParser,
	EventEmitter = require("events").EventEmitter,
	inherits = require("util").inherits;

///
function Stream() {
    this.parserStack = mkStack();
    this.tail = null;
	Parser.prototype.stack = this.parserStack;
}
inherits(Stream, EventEmitter);

///
Stream.prototype.parse = function(data, offset) {
	if (offset >= data.length) {
		return;
	}

	if (!this.parserStack.empty()) {
		this.parserStack.top().go(data, offset);
		return;
	}

	var parser = new GenericParser();
	parser.on("success", (function(result, newOffset) {
		this.emit("data", result);
		this.parse(data, newOffset);
	}).bind(this));
	parser.on("fail", (function(newOffset) {
		this.tail = data.slice(offset, data.length);
	}).bind(this));

	parser.go(data, offset);
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
	this.parserStack.clear();
    this.emit("end");
}

exports.Stream = Stream;
