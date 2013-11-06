// Simple stack implementation

///
function mkStack() {
	var arr = [];
	return {
		top: function() {
			return arr[arr.length - 1];
		},
		push: function(obj) {
			arr.push(obj);
		},
		pop: function() {
			return arr.pop();
		},
		empty: function() {
			return arr.length === 0;
		},
		clear: function() {
			arr = [];
		}
	}
}

exports.mkStack = mkStack;
