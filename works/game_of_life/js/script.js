//grid width and height
var bw = 400;
var bh = 400;
//size of canvas

var column = 40;
var row = 40;

var widthOfCell = bw / column;
var heightOfCell = bh / row;

// var arraySize = column * row;

// var canvas = $('<canvas/>').attr({width: bw, height: bh}).appendTo('body');

var canvas = $('#canvas');

canvas.attr({width: bw, height: bh});

var context = canvas.get(0).getContext("2d");

var array = [];

function InitGrid(){
	clearInterval(auto);

	widthOfCell = bw / column;
	heightOfCell = bh / row;

	// arraySize = column * row;

	for(var i = 0; i < row; i++){
	    array[i] = [];
	    for(var j = 0; j < column; j++){
		array[i][j] = Math.floor(Math.random() * 2);
	    }
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
    var res = [];
    function neighborCount(x, y){
	var count = 0;
	function isAlive(x, y){
	    return array[x] && array[x][y];
	}
	if(isAlive(x-1, y-1)) count++;
	if(isAlive(x, y-1)) count++;
	if(isAlive(x+1, y-1)) count++;
	if(isAlive(x-1, y)) count++;
	if(isAlive(x+1, y)) count++;
	if(isAlive(x-1, y+1)) count++;
	if(isAlive(x, y+1)) count++;
	if(isAlive(x+1, y+1)) count++;

	return count;
    }

    array.map(function(row, x){
	res[x] = [];
	row.map(function(item, y){
	    var alive = 0, neighbors = neighborCount(x, y);
	    if(item > 0){
		aive = neighbors === 2 || neighbors === 3 ? 1 : 0;
	    } else {
		alive = neighbors === 3 ? 1 : 0;
	    }
	    res[x][y] = alive;
	})
    });

    array = res;

    drawGrid();
}

function drawGrid(){
    context.clearRect(0, 0, 400, 400);
    for(var i = 0; i < row; i++){
	    for(var j = 0;j < column; j++){
		    if(array[i][j]){
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

