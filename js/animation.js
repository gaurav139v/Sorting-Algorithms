// Global variables
var box_width = 80;
var box_height = 50;
var gap = 30; // gap between the two boxes
var x = 0;
var y = 80;
var number_of_box = 10;
var arrow_position = 0;  // to track the position of arrow.
var random_numbers = [];
var pos = calculate_box_position();  // list of x-coordinate of boxes
var STOP = true;

// Properties
const MIN_SLEEP_TIME = 1000;
const MAX_SLEEP_TIME = 1500;
const HIGH_LIGHT_COLOR = '#F0AD4E';
const DEFAULT_BOX_COLOR = 'lightgrey';
const SORTED_BOX_COLOR = '#449D44';
const SPEED = 10;

function reintialize() {
	/*
		To re initialize the value states.
	*/
	x = 0;
	y = 80;
	arrow_position = 0;
	random_numbers = [];
}

function calculate_box_position() {
	/*
		To calculate the position of the boxes 
	*/
	var pos = [];
	for (var i=0; i<number_of_box; i++){
		var x1 = x + i * (box_width + gap);
		pos.push(x1)
	}
	console.log('Position of boxes : '+ pos)
	return pos	
}

function regenerate() {
	/*
		This is the function which called when person click the regenerate button.
		To reset the value to initial values.
	*/
	STOP = true;
	hide_arrow();
	reintialize();
	arrange();
	change_all_box_color(DEFAULT_BOX_COLOR);
	location.reload();
}

function reset_position() {
	/*
		To reset the position of the boxes.
	*/
	for(var i=0; i<number_of_box; i++){
		box_id = 'box'+ (i + 1);	
		box = document.getElementById(box_id);
		box.style.top =  +"px";
		box.style.left = pos[i] +"px";
	}
}

function arrange() {	
	// To arrange the boxes in specific position.
	random_number_generation();		
}

function change_box_color(box_seq, color) {
	/*
		To change the color of the box.
		box_seq: sequence of box starting for 0.
		color: color name.
	*/
	box_id = 'box'+ (box_seq + 1);	
	box = document.getElementById(box_id);
	box.style.background = color;
}

function change_all_box_color(color) {	
	/*
		To change color of all the boxes.
		color: name of color.
	*/
	for(var i=0; i<number_of_box; i++){
		change_box_color(i, color);
	}
}

function fill_values() {
	/*
		To fill the current array value in all the boxes.
	*/
	for(var i=0; i<pos.length; i++){
		var id = 'box'+(i+1);
		box = document.getElementById(id);
		box.style.left = pos[i] + "px";
		box.innerHTML = random_numbers[i];
	}
}

function random_number_generation() {	
	/*
		To generate random numbers and fill the values in boxes.
	*/	
	for(var i=0; i<number_of_box; i++){
		var rand = Math.floor(Math.random() * 100 + 1)
		random_numbers.push(rand)
	}
	
	fill_values();
	console.log('Random number : ', random_numbers);
}

function sleep(ms) {
	// wait function.
	// ms: time to wail in mili-second.
  return new Promise(resolve => setTimeout(resolve, ms));
}

function swap_boxes(pos1, pos2) {	
	/*
	Perform the swap operation.
	Parameter:-
	pos1: position of first box. (starting from 0)
	pos2: position of second box.
	*/
	perform_swap(pos[pos1], pos[pos2]);	
	fill_values(pos, random_numbers);
}

function perform_swap(pos1, pos2) {
	/*
		Perform the swap operation (animation)
		* To perform semi-circular motion of boxes.
		* first box moves forward from downside.
		* second box moves backward from upside.
		Parameter:-
		pos1: position of first box.
		pos2: position of second box.
	*/

	const radius = (pos2 - pos1)/2;  // radius of semi-circle.
	
	// variables to track the motion of the first box.
	var x_forward = pos1;
	var y_forward = 0;

	var box_id1 = 'box'+(pos1/(box_width+gap)+1);
	var box1 = document.getElementById(box_id1);	
	// var box1_value = box1.innerHTML;	
	const forward_motion = setInterval(forward, 20);	

	// variables to track the motion of the second box.
	var x_backward = pos2;
	var y_backward = 0;

	var box_id2 = 'box'+(pos2/(box_width+gap)+1);
	var box2 = document.getElementById(box_id2);
	// var box2_value = box2.innerHTML;
	const backward_motion = setInterval(backward, 20);

	const x_center = pos1 + radius;  // x-coordinate of center.
	const y_center = y_forward;    // y-coordinate of center.
	

	function forward() {
		// move the first box till it reaches the position of second box.
		y_forward = (Math.sqrt((radius * radius) - (x_forward*x_forward) - (x_center*x_center) + (2*x_forward*x_center)) + y_center);		
				
		box1.style.top = y_forward+"px";		
		box1.style.left = x_forward+"px";		
	
		// To stop the motion when it reaches in the position of second box.
		if (x_forward >= pos2){
			clearInterval(forward_motion);
			box1.innerHTML = random_numbers[pos2/(box_width+gap)];			
		}
		x_forward += SPEED;	
	}

	function backward() {	
		// To move the second box till it reaches the position of first box.
		y_backward = (Math.sqrt((radius * radius) - (x_backward*x_backward) - (x_center*x_center) + (2*x_backward*x_center)) + y_center);
		
		box2.style.top = -y_backward+"px";		
		box2.style.left = x_backward+"px";
		
		// To stop the motion when it reaches in the position of first box.
		if (x_backward <= pos1){
			clearInterval(backward_motion);
			box2.innerHTML = random_numbers[pos1/(box_width+gap)];			
		}
		x_backward -= SPEED;
	}
}

