function sort() {
	var sort_algo = document.getElementById('algo_selection').value;
	console.log('Algorithm : ', sort_algo);
	if (sort_algo == 'Bubble Sort'){
		bubble_sort();
	}
}