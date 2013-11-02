// Implementation of radix sort for array with numbers
// For inner sort key-indexed counting is used

require("./array_ext");

Array.prototype.radixSort = function() {
	var grpWidthBits = 4,
		grpWidth = 1 << grpWidthBits,
		groups = 8 * 8 / grpWidthBits,
		mask = grpWidth - 1,
		count = new Array(grpWidth + 1),
		arr = this,
		aux = new Array(arr.length),
		i, j, grp, negative;

	function CutToGrp(val, grp) {
		return (val >> grpWidthBits * grp) & mask;
	}

	// Sort using key-indexed counting
	function sortByGroup(src, dst, grp) {
		count.assign(0);
		src.forEach(function(a) {
			++count[CutToGrp(a, grp) + 1];
		});

		for (i = 0; i < grpWidth; ++i) {
			count[i + 1] += count[i];
		}

		src.forEach(function(a) {
			dst[count[CutToGrp(a, grp)]++] = a;
		});
	}

	// Sort array for each group using key-indexed counting
	for (grp = 0; grp < groups; ++grp) {
		sortByGroup(arr, aux, grp);
		arr = [aux, aux = arr][0];
	}

	// All negative numbers will be at the end of the array (negative number's most significant bit is set to 1)
	// so we need to move them to the front
	if (arr[arr.length - 1] < 0) {
		arr = [aux, aux = arr][0];
		negative = arr.findIf(function(a) { return a < 0; });
		j = this.copyFrom(arr, negative, arr.length, 0);
		this.copyFrom(arr, 0, negative, j);
	}
}
