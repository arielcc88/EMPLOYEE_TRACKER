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
//models
const mdDepartment = require(path.join(
    path.resolve(__dirname, "../model"),
    "department.js"
));
//utility functions
const { getMenuPos } = require(path.join(
    path.resolve(__dirname, "../lib"),
    "util.js"
));

const controllerRouter = async (ans) => {
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
        
        case "menu_add":
            //add dept, role or employee
            switch (getMenuPos(ans.answer)) {
                case "1":
                    //calling for adding a department prompts
                    return prompts.addPrompts.dpt;
                    break;
                
                case "2":
                    //calling for adding a department prompts
                    return prompts.addPrompts.role;
                    break;
            
                default:
                    break;
            }
            break;

        //Department Prompts
        case "dpt_name":
            console.log(`${await mdDepartment(ans.answer)} Department inserted successfully!\n`);
            //returning prompt for main menu
            return prompts.menu.menu_main;
            break;
        
        default:
            return prompts.menu.menu_main;
            break;
    }
};

const getMainMenu = () => {
    return prompts.menu.menu_main
}

module.exports = {controllerRouter, getMainMenu};