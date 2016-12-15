var fs = require("fs");
var inquirer = require("inquirer");

module.exports = {
	Create: function(){
		inquirer.prompt([
			{
				type: "input",
				message: "What's your statement",
				name: "question"
			}
			]).then(function(response){
				var questionArray = response.question.split(" ");
				inquirer.prompt([	
					{
						type: "checkbox",
						message: "and what words do you want to guess?...(use spacebar and arrows to make selection)",
						choices: questionArray,
						name: "cloze"
					}
				]).then(function(answer){
					var string = answer.cloze.join(" ");
					var fulltext = response.question;
					var truncatedText = fulltext.replace(string, "...");

					var newQ = new addCloze(truncatedText, string);
					newQ.addText();
				});
			});
	}
};

function addCloze(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.addText = function(){
		fs.appendFile("clozecard.txt", "\n<span class='statement'>" + this.text + "</span>\n<span class='subject'>" + this.cloze + "</span>");
	}

};