//Classic Videogame Theme

//Game Object
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

	//Get Question info
	this.getQ = function () {
		return this.qSet[this.currentQ-1][0];	
	}

	this.getAns = function () {
		return this.qSet[this.currentQ-1][1];	
	}
}
