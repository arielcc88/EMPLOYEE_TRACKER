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
            console.log("full ans", ans.answer);
            console.log("answer pos", getMenuPos(ans.answer));
            break;
    
        default:
            break;
    }
};

module.exports = menuRouter;