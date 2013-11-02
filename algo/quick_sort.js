// 3-way quick sort with shuffling, no recursion

require("./array_ext");

/// Returns indexes to the middle part (elements equal to partition element)
function partition(arr, begin, end) {
	var lt = begin,	// pointer to partition element, all element to the left will be less then partition element. Moves left -> right
		i = lt + 1,	// pointer to processing element, moves left -> right
		gt = end - 1; // pointer to the first element greater than partition element, moves right -> left

	while (i <= gt) {
		if (arr[i] < arr[lt]) {
			arr.swap(i, lt);
			++i;
			++lt;
		} else if (arr[i] > arr[lt]) {
			arr.swap(i, gt);
			--gt;
		} else { // arr[i] === arr[lt]
			++i;
		}
	}

	return {begin: lt, end: gt + 1};
}

///
Array.prototype.quickSort = function() {
	var self = this,
		partsToSort = [{begin: 0, end: self.length}];

	self.shuffle();

	function split(part) {
		var ends = partition(self, part.begin, part.end);

		var pieces = [];
		if (part.begin < ends.begin) {
			pieces.push({begin: part.begin, end: ends.begin});
		}
		if (ends.end < part.end) {
			pieces.push({begin: ends.end, end: part.end});
		}

		return pieces;
	}

	while (partsToSort.length > 0) {
		partsToSort.forEach(function(part, index) {
			partsToSort.splice(index, 1);
			partsToSort = partsToSort.concat(split(part));
		});
	}
}
