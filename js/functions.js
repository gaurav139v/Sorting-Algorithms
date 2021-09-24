function sort() {
	if (!STOP){
		console.log('Already Sorted or Sorting is in porgress. To start again please regenerate!')
		return 0;
	}
	STOP = false;
	var sort_algo = document.getElementById('algo_selection').value;
	console.log('Algorithm : ', sort_algo);

	if (sort_algo == 'Bubble Sort'){
		arrow_position = load_arrow(0);		
		bubble_sort();

	}else if (sort_algo == 'Insertion Sort'){
		arrow_position = load_arrow(0);	
		insertion_sort();
	}
}


function hide(id) {
	var test = document.getElementById(id);
	test.style.display = "none";
}

function show(id) {
	var test = document.getElementById(id);
	test.style.display = "initial";
}

function swap_values(first, second) {
	var temp = random_numbers[first];
	random_numbers[first] = random_numbers[second];
	random_numbers[second] = temp;
}