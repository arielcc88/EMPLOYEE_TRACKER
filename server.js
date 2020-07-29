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
//prompts
const prompts = require(path.join(
  path.resolve(__dirname, "lib"),
  "prompts.js"
));
const menuRouter = require(path.join(
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
  prompter.next(prompts.menu[0]);
});

//App Logo
console.log(appLogo);

//subscribing initial prompt - main menu
inquirer.prompt(obsQueue).ui.process.subscribe(
  (ans) => {
      //calling menu router
      menuRouter(ans);
      prompter.complete();
  },
  (error) => {
    console.log("--------- Please restart the Application. ---------");
  },
  (complete) => {
    console.log("--------- Exiting Application. Bye! ---------");
  }
);
