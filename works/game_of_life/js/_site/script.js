//grid width and height
var bw = 400;
var bh = 400;
//size of canvas

var column = 40;
var row = 40;

var widthOfCell = bw / column;
var heightOfCell = bh / row;

var arraySize = column * row;

// var canvas = $('<canvas/>').attr({width: bw, height: bh}).appendTo('body');

var canvas = $('#canvas');

canvas.attr({width: bw, height: bh});

var context = canvas.get(0).getContext("2d");

var array = [];
var auxArray = [];


function InitGrid(){
	clearInterval(auto);

	widthOfCell = bw / column;
	heightOfCell = bh / row;

	arraySize = column * row;

	for(var i = 0; i < arraySize; i++){
		array[i] = Math.floor(Math.random() * 2);
	}

	for(var i = 0; i < arraySize; i++){
		auxArray[i] = 0;
	}

	drawGrid();
}

(function() {
	// body...
	InitGrid();
	$('button#update').click(update);
	$('button#play').click(Play);
	$('button#restart').click(InitGrid);
	$('form').submit(function(e){
	    clearInterval(auto);
	    e.preventDefault();
	    column = $('input[name=col]').val() || 40;
	    row = $('input[name=row]').val() || 40;
	    InitGrid();
	});
})();

/*
function Play(){
	setInterval(update, 1000);
}
*/
var auto;

function Play(){
	auto = setInterval(update, 100);
}


function update(){
    var count;
    function isAlive(pos){
	return array[pos] 
	for(var i = 0; i < arraySize; i++){
		var left_top = (array[i-row-1] === undefined) ? 0 : array[i-row-1];
		var top = (array[i-row] === undefined) ? 0 : array[i-row];
		var right_top = (array[i-row+1] === undefined) ? 0 : array[i-row+1];
		var left = (array[i-1] === undefined) ? 0 : array[i-1];
		var right = (array[i+1] === undefined) ? 0 : array[i+1];
		var left_bottom = (array[i+row-1] === undefined) ? 0 : array[i+row-1];
		var bottom = (array[i+row] === undefined) ? 0 : array[i+10];
		var right_bottom = (array[i+row+1] === undefined) ? 0 : array[i+row+1];

		var sum = left_top + top + left_bottom + left + right + bottom + right_bottom + right_top;

		auxArray[i] = sum;
	}

	for(var i = 0; i < arraySize; i++){
		if(auxArray[i] == 3){
			array[i] = 1;
		}
		else if(auxArray == 2){
			//
		}
		else{
			array[i] = 0;
		}
	}

	drawGrid();
}

function drawGrid(){
	for(var i = 0; i < row; i++){
		for(var j = 0;j < column; j++){
			if(array[row*i + j]){
				context.fillStyle = 'green';
				// console.log(i, j, array[row*i+j]);
				context.fillRect(widthOfCell*j, heightOfCell*i, widthOfCell, heightOfCell);	
			}
			else{
				context.fillStyle = 'white';
				context.fillRect(widthOfCell*j, heightOfCell*i, widthOfCell, heightOfCell);
			}
		}
	}
}

