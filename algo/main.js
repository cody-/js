require("./radix_sort");
require("./merge_sort");
require("./quick_sort");
require("./heap_sort");
require("./kmp_search");

//var arr = [10, 20, 30, 20, 0, -1, 1, 100, 100500, 500, 500100, -1000];
//arr.radixSort();
//arr.mergeSort();
//arr.quickSort();
//arr.heapSort();
//console.log(arr);

var txt = "Knuth-Morris-Pratt",
	pattern = "Pratt";
console.log("indexOf: ", txt.indexOf(pattern));
console.log("kmpSearch: ", txt.kmpSearch(pattern));
