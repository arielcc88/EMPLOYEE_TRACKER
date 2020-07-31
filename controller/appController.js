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
const mdRole = require(path.join(
  path.resolve(__dirname, "../model"),
  "role.js"
));
//app resources - helpers
const helpers = require(path.join(
  path.resolve(__dirname, "../lib"),
  "util.js"
));

const getMainMenu = () => {
  return prompts.menu.menu_main;
};

//prompt index counter
let prmtIndex = 0;

const controllerRouter = async (ans) => {
  //1. check type of answer and value
  switch (ans.name) {
    case "menu_main":
      //main menu options
      //2nd switch to check for question position (ordered list of questions defined in prompts.js)
      switch (helpers.getMenuPos(ans.answer)) {
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
      switch (helpers.getMenuPos(ans.answer)) {
        case "1":
          //calling for adding a department prompts
          return prompts.addPrompts.dpt;
          break;

        case "2":
          //calling for adding a role prompts
          //starting with first prompt
          return prompts.addPrompts.role[prmtIndex];
          break;

        default:
          break;
      }
      break;

    //Department Prompts
    case "dpt_name":
      console.log(
        `${await mdDepartment.dpt_insert(
          ans.answer
        )} Department inserted successfully!\n`
      );
      //returning prompt for main menu
      return prompts.menu.menu_main;
      break;

    case "rle-title":
    case "rle-salary":
    case "rle-department_id":
      //update prompt counter and set Role Obj
      prmtIndex = helpers.setRoleObj(ans, prmtIndex);
      //if salary was asked, departnments are populated from DB
      if (ans.name === "rle-salary") {
        //populate department choices
        prompts.addPrompts.role[prompts.addPrompts.role.length - 1].choices = [
          ...helpers.getDeptArray(await mdDepartment.dpt_read_all()),
        ];
      } else if (ans.name === "rle-department_id") {
        //save the role to DB
        console.log(
          `${await mdRole.rle_insert(
            helpers.rleObj
          )} New Role inserted successfully!\n`
        );
        //return to main menu
        return prompts.menu.menu_main;
      }
      return prompts.addPrompts.role[prmtIndex];
      break;

    default:
      return prompts.menu.menu_main;
      break;
  }
};

module.exports = { controllerRouter, getMainMenu };
