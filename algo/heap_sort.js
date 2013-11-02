// Heap sort realization.
// Two steps:
//     build heap
//     sort each step getting the max element from heap

BinaryHeap = require("./binary_heap").BinaryHeap;

Array.prototype.heapSort = function() {
	var heap = new BinaryHeap(this);
	for (var i = this.length - 1; i > 0; --i) {
		this[i] = heap.max();
	}
}
