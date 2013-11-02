require("./radix_sort");
require("./merge_sort");
require("./quick_sort");
require("./heap_sort");

var arr = [10, 20, 30, 20, 0, -1, 1, 100, 100500, 500, 500100, -1000];
console.log(arr);
//arr.radixSort();
//arr.mergeSort();
//arr.quickSort();
arr.heapSort();
console.log(arr);
