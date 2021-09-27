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

	}else if (sort_algo == 'Selection Sort'){
		arrow_position = load_arrow(0);	
		selection_sort();

	}else if (sort_algo == 'Quick Sort'){
		arrow_position = load_arrow(0);	
		quick_sort();
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

function load_js(src){
	// var src = 'js/animation.js';
	// var file = document.getElementById(file_name);
	// console.log(file);
	// file.remove();
 //  	var head= document.getElementsByTagName('head')[0];
	// var script= document.createElement('script');
	// script.src= 'js/animation.js';
	// script.id = file_name;
	// script.type = 'text/javascript';
	// console.log(file_name);

	// head.appendChild(script);
	$('script[src="' + src + '"]').remove();
	$('<script>').attr('src', src).appendTo('head');
}
