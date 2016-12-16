var inquirer = require("inquirer");
var fs = require("fs");
var flashcard = require("./flash.js");
var clozecard = require("./cloze.js");
var x = 0;

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
			clozecard.create();
			break;

			case "Create Flashcard":
			flashcard.create();
			break;

			case "Play with Flashcards":
			flashcard.play(0);
			break;

			case "Play with Clozecards":
			clozecard.play(0);
			break;
		}
});
