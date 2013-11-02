// Realization of Knuth-Morris-Pratt algorythm for substring searching
// ? hasOwnProperty check can have bad influence on performance

require("./array_ext");

///
function mkDfa(pattern) {
	var dfa = {},
		i, j, X, arr;

	for (i = 0; i < pattern.length; ++i) {
		arr = new Array(pattern.length);
		arr.assign(0);
		dfa[pattern[i]] = arr;
	}

	dfa[pattern[0]][0] = 1;
	for (i = 1, X = 0; i < pattern.length; ++i) {
		for (j = 0; j < pattern.length; ++j) {
			dfa[pattern[j]][i] = dfa[pattern[j]][X];
		}
		dfa[pattern[i]][i] = i + 1;
		X = dfa[pattern[i]][X];
	}

	return function(char, state) {
		return dfa.hasOwnProperty(char) ? dfa[char][state] : 0;
	}
}

///
String.prototype.kmpSearch = function(pattern) {
	var dfa = mkDfa(pattern);
	for (var i = 0, j = 0; i < this.length && j < pattern.length; ++i) {
		j = dfa(this[i], j);
	}

	return j == pattern.length ? i - j : -1;
}
