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
const prompts = require(path.join(path.resolve(__dirname, "lib"), "prompts.js"));
//app logo
const appLogo = require(path.join(path.resolve(__dirname, "lib"), "appLogo.js"))


console.log(appLogo);