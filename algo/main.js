require("./radix_sort");
require("./merge_sort");
require("./quick_sort");

var arr = [10, 20, 30, 20, 0, -1, 1, 100, 100500, 500, 500100, -1000];
arr.radixSort();
//arr.mergeSort();
//arr.quickSort();
console.log(arr);
