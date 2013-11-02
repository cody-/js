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

function rand(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

///
Array.prototype.swap = function(i, j) {
	var tmp = this[i];
	this[i] = this[j];
	this[j] = tmp;
}

/// Knuth shuffling
Array.prototype.shuffle = function() {
	for (var i = 1; i < this.length; ++i) {
		this.swap(i, rand(0, i));
	}
}
