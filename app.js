var inquirer = require("inquirer");

inquirer.prompt([
	{
		type: 'list',
		message: "what do you want to do?",
		choices: ["Create Flashcard", "Create Clozecard", "Play with Flashcards", "Play with Clozecards"],
		name: "action"
	}
	]).then(function(response){
		switch (response.action) {
			case "Create Clozecard":
			createClozecard();
			break;
			case "Create Flashcard":
			createFlashcard();
			break;
			case "Play with Flashcards":
			//function name
			break;
			case "Play with Clozecards":
			//function name
			break;
		}
});



function createClozecard(){
	inquirer.prompt([
		{
			type: "input",
			message: "What's your statement",
			name: "question"
		}
		]).then(function(response){
			var questionArray = response.question.split(" ");
			console.log(questionArray);
			inquirer.prompt([	
				{
					type: "checkbox",
					message: "and what words do you want to guess?",
					choices: questionArray,
					name: "cloze"
				}
			]).then(function(answer){
				console.log(answer.cloze);
			});
		});
};


function createFlashcard (){
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
		});
};



