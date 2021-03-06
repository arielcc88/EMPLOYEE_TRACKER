/**
 * ------------
 * IMPORTS
 * ------------
 */
//inquirer
const inquirer = require("inquirer");
//requiring rxjs for dynamic addition of questions
const { Observable } = require("rxjs");
//path
const path = require("path");
const appController = require(path.join(
  path.resolve(__dirname, "controller"),
  "appController.js"
));
//app logo
const appLogo = require(path.join(
  path.resolve(__dirname, "lib"),
  "appLogo.js"
));

/**
 * ------------
 * VAR DECLARATION
 * ------------
 */
//to be used as an observer to subscribe user prompts
let prompter;

/**
 * ------------
 * APP MAIN LOGIC
 * ------------
 */
//promps startup
const obsQueue = Observable.create(function (e) {
  //using RxJS observables to dynamically issue prompts
  prompter = e;
  //sending main menu
  prompter.next(appController.getMainMenu());
});

//App Logo
console.log(appLogo);

//subscribing initial prompt - main menu
inquirer.prompt(obsQueue).ui.process.subscribe(
  (ans) => {
    //checking for exit request
    let caseAns = ans.answer.includes(".") ? ans.answer.split(".")[1].trim() : ans.answer;
    switch ( caseAns ) {
      case "Exit":
        //exiting the application
        prompter.complete();
        break;

      case "Back to Main Menu":
        prompter.next(appController.getMainMenu());
        break;

      default:
        //calling menu router
        appController.controllerRouter(ans).then(prompt => prompter.next(prompt));
        break;
    }
  },
  (error) => {
    console.log("--------- Please restart the Application. ---------");
  },
  (complete) => {
    console.log("--------- Exiting Application. Bye! ---------");
  }
);
