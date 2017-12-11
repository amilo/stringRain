//load the charset


//declare variables
// var symbol;
var symbolSize = 20;
var streams = [];
var sentences = [];
// var myFont;

function preload() {
  // poems = loadStrings('mypoetry.txt');
  // poems = loadStrings('w3.txt');
   poems = loadStrings('cybernetics.txt');

  // myFont = loadFont("Chunk.otf");
}

function setup(){
	createCanvas(
		window.innerWidth,
		window.innerHeight
	);
	background(0);
	var y = symbolSize;
	for (var i = 0; i < poems.length; i++) {
		var newSentences = [];
		newSentences = poems[i].split(". ");
		for (var j = 0; j < newSentences.length; j++) {
		sentences.push(newSentences[j]);
		}
	}
	
	// console.log(sentences);


	for (var i = 1; i < height / symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(random(-innerWidth, 0), y);
		streams.push(stream);
		y += symbolSize;
	}
	textFont('Courier');
	textSize(symbolSize);
	// symbol = new Symbol(
	// 	0,
	// 	height /2,
	// 	random(1,3)
	// );	
	// symbol.setToRandomSymbol();
}


function draw(){
	background(0,255);
	streams.forEach(function(stream) {
		stream.render();
	});
	
	
}

function Symbol(x, y, speed){

	this.x = x;
	this.y = y;
	this.value;
	this.speed = speed;
	this.switchInterval = round(random(40, 80));
	this.setToRandomSymbol = function() {

		if (frameCount % this.switchInterval == 0) {
			var myLine = sentences[round(random(0,sentences.length))];
			if (myLine){
				this.value = myLine;
				// if (myLine.length >= width/symbolSize) {
				// 	// console.log(myLine.substring(round(0,width/symbolSize)));
				// 	this.value = myLine.substring(round(0,width/symbolSize));
				// }else {this.value = myLine;}
			}else{this.value = "Cybernetics and the Pioneers of Computer Art";}
		}


		// this.value = String.fromCharCode(
		// 	0X30A0 + round(random(0, 96))
		// );

		// var words = poems.split(" ");
		// console.log(poems[random(0,10)]);
		// var lines_index = random(0,poems.length);
		// console.log(poems[lines_index]);

	}


	this.rain = function() {
		// if (this.x >= width) {
		// 	this.x =0;
		// } else {
		// this.x += this.speed;
		// }
		this.x = (this.x >= width) ? 0 : this.x += this.speed;
	}
}

function Stream() {
	this.symbols = [];
	// this.totalSymbols = round(random(1,2));
	this.totalSymbols = 1;
	this.speed = random(1,3);

	this.generateSymbols = function(x, y) {
		for (var i = 0; i< this.totalSymbols; i++){
			symbol = new Symbol(x,y, this.speed);
			symbol.setToRandomSymbol();
			this.symbols.push(symbol);
			var myString = symbol.value;
			var leng = myString.length;
			// console.log(leng);
			x -= symbolSize*leng;
			glow = false;
			
		}
	}

	this.render = function() {

		this.symbols.forEach(function(symbol) {
			fill(255, 255, 255,200);
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});

	}
}

