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
//console.table
const cTable = require('console.table');
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
const mdEmp = require(path.join(
  path.resolve(__dirname, "../model"),
  "employee.js"
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

        case "2":
          //calling for viewing departments, roles or employess
          return prompts.menu.menu_view;
          break;

        default:
          break;
      }
      break;

//===========================
// ADDITION SECTION -- BEGINS
//===========================
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

        case "3":
          //calling functions for adding employee
          return prompts.addPrompts.employee[prmtIndex];
          break;

        default:
          break;
      }
    break;

    //---- Department Addition Prompts ----
    case "dpt_name":
      console.log(
        `${await mdDepartment.dpt_insert(
          ans.answer
        )} Department inserted successfully!\n`
      );
    //returning prompt for main menu
    return prompts.menu.menu_main;
    break;
    
    //---- Role Addition Prompts ----
    case "rle-title":
    case "rle-salary":
    case "rle-department_id":
      //update prompt counter and set Role Obj
      prmtIndex = helpers.setRoleObj(ans, prmtIndex);
      //if salary was asked, departments are populated from DB
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
        //resetting prompt index
        prmtIndex = 0;
        //return to main menu
        return prompts.menu.menu_main;
      }
    return prompts.addPrompts.role[prmtIndex];
    break;

    //---- Employee Addition Prompts ----
    case "emp-first_name":
    case "emp-last_name":
    case "emp-role_id":
    case "emp-manager_id":
      //updating prompt counter and setting Employee Obj
      prmtIndex = helpers.setEmpObj(ans, prmtIndex);
      //if last name entered, get departments from Role Table.
      if(ans.name === "emp-last_name"){
        //querying role table 
        prompts.addPrompts.employee[prompts.addPrompts.employee.length - 2].choices = [
          ...helpers.getRoleArray(await mdRole.rle_read_all()),
        ];
      }
      else if(ans.name === "emp-role_id"){
        //querying employee table 
        prompts.addPrompts.employee[prompts.addPrompts.employee.length - 1].choices = [
          ...helpers.getEmpArray(await mdEmp.emp_read_all()),
        ];
        //pushing -- NO MANAGER -- option
        prompts.addPrompts.employee[prompts.addPrompts.employee.length - 1].choices.push("0. -- NO MANAGER --");
      }
      else if(ans.name === "emp-manager_id"){
        //send new employee to DB
        console.log(
          `${await mdEmp.emp_insert(
            helpers.empObj
          )} New employee added successfully!\n`
        );
        //resetting prompt index
        prmtIndex = 0;
        //return to main menu
        return prompts.menu.menu_main;
      }
    return prompts.addPrompts.employee[prmtIndex];
    break;

//=========================
// ADDITION SECTION -- ENDS
//=========================


//===========================
// VIEWING SECTION -- BEGINS
//===========================
case "menu_view":
      //view dept, role or employee
      switch (helpers.getMenuPos(ans.answer)) {
        case "1":
          //load and display departments using console.table
          console.log(``);
          console.table(await mdDepartment.dpt_read_all());
          console.log(``);
          //return to menu_view
          return prompts.menu.menu_view;
          break;

        case "2":
          //load and display roles using console.table
          console.log(``);
          console.table(await mdRole.rle_read_all_view());
          console.log(``);
          //return to menu_view
          return prompts.menu.menu_view;
          break;

        case "3":
          //load and display roles using console.table
          console.log(``);
          console.table(await mdEmp.emp_read_all_view());
          console.log(``);
          //return to menu_view
          return prompts.menu.menu_view;
          break;

        default:
          break;
      }
    break;



//=========================
// VIEWING SECTION -- ENDS
//=========================

    default:
      return prompts.menu.menu_main;
      break;
  }
};

module.exports = { controllerRouter, getMainMenu };
