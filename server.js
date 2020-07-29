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
const menuController = require(path.join(
  path.resolve(__dirname, "controller"),
  "menu.js"
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
  prompter.next(menuController.getMainMenu());
});

//App Logo
console.log(appLogo);

//subscribing initial prompt - main menu
inquirer.prompt(obsQueue).ui.process.subscribe(
  (ans) => {
      console.log("full ans obj", ans);
    //checking for exit request
    switch (ans.answer.split(".")[1].trim()) {
      case "Exit":
        //exiting the application
        prompter.complete();
        break;

      case "Back to Main Menu":
        prompter.next(menuController.getMainMenu());
        break;

      default:
        //calling menu router
        prompter.next(menuController.menuRouter(ans));
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
