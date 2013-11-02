// Implementation of radix sort for array with numbers
// For inner sort key-indexed counting is used

require("./array_ext");

Array.prototype.radixSort = function() {
	var grpWidthBits = 4;
	var grpWidth = 1 << grpWidthBits;
	var groups = 8 * 8 / grpWidthBits;
	var mask = grpWidth - 1;
	var i, j, grp, negative;

	function CutToGrp(val, grp) {
		return (val >> grpWidthBits * grp) & mask;
	}

	// Sort array for each group using key-indexed counting
	var count = new Array(grpWidth + 1);
	var arr = this;
	var aux = new Array(arr.length);
	for (grp = 0; grp < groups; ++grp)
	{
		count.assign(0);
		arr.forEach(function(a) {
			++count[CutToGrp(a, grp) + 1];
		});

		for (i = 0; i < grpWidth; ++i) {
			count[i + 1] += count[i];
		}

		arr.forEach(function(a) {
			aux[count[CutToGrp(a, grp)]++] = a;
		});

		arr = [aux, aux = arr][0];
	}

	// All negative numbers will be at the end of the array (negative number's most significant bit is set to 1)
	// so we need to move them to the front
	if (arr[arr.length - 1] < 0) {
		arr = [aux, aux = arr][0];
		negative = arr.findIf(function(a) { return a < 0; });
		for (i = 0, j = negative; j < arr.length; ++i, ++j) {
			this[i] = arr[j];
		}
		for (j = 0; j < negative; ++i, ++j) {
			this[i] = arr[j];
		}
	}
}
