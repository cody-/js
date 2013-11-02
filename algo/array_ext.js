Array.prototype.assign = function(val) {
	for (var i = 0, len = this.length; i < len; ++i) {
		this[i] = val;
	}
}

Array.prototype.findIf = function(predicate) {
	for (var i = 0, len = this.length; i < len; ++i) {
		if (predicate(this[i])) {
			return i;
		}
	}
	return -1;
}
