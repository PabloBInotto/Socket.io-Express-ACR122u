function setup(){
	createCanvas(1000, 20).position(450, 10);
	drawData();
	console.log('Running');
	var button = select('#submit');
	button.mousePressed(submitWord);
}

function drawData(){
loadJSON('/all', gotData);
}

function submitWord(){
		var word = select('#word').value();
		var score = select('#score').value();
		console.log(word, score);
		loadJSON('users/' + word + '/' + score, finished);
		
		function finished(data){
			console.log(data);
			drawData();
		}		
	}

function gotData(data){
	console.log(data);
	background(51);
	var keys = Object.keys(data);
	for (var i = 0; i < keys.length; i++){
		var word = keys[i];
		var score = data[word];
		var x = random(width);
		var y = random(height);
		textSize(7);
		fill(255);
		text(word + ' : ' + score, x, y);
	}
	
	console.log(keys);
}
