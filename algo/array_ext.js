// Some usefull extensions for array

/// Assign value to all values of the array
Array.prototype.assign = function(val) {
	for (var i = 0, len = this.length; i < len; ++i) {
		this[i] = val;
	}
}

/// Find value by predicate, return found position or -1 if not found
Array.prototype.findIf = function(predicate) {
	for (var i = 0, len = this.length; i < len; ++i) {
		if (predicate(this[i])) {
			return i;
		}
	}
	return -1;
}
