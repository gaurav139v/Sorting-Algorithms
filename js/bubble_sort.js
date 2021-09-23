HIGH_LIGHT_COLOR = '#F0AD4E';
DEFAULT_BOX_COLOR = 'lightgrey';
SORTED_BOX_COLOR = '#449D44';

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
				swap(j, j+1);
				move_arrow(j);
				await sleep(2000);	

			}else{
				change_box_color(j, DEFAULT_BOX_COLOR);
				change_box_color(j+1, HIGH_LIGHT_COLOR);
	
				move_arrow(j);
				await sleep(2000);
			}
			change_box_color(j, DEFAULT_BOX_COLOR);
						
		}
		console.log('green color box : ' + j);
		change_box_color(j, SORTED_BOX_COLOR);
		swap(j, j);
	}
	hide_arrow()
}

