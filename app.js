var inquirer = require("inquirer");
var fs = require("fs");
var flashcard = require("./flash.js");
var clozecard = require("./cloze.js");

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
			clozecard.Create();
			break;
			case "Create Flashcard":
			flashcard.Create();
			break;
			case "Play with Flashcards":
			playFlashcard();
			break;
			case "Play with Clozecards":
			playClozecard();
			break;
		}
});



var x = 0;
function playFlashcard(x){
	x = 0;
	fs.readFile("flashcard.txt", "utf8", function(error, data){
		if(error){
			console.log(error);
		}
		data = data.split("\n");
		// for(var i = 0; i < data.length; i++){
		// 	if(i == 0 || i % 2 == 0) {
		// 		console.log(data[i]);
		// 		inquirer.prompt([
		// 			{
		// 				type: "confirm",
		// 				message:" --- press (Y) for answer:",
		// 				name:"question"
		// 			}
		// 		]).then(function(){
		// 			console.log(data[i+1]);
		// 		});
		// 	}
		// };
		console.log(x);

		if(x == 0 || x % 2 == 0) {
			console.log(data[x]);
			inquirer.prompt([
				{
					type: "confirm",
					message:" --- press (Y) for answer:",
					name:"question"
				}
			]).then(function(){
				x+1;
				console.log(data[x]);
				x+1;
				playFlashcard(x);
			});
		}
		
		
	});

};


// function getFlashCards(x, data){
// 	if(x == 0 || x % 2 == 0) {
// 		console.log(data[x]);
// 		inquirer.prompt([
// 			{
// 				type: "confirm",
// 				message:" --- press (Y) for answer:",
// 				name:"question"
// 			}
// 		]).then(function(){
// 			x+1
// 			console.log(data[x]);
// 		});
// 	}
// 	x+1;
// 	getFlashCards(x);
// }


