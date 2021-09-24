
async function insertion_sort() {
	temp = [0, 1, 2, 3, 4, 5,6, 7, 8 ,9];
	var i;
	for(i=1; i<random_numbers.length; i++){
		if (STOP){	
			// break;		
			return 0;
		}
		var key_value = random_numbers[i];
		var j = i - 1;
		var key_box_pos = move_box_up(i, 10);
		move_arrow(1)
		change_box_color(i, HIGH_LIGHT_COLOR);
		await sleep(MIN_SLEEP_TIME);

		while(j >= 0 && random_numbers[j] > key_value){
			if (STOP){	
				move_box_down(i, 10);	
				return 0;
			}
			random_numbers[j+1]  = random_numbers[j];
			change_box_color(j, HIGH_LIGHT_COLOR);
			shift_box_right(j, 1);
			await sleep(MIN_SLEEP_TIME);
			change_box_color(j, DEFAULT_BOX_COLOR);
			j--;
						
		}
		random_numbers[j+1] = key_value;
		shift_box_left(i, i-j-1);
		await sleep((i-j-1)*120);
		move_box_down(i, 10);
		await sleep(MAX_SLEEP_TIME);
		change_box_color(i, DEFAULT_BOX_COLOR);
		fill_values();
		

	}
	
	change_all_box_color(SORTED_BOX_COLOR);
	hide_arrow();
	console.log(random_numbers);
}