//grid width and height
var bw = 400;
var bh = 400;
//padding around grid
var p = 10;
//size of canvas
/*
var cw = bw + (p*2) + 1;
var ch = bh + (p*2) + 1;
*/

var column = 40;
var row = 40;

var widthOfCell = bw / column;
var heightOfCell = bh / row;

var arraySize = column * row;

var canvas = $('<canvas/>').attr({width: bw, height: bh}).appendTo('body');

var context = canvas.get(0).getContext("2d");

/*
function drawBoard(){
    for (var x = 0; x <= bw; x += 40) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }


    for (var x = 0; x <= bh; x += 40) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }

    context.strokeStyle = "black";
    context.stroke();
}
*/

var array = [];
var auxArray = [];


function InitGrid(){
	clearInterval(auto);
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
})();

/*
function Play(){
	setInterval(update, 1000);
}
*/
var auto;

function Play(){
	auto = setInterval(update, 1000);
}


function update(){
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
				console.log(i, j, array[row*i+j]);
				context.fillRect(widthOfCell*j, heightOfCell*i, widthOfCell, heightOfCell);	
			}
			else{
				context.fillStyle = 'white';
				context.fillRect(widthOfCell*j, heightOfCell*i, widthOfCell, heightOfCell);
			}
		}
	}
}

