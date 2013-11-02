// Bottom-up merge sort, no recursion

///
function merge(arr, lBegin, lEnd, rBegin, rEnd, outArr, outPos) {
	for (var i = lBegin, j = rBegin; i < lEnd || j < rEnd; ++outPos) {
		if (j >= rEnd) {
			outArr[outPos] = arr[i++];
		} else if (i >= lEnd) {
			outArr[outPos] = arr[j++];
		} else if (arr[i] <= arr[j]) {
			outArr[outPos] = arr[i++];
		} else {
			outArr[outPos] = arr[j++];
		}
	}
}

///
Array.prototype.mergeSort = function() {
	var arr = this,
		aux = new Array(this.length),
		width, i;

	var mergePair = function(lBegin, width) {
		var lEnd = lBegin + width,
			rBegin = lEnd;
			rEnd = Math.min(rBegin + width, arr.length);

		if (lEnd <= rEnd) {
			merge(arr, lBegin, lEnd, rBegin, rEnd, aux, lBegin);
		}
	}

	for (width = 1; width < this.length; width *= 2) {
		for (i = 0; i < this.length; i += 2*width) {
			mergePair(i, width);
		}
		
		arr = [aux, aux = arr][0];
	}
}
