//Classic Videogame Theme

//------------Game Object------------------------
function Game() {
	//Store Questions
	this.qSet = [
	//[Question, Options, Answer] TODO: include gif?
	["What was the first console video game that allowed the game to be saved?",["Super Star Wars","The Legend of Zelda","Mortal Kombat","Virtua Racing"],1],
	["The first person shooter video game Doom was first released in what year?",["1991","1992","1993","1994"],2],
	["What is the name of Sonic the Hedgehog's sidekick?",["Blaze","Knuckles","Shadow","Tails"],3],
	["Which of these is not a faction in the game Halo:Combat Evolved?",["Protoss","UNSC","Flood","Covenant"],0],
	["Which game sold so poorly that 74,000 unsold copies were buried in the New Mexico desert?",["Scarface: The World is Yours","ET: The Extra-Terrestrial","Cory in the House","Barbie's Magical Adventures"],1],
];

	//Game is active
	this.playing = true;

	//Track current question; Start at 1
	this.currentQ = 1;

	//Answer counter
	this.numCorrect = 0;
	this.numWrong = 0;

	//Round of questioning
	this.submit = function(ans) {
		if (this.playing) {
			var correct;
			if (this.qSet[this.currentQ-1][2]==ans) {
				this.numCorrect++;
				correct = true;
			}
			else {
				this.numWrong++;
				correct = false;
			}
			//test if all questions answered -> Game Over
			this.currentQ++;
			if (this.currentQ>this.qSet.length) {
				this.playing = false;
			}
			return correct; 
		}
		else {return null};
	}
	//Question timeout
	this.timeOut = function() {
		this.numWrong++;
		this.currentQ++;
		if (this.currentQ>this.qSet.length) {
			this.playing = false;
		}
		return false;

	}

	//Get Question info
	this.getQ = function () {
		if (this.playing) {
			return this.qSet[this.currentQ-1][0];	
		}
		else {return null}
	}

	this.getAns = function () {
		if (this.playing) {
			return this.qSet[this.currentQ-1][1];	
		}
		else {return null}
	}
}

//---------main----------
var obj = new Game();
var result;	//result of each question answer
var aTimer, qTimer;
var gs = '#game-screen'; //helper var to manipulate game window

$(document).ready( function () {
	startScreen();
	//Add click listener to start button
});

//------function declarations-----------

function startScreen() {
	$(gs).empty().append('<button id="start-game">Start Game!</button>');
	$('#start-game').click(drawQuestion);
}

function drawQuestion() {
	//Clear screen
	$(gs).empty()
	//Add question
	$(gs).append('<div id="question"></div>');
	$('#question').text(obj.getQ());
	//Add possible answers
	for (var i=65;i<69;i++) {
		/*$(gs).append('<div index="'+(i-65)+'">'+String.fromCharCode(i)+': '+obj.getAns()[i-65]+'</div>');*/
		$(gs).append($('<div></div>)').text(String.fromCharCode(i)+": "+obj.getAns()[i-65]).attr('index',i-65));
	}
	//Add listener events to answers
	$("[index]").each(function() {
		$(this).on('click',function() {
			result = obj.submit(Number($(this).attr('index')));
			clearTimeout(qTimer);
			drawAnswer(result);	
		});
	});
	//timer
	var time = 10;
	$(gs).append('<hr/><div id="timer">'+time+'</div>');
	qTimer = setInterval(function() {
		time--;
		$('#timer').text(time);
		if (time==0) {
			clearInterval(qTimer);
			drawAnswer(obj.timeOut());
		}
	},1000);
}

function drawAnswer(result) {
	$(gs).empty();
	if (result)	{
		$(gs).append("<div>You are correct!</div>");
	}
	else {
		$(gs).append("<div>WRONG!</div>");
	}
	//timer
	aTimer = setTimeout(function() {obj.playing?drawQuestion():drawFinish();},1000);
}

function drawFinish() {
	$(gs).empty();
	$(gs).append('<div>Questions correct: '+obj.numCorrect+'</div>');
	$(gs).append('<div>Questions wrong: '+obj.numWrong+'</div>');
	$(gs).append('<div>Play Again?<button id="start-game">Start Game!</button></div>');
	$('#start-game').click(function() {
		obj = new Game();
		drawQuestion();
	})
}