function load_arrow(p1) {
	/*
		To load the arrow image at specific position.
		p1: position of the box where image need to loaded. (starting from 0)
	*/
	width = 40;
	height = 40;
	img = document.getElementById('Up_arrow');
	img.src = 'img/up_arrow.png';
	img.style.display = "inline";  // since display set to none.
	arrow_place = pos[p1];
	img.style.top = y + box_height + 10 + "px";
	x_position = arrow_place + (box_width/2) - (width/2); // x-coordinate of image.
	img.style.left = x_position + "px";
	arrow_start_pos = x_position;
	arrow_end_pos = (gap + box_width) * (number_of_box-1) + x_position;
	return x_position;
}

function hide_arrow() {
	// To hide the arrow image.
	img = document.getElementById('Up_arrow');
	img.style.display = 'none';
}

function move_arrow(block) {
	/*
		To move the arrow image.
		block: number of block need to moved (ex: box1 to box3 = 2 block)
	*/
	const arrow_move = setInterval(move_a, 10);
	var end_position = (block * ((2 * (box_width/2)) + gap)) + arrow_position;		

	function move_a(){
		arrow_position += SPEED;

		// To move the arrow in forward direction.			
		img = document.getElementById('Up_arrow');
		img.style.left = arrow_position + "px";

		// To stop motion when arrow reaches to destination position.
		if (arrow_position >= end_position){
			clearInterval(arrow_move);
			
			// To initialize the update arrow_postion variable (used for arrow tracking)
			if (arrow_position >= arrow_end_pos){
				arrow_position = arrow_start_pos;
				arrow_end_pos -= (gap + box_width);				
			}
		}			
	}
	
}

function move_box_up(index, distance) {
	/*
		To move the box upside.
		index: index of the box need to be moved (starting from 0)
		distance: distance by which it need to be moved.
	*/
	var id = 'box'+ (index+1);
	var box = document.getElementById('box'+(index+1));

	// To track the box motion 
	var y = 70;
	// focus_box_pos = pos[index];
	var final_y_pos = 70 + distance;
	
	const moveUp = setInterval(move_up, 10);
	return final_y_pos;

	// perform motion upward
	function move_up() {	
		console.log('Up ', y);	
		box.style.bottom = y + "px";

		// To stop the motion when it destination position.
		if (y >= final_y_pos){
			clearInterval(moveUp);			
		}
		y += SPEED;

	}
}

function move_box_down(index, distance) {
	/*
		To move the box downward.
		index: index of the box that need to be moved.
		distance: distance by which the box need to be moved.
	*/
	var id = 'box'+ (index+1);
	var box = document.getElementById('box'+(index+1));

	// To track the box motion.
	// focus_box_pos = pos[index];
	var y = 70 + distance;
	var final_y_pos = -20;

	const moveDown = setInterval(move_down, 10);
	return final_y_pos;

	// To perform motion.
	function move_down() {	
		console.log('down ', y);	
		box.style.bottom = y + "px";

		// To stop motion when its reaches the destination.
		if (y <= final_y_pos){
			clearInterval(moveDown);			
		}
		y -= SPEED;
	}
}

function shift_box_right(index, block) {
	/*
		To move the box right.
		index: index of the box that need to be moved.
		block: number of block need to be moved (ex- box1 to box3 = 2 block)
	*/
	var id = 'box'+ (index + 1);
	var box = document.getElementById('box'+(index+1));

	// To track the motion.
	var x = pos[index];
	var final_x_pos = x + (block * (box_width + gap));

	const shift_right_motion = setInterval(shift_right, 10);

	// To perform motion.
	function shift_right() {		
		box.style.left = x + "px";
		
		// To stop the motion when it's reaches in the position of the destination box.
		if (x >= final_x_pos){
			clearInterval(shift_right_motion);
		}
		x += SPEED;
		
	}
}

function shift_box_left(index, block) {
	/*
		To move the box left.
		index: index of the box that need to be moved.
		block: number of block need to be moved (ex- box1 to box3 = 2 block)
	*/
	var id = 'box'+ (index + 1);
	var box = document.getElementById('box'+(index+1));

	// To track the motion.
	var x = pos[index];
	var final_x_pos = x - (block * (box_width + gap));

	const shift_left_motion = setInterval(shift_right, 10);

	// To perform motion.
	function shift_right() {		
		box.style.left = x + "px";

		// To stop the motion when it's reaches in the position of the destination box.
		if (x <= final_x_pos){
			clearInterval(shift_left_motion);
		}
		x -= SPEED;		
	}
}

async function test() {

	console.log('Test');
	load_js('animation');
	// move_box_up(2, 10);
}