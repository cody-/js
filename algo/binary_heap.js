// Binary heap
// Note: max doesn't reduce inner array size

require("./array_ext");

///
function BinaryHeap(arr) {
	var self = this;
	this.arr = arr;
	this.length = arr.length;
	buildHeap();

	///
	function childrenOf(parentIndex) {
		var l = (parentIndex + 1) * 2 - 1,
			r = l + 1,
			children = [];

		if (l < self.length) {
			children.push(l);
			if (r < self.length) {
				children.push(r);
			}
		}
		return children;
	}

	///
	function sink(ind) {
		var children = childrenOf(ind),
			maxChild;

		switch (children.length) {
			case 0:
				return;
			case 1:
				maxChild = children[0];
				break;
			case 2:
				maxChild = arr[children[0]] < arr[children[1]] ? children[1] : children[0];
				break;
		}

		if (arr[ind] < arr[maxChild]) {
			arr.swap(ind, maxChild);
			sink(maxChild);
		}
	}

	///
	function buildHeap() {
		for (var i = arr.length - 1; i >= 0; --i) {
			sink(i);
		}
	}

	///
	this.max = function() {
		this.arr.swap(0, this.length - 1);
		--this.length;
		sink(0);
		return this.arr[this.length];
	}
}

exports.BinaryHeap = BinaryHeap;
