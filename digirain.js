//declare variables
// var symbol;
var symbolSize = 20;
var creditSize = 10;
var streams = [];
var sentences = [];
// var myFont;

var credits = 'excerpts from "Cybernetics and the Pioneers of Computer Art" by Thomas Dreher';
var credits2 = 'code by amilo';


function preload() {
// uncomment below to change text
// poems = loadStrings('mypoetry.txt');
   poems = loadStrings('cybernetics.txt');
// uncomment to change the font
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
	for (var i = 1; i < height / symbolSize; i++) {
		var stream = new Stream();
		stream.generateSymbols(random(-innerWidth, 0), y);
		streams.push(stream);
		y += symbolSize;
	}
	//change this to your font if necessary
	//textFont(myFont);
	textFont('Courier');
	// textSize(symbolSize);
	textSize(symbolSize);
	// below example from the beginning of tutorial
	// symbol = new Symbol(
	// 	0,
	// 	height /2,
	// 	random(1,3)
	// );	
	// symbol.setToRandomSymbol();
}

function draw(){
	background(0,255);
	//draw the credits
	showCredits();
	//draw the streams
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
				// below was an attempt to break the string if too long
				// if (myLine.length >= width/symbolSize) {
				// 	console.log(myLine.substring(round(0,width/symbolSize)));
				// 	this.value = myLine.substring(round(0,width/symbolSize));
				// }else {this.value = myLine;}
			}else{this.value = "Cybernetics and the Pioneers of Computer Art";}
		}

		// example from the tutorial
		// this.value = String.fromCharCode(
		// 	0X30A0 + round(random(0, 96))
		// );
	}

	this.rain = function() {
		// original line as in the tutorial
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
	// commented since we don't want multiple lines on the same line
	// this.totalSymbols = round(random(1,5));
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
			// this below is not actually necessary since we have only one line of text
 			x -= symbolSize*leng;				
		}
	}

	this.render = function() {

		this.symbols.forEach(function(symbol) {
			fill(255, 255, 255,200);
			textSize(symbolSize);
			text(symbol.value, symbol.x, symbol.y);
			symbol.rain();
			symbol.setToRandomSymbol();
		});

	}
}

function showCredits(){
	fill(255,0,200);
	textSize(creditSize);
	text(credits , 10, height-symbolSize);
	text(credits2 , width - credits2.length*creditSize, height-symbolSize);
	
}

function mousePressed() {
	//this will check if the mouse is on the links and if pressed open them in a new tab
	if (mouseY > (height - creditSize*2) && mouseX < (credits.length * creditSize)){
		window.open('http://dreher.netzliteratur.net/4_Medienkunst_Kybernetike.html', "_blank");
	}

	if (mouseY > (height - creditSize*2) && mouseX > (width - credits2.length * creditSize)){
		window.open('https://github.com/amilo/stringRain', "_blank");
	}
}
