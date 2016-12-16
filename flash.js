var fs = require("fs");
var inquirer = require("inquirer");


var flashcard = {
	create: function(){
			inquirer.prompt([
			{
				type: "input",
				message: "What's your question?",
				name: "question"
			},
			{
				type: "input",
				message: "and what is the answer?",
				name: "answer"
			}
			]).then(function(flash){
					console.log(flash.question + " --- " + flash.answer);
					var newQ = new addQuestion(flash.question, flash.answer);
					newQ.add();
				});
	},
	play: function(x){
		fs.readFile("flashcard.txt", "utf8", function(error, data){
			if(error){
				console.log(error);
			}
			data = data.split("\n");
			if(x >= data.length){
				console.log("**** No more cards. Try adding more! ****");
				return true;
			}
			if(x == 0 || x % 2 == 0) {
				console.log("---\n   ---\n\tQuestion: " + data[x] + "\n   ---\n---");
				inquirer.prompt([
					{
						type: "confirm",
						message:" ~~~ press the <return / enter> key when you're ready for the answer ~~~",
						name:"question"
					}
				]).then(function(){
					x++;
					console.log("***\n   ***\n\tAnswer: " + data[x] + "\n   ***\n***");
					x++;
					flashcard.play(x);
				});
			}
		});
	}
};

function addQuestion(front, back){
	this.front = front;
	this.back = back;
	this.add = function() {
		fs.appendFile("flashcard.txt", "\n" + this.front + "\n" + this.back);
	}
};

module.exports = flashcard;
