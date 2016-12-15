var fs = require("fs");
var inquirer = require("inquirer");

module.exports = {
	Create: function(){
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
};


function addQuestion(front, back){
	this.front = front;
	this.back = back;
	this.add = function() {
		fs.appendFile("flashcard.txt", "\n<span class='question'>" + this.front + "</span>\n<span class='answer'>" + this.back + "</span>");
		// console.log('got added');
	}
};