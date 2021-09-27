function partition( low, high) {
	var pivot = random_numbers[low];
	var i = low+1;
	var j = high;
	while (i <= j){
		if (random_numbers[i] < pivot){
			i++;
		}else{
			swap_values(i, j);
			j--;
		}
	}

	swap_values(low, i-1);
	return i-1;
}

function sort_q( low, high) {
	if (low < high){
		var pi = partition( low, high);
		sort_q( low, pi-1);
		sort_q( pi+1, high);
	}	
}

function quick_sort(low, high) {
	low = 0;
	high = number_of_box -1;
	sort_q(low, high);
	console.log(random_numbers);
}