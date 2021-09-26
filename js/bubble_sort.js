

async function bubble_sort() {	
	for(var i=0; i< random_numbers.length; i++){
		for(var j=0; j<random_numbers.length - i-1; j++){
			if (STOP){			
				return 0;
			}
			change_box_color(j, HIGH_LIGHT_COLOR);
		
			if (random_numbers[j] > random_numbers[j+1]){
				var temp = random_numbers[j];
				random_numbers[j] = random_numbers[j+1];
				random_numbers[j+1] = temp;
				swap_boxes(j, j+1);
				move_arrow(1);
				await sleep(MIN_SLEEP_TIME);	

			}else{
				change_box_color(j, DEFAULT_BOX_COLOR);
				change_box_color(j+1, HIGH_LIGHT_COLOR);
	
				move_arrow(1);
				await sleep(MIN_SLEEP_TIME);
			}
			change_box_color(j, DEFAULT_BOX_COLOR);
						
		}
		change_box_color(j, SORTED_BOX_COLOR);
		swap_boxes(j, j);
	}
	hide_arrow()
}

