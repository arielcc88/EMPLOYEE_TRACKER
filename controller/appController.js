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

        //===============
        //employee by Manager Menu
        //===============
        case "3":
          //call function to populate Manager list
          prompts.menu.menu_view_mgm.choices = [
            ...await mdEmp.emp_read_all_mgm(),
          ];
          return prompts.menu.menu_view_mgm;
          break;

        //===============
        //update employee role
        //===============
        case "4":
          //call function to populate Employee list -- update employee role
          prompts.menu.menu_upd_emp_rle[prmtIndex].choices = [
            ...await mdEmp.emp_read_all_with_role(),
          ];
          return prompts.menu.menu_upd_emp_rle[prmtIndex];
          break;

        //===============
        //update employee manager
        //===============
        case "5":
          //call function to populate Employee list -- update employee role
          prompts.menu.menu_upd_emp_mgm[prmtIndex].choices = [
            ...await mdEmp.emp_read_all_with_manager(),
          ];
          return prompts.menu.menu_upd_emp_mgm[prmtIndex];
          break;


        //===============
        //delete dept. role and employee
        //===============
        case "6":
          //call submenu to select either dept, role or emp
          return prompts.menu.menu_delete;
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

    //view Employees by Manager processing
    case "menu_view_mgm":
        //1. get manager (employee) id from user selection
        const mgmID = helpers.getMenuPos(ans.answer);
        //2. pass manager ID to employee model to select all his employees
        console.log(``);
        console.table(await mdEmp.emp_read_all_by_mgmid(mgmID));
        console.log(``);
        return prompts.menu.menu_main;
    break;
//=========================
// VIEWING SECTION -- ENDS
//=========================

//=========================
// UPDATING SECTION -- BEGINS
//=========================
    //Updating employee's role
    case "empupd-id":
    case "empupd-role_id":
      //1. get employee id or role id from user selection
      ans.answer = helpers.getMenuPos(ans.answer);
      //2. pass ID to utils to store it. (updating prompt counter as well)
      prmtIndex = helpers.setEmpRoleUpd(ans, prmtIndex);
      if(ans.name === "empupd-id"){
        //querying role table 
        prompts.menu.menu_upd_emp_rle[prmtIndex].choices = [
          ...helpers.getRoleArray(await mdRole.rle_read_all()),
        ];
      }
      else if (ans.name === "empupd-role_id"){
        //updating employee's role and returning to main menu
        console.log(
          `${await mdEmp.emp_role_upd(
            helpers.empRoleUpd
          )} Employee Role Updated successfully!\n`
        );
        //resetting prompt index
        prmtIndex = 0;
        //return to main menu
        return prompts.menu.menu_main;
      }

      return prompts.menu.menu_upd_emp_rle[prmtIndex];
    break;

    //Updating Employee's Manager
    case "empupdmgm-id":
    case "empupdmgm-manager_id":
      //1. get employee id or role id from user selection
      ans.answer = helpers.getMenuPos(ans.answer);
      //2. pass ID to utils to store it. (updating prompt counter as well)
      prmtIndex = helpers.setEmpMgmUpd(ans, prmtIndex);
      if(ans.name === "empupdmgm-id"){
        //querying role table 
        prompts.menu.menu_upd_emp_mgm[prmtIndex].choices = [
          ...await mdEmp.emp_read_id_name(),
        ];
      }
      else if (ans.name === "empupdmgm-manager_id"){
        //updating employee's role and returning to main menu
        console.log(
          `${await mdEmp.emp_manager_upd(
            helpers.empMgmUpd
          )} Employee Manager Updated successfully!\n`
        );
        //resetting prompt index
        prmtIndex = 0;
        //return to main menu
        return prompts.menu.menu_main;
      }

      return prompts.menu.menu_upd_emp_mgm[prmtIndex];
    break;
//=========================
// UPDATING SECTION -- ENDS
//=========================

//=========================
// DELETING SECTION -- BEGINS
//=========================
      case "menu_delete":
        //add dept, role or employee
        switch (helpers.getMenuPos(ans.answer)) {
          case "1":
            //getting existing depts and list them out
            prompts.deletePrompts.dpt.choices = [
              ...await mdDepartment.dpt_read_id_name(),
            ];
            //return prompt with list of departments
            return prompts.deletePrompts.dpt;
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

      case "dptdel-id":
        //1. get dept id from user selection
        ans.answer = helpers.getMenuPos(ans.answer);
        //2. pass dept id to Department model deletion function
        console.log(`${await mdDepartment.dpt_delete_by_id(ans.answer)} Department removed successfully!\n`);
        return prompts.menu.menu_main;
        break;


//=========================
// DELETING SECTION -- ENDS
//=========================

    default:
      return prompts.menu.menu_main;
      break;
  }
};

module.exports = { controllerRouter, getMainMenu };
