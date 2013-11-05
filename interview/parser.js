//
var mkStack = require("./stack.js").mkStack,
	CodeParser = require("./parsers/codeParser.js").CodeParser;

///
function Stream() {
    this.events = {};
    this.parserStack = mkStack();
    this.tail;
}

///
Stream.prototype.on = function(eventName, callback) {
    this.events[eventName] = callback;    
}

///
Stream.prototype.emit = function(event, data){
    this.events[event](data)
}

/// @data Buffer
Stream.prototype.write = function(data) {
	var processData = (function(data, offset) {
		while(offset < data.length) {
			if (this.parserStack.empty()) {
				this.parserStack.push(new CodeParser());
			}

			var currentParser = this.parserStack.top();
			offset = currentParser.go(data, offset);
			if (currentParser.result !== undefined) {
				this.parserStack.pop();
				this.emit("data", currentParser.result);
			} else {
				this.tail = data.slice(offset, data.length);
				break;
			}
		}
	}).bind(this);

    if (this.tail) {
        var bytesToJoin = this.parserStack.top().expectedLen() - this.tail.length;
		if (bytesToJoin > data.length) {
			this.tail = Buffer.concat(this.tail, data);
			return;
		}

        this.tail = Buffer.concat(this.tail, data.slice(0, bytesToJoin));
		processData(this.tail, 0);
		processData(data, bytesToJoin);
        this.tail = null;
    } else {
		processData(data, 0);
	}
}

///
Stream.prototype.end = function() {
    this.events["end"]();
}

exports.Stream = Stream;





