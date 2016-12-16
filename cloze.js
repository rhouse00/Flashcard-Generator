var fs = require("fs");
var inquirer = require("inquirer");

var clozecard = {
	create: function(){
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
	},
	play: function(x){
		fs.readFile("clozecard.txt", "utf8", function(error, data){
			if(error){
				console.log(error);
			}
			data = data.split("\n");
			if(x >= data.length){
				console.log("**** No more cards. Try adding more! ****");
				return true;
			}
			if(x == 0 || x % 2 == 0) {
				console.log("---\n   ---\n\tStatement: " + data[x] + "\n   ---\n---");
				inquirer.prompt([
					{
						type: "confirm",
						message:" ~~~ press the <return / enter> key when you're ready for the answer ~~~",
						name:"question"
					}
				]).then(function(){
					var truncatedText = data[x];
					x++;
					var fulltext = truncatedText.replace("...", data[x]);
					console.log("***\n   ***\n\tAnswer: " + fulltext + "\n   ***\n***");
					x++;
					clozecard.play(x);
				});
			}
		});
	}
};

function addCloze(text, cloze){
	this.text = text;
	this.cloze = cloze;
	this.addText = function(){
		fs.appendFile("clozecard.txt", "\n" + this.text + "\n" + this.cloze);
	}
};

module.exports = clozecard;