/**
 * Handles routing between menu options dynamically
 * depending on user answers
 */

 /**
 * ------------
 * IMPORTS
 * ------------
 */
//path
const path = require("path");
//prompts
const prompts = require(path.join(
    path.resolve(__dirname, "../lib"),
    "prompts.js"
));
//utility functions
const { getMenuPos } = require(path.join(
    path.resolve(__dirname, "../lib"),
    "util.js"
));

const menuRouter = (ans) => {
    //1. check type of answer and value
    switch (ans.name) {
        case "menu_main":
            //main menu options
            //2nd switch to check for question position (ordered list of questions defined in prompts.js)
            switch (getMenuPos(ans.answer)) {
                case "1":
                    //calling for adding a department, role or employee
                    //need to print out Addition menu
                    return prompts.menu.menu_add;
                    break;
            
                default:
                    break;
            }
            break;
        
        default:
            return prompts.menu.menu_main;
            break;
    }
};

const getMainMenu = () => {
    return prompts.menu.menu_main
}

module.exports = {menuRouter, getMainMenu};