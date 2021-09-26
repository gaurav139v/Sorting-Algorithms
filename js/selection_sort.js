
async function selection_sort(){

	for(var i=0; i<number_of_box-1; i++){
		var min_val_index = i;

		for(var j=i+1; j<number_of_box; j++){
			change_box_color(j, HIGH_LIGHT_COLOR);
			await sleep(500);
			if (random_numbers[j] < random_numbers[min_val_index]){
				change_box_color(min_val_index, DEFAULT_BOX_COLOR);
				min_val_index = j;
			}
			change_box_color(min_val_index, SELECTED_COLOR);
			change_box_color(j, DEFAULT_BOX_COLOR);
		}

		swap_values(i, min_val_index);
		swap_boxes_sq(i, min_val_index);
		await sleep(MAX_SLEEP_TIME);
		change_box_color(min_val_index, DEFAULT_BOX_COLOR);		
		move_arrow(1);
		await sleep(MIN_SLEEP_TIME);
		fill_values();
		change_box_color(i, SORTED_BOX_COLOR);
	}
	
	change_box_color(number_of_box-1, SORTED_BOX_COLOR);
	console.log(random_numbers)
	hide_arrow();
}