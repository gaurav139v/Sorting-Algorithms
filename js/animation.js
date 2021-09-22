var box_width = 80;
var box_height = 50;
var gap = 30;
var x = 0;
var y = 80;
var number_of_box = 10;
var pos = calculate_box_position();
arrow_position = 0;
random_numbers = [];

function calculate_box_position() {
	var pos = [];
	for (var i=0; i<number_of_box; i++){
		var x1 = x + i * (box_width + gap);
		pos.push(x1)
	}
	console.log('Position of boxes : '+ pos)
	return pos	
}

function arrange() {
	random_numbers = [];
	// var pos = calculate_box_position()
	arrange_boxes(pos)
}

function fill_values(pos) {
	for(var i=0; i<pos.length; i++){
		var id = 'box'+(i+1);
		box = document.getElementById(id);
		box.style.left = pos[i] + "px";
		box.innerHTML = random_numbers[i];
	}
}

function arrange_boxes(pos) {		
	for(var i=0; i<number_of_box; i++){
		var rand = Math.floor(Math.random() * 100 + 1)
		random_numbers.push(rand)
	}
	console.log('Randdom number : ', random_numbers)
	fill_values(pos, random_numbers);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function swap(pos1, pos2) {				
	perform_swap(pos[pos1], pos[pos2]);	
	fill_values(pos, random_numbers);
}

function perform_swap(pos1, pos2) {
	var x_forward=pos1, y_forward=0;
	var box_id1 = 'box'+(pos1/(box_width+gap)+1);
	var box_id2 = 'box'+(pos2/(box_width+gap)+1);

	box1 = document.getElementById(box_id1);
	box2 = document.getElementById(box_id2);
	box1_value = box1.innerHTML;
	box2_value = box2.innerHTML;

	forward = setInterval(forward, 20);
	var speed = 10;
	var radius = (pos2 - pos1)/2;
	var x_center = pos1 + radius;
	var y_center = y_forward; 

	backward = setInterval(backward, 20);
	var x_backward = pos2, y_backward = 0;
	

	function forward() {		
		y_forward = (Math.sqrt((radius * radius) - (x_forward*x_forward) - (x_center*x_center) + (2*x_forward*x_center)) + y_center);		
				
		box1.style.top = y_forward+"px";		
		box1.style.left = x_forward+"px";		
	
		if (x_forward >= pos2){
			clearInterval(forward);
			box1.innerHTML = random_numbers[pos2/(box_width+gap)];			
		}
		x_forward += 10;
	
	}

	function backward() {	
		y_backward = (Math.sqrt((radius * radius) - (x_backward*x_backward) - (x_center*x_center) + (2*x_backward*x_center)) + y_center);
		
		box2.style.top = -y_backward+"px";		
		box2.style.left = x_backward+"px";
				
		if (x_backward <= pos1){
			clearInterval(backward);
			box2.innerHTML = random_numbers[pos1/(box_width+gap)];			
		}
		x_backward -= 10;
	}
}

function load_arrow() {
	width = 40;
	height = 40;
	img = document.getElementById('Up_arrow');
	img.src = 'img/up_arrow.png';
	img.style.display = "inline";
	first_box = pos[0];
	img.style.top = y + box_height + 10 + "px";
	position = (box_width/2) - (width/2);
	img.style.left = position;
	arrow_start_pos = position;
	arrow_end_pos = (gap + box_width) * (number_of_box-1) + position;
	return position;
}

function hide_arrow() {
	img = document.getElementById('Up_arrow');
	img.style.display = 'none';
}

function move_arrow() {
	// current_position = arrow_position;
	arrow_move = setInterval(move_a, 5);
	end_position = (2 * (box_width/2)) + gap + arrow_position;	
	

	function move_a(){
		arrow_position += 10;		
		img = document.getElementById('Up_arrow');
		img.style.left = arrow_position + "px";
		if (arrow_position >= end_position){
			clearInterval(arrow_move);
			if (arrow_position >=arrow_end_pos){
				arrow_position = arrow_start_pos;
				arrow_end_pos -= (gap + box_width);				
			}
		}
	}
	
}
