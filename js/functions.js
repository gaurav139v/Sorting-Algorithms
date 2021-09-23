function sort() {
	if (!STOP){
		console.log('Already Sorted or Sorting is in porgress. Please regenerate!')
		return 0;
	}
	STOP = false;
	var sort_algo = document.getElementById('algo_selection').value;
	console.log('Algorithm : ', sort_algo);
	if (sort_algo == 'Bubble Sort'){
		arrow_position = load_arrow();		
		bubble_sort();
	}
}