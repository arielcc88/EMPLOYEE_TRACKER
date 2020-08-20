/**
 * Menu Prompts
 */
const menu = {
    menu_main:
    {
      type: "list",
      name: "menu_main",
      message: "Main Menu. Select an option:",
      choices: [
        "1. Add Department, Role or Employee", 
        "2. View Department, Role or Employee", 
        "3. View Employees by Manager",
        "4. Update Employee Roles",
        "5. Update Employee Manager",
        "6. Delete Department, Role or Employee Information",
        "7. Exit",
      ],
      default: "1. Add Department, Role or Employee",
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },

    menu_add:
    {
      type: "list",
      name: "menu_add",
      message: "Which on would you like to add?",
      choices: [
        "1. Department", 
        "2. Role", 
        "3. Employee",
        "4. Back to Main Menu",
      ],
      default: "3. Employee",
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },

    menu_view:
    {
      type: "list",
      name: "menu_view",
      message: "Select an option for viewing:",
      choices: [
        "1. Departments", 
        "2. Roles", 
        "3. Employees",
        "4. Back to Main Menu",
      ],
      default: "1. Departments",
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },

    menu_view_mgm:
    {
      type: "list",
      name: "menu_view_mgm",
      message: "Select a Manager from the list below:",
      choices: [],
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },

    menu_upd_emp_rle:
    [{
      type: "list",
      name: "empupd-id",
      message: "Select a Employee from the list below:",
      choices: [],
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "empupd-role_id",
      message: "Select new Role:",
      choices: [],
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    }],

    menu_upd_emp_mgm:
    [{
      type: "list",
      name: "empupdmgm-id",
      message: "Select a Employee from the list below:",
      choices: [],
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "empupdmgm-manager_id",
      message: "Select new Manager:",
      choices: [],
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    }],

    menu_delete:
    {
      type: "list",
      name: "menu_delete",
      message: "Select an option for deletion:",
      choices: [
        "1. Departments", 
        "2. Roles", 
        "3. Employees",
        "4. Back to Main Menu",
      ],
      default: "1. Departments",
      validate: function (usrInput) {
        if (!usrInput) {
          return "Not a valid option. Please select one of the options available.";
        }
        return true;
      },
    },
  };

/**
 * Questions for Addition
 */
const addPrompts = {
  dpt: 
    {
      type: "input",
      name: "dpt_name",
      message: "Enter Department's Name:",
      validate: function (usrInput) {
        //validating name with regex
        const regName = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 ]*)$/;
        if (!regName.test(usrInput)) {
          return "Please verify the Department Name.";
        }
        return true;
      },
    },
  role: 
    [
      {
        type: "input",
        name: "rle-title",
        message: "Enter New Title:",
        validate: function (usrInput) {
          //validating name with regex
          const regName = /^(?:[A-Za-z]+)(?:[A-Za-z0-9 ]*)$/;
          if (!regName.test(usrInput)) {
            return "Please verify the Title.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "rle-salary",
        message: "Enter Salary for this Title:",
        validate: function (usrInput) {
          //validating name with regex
          const regName = /^[0-9]*$/;
          if (!regName.test(usrInput)) {
            return "Please verify the Salary entered. Only numbers are accepted.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "rle-department_id",
        message: "Enter corresponding Department for this Role:",
        choices: [],
        validate: function (usrInput) {
          if (!usrInput) {
            return "Not a valid option. Please select one of the options available.";
          }
          return true;
        },
      }
    ],
    employee: 
    [
      {
        type: "input",
        name: "emp-first_name",
        message: "Enter Employee's First Name:",
        validate: function (usrInput) {
          //validating name with regex
          const regName = /^[a-z ,.'-]+$/i;
          if (!regName.test(usrInput)) {
            return "Please verify First Name. Numbers and Unicode characters are not allowed.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "emp-last_name",
        message: "Enter Employee's Last Name:",
        validate: function (usrInput) {
          //validating name with regex
          const regName = /^[a-z ,.'-]+$/i;
          if (!regName.test(usrInput)) {
            return "Please verify Last Name. Numbers and Unicode characters are not allowed.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "emp-role_id",
        message: "Enter Emplyee's Role:",
        choices: [],
        validate: function (usrInput) {
          if (!usrInput) {
            return "Not a valid option. Please select one of the options available.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "emp-manager_id",
        message: "Enter Emplyee's Role:",
        choices: ["0. No Manager"],
        validate: function (usrInput) {
          if (!usrInput) {
            return "Not a valid option. Please select one of the options available.";
          }
          return true;
        },
      }
    ]
  };


  //deletion prompts
  const deletePrompts = {
    dpt:
      {
        type: "list",
        name: "dptdel-id",
        message: "Select Department to be removed:",
        choices: [],
        validate: function (usrInput) {
          if (!usrInput) {
            return "Not a valid option. Please select one of the options available.";
          }
          return true;
        }
      },

      rle:
      {
        type: "list",
        name: "rledel-id",
        message: "Select Role to be removed:",
        choices: [],
        validate: function (usrInput) {
          if (!usrInput) {
            return "Not a valid option. Please select one of the options available.";
          }
          return true;
        }
      },

      emp:
      {
        type: "list",
        name: "empdel-id",
        message: "Select Employee to be removed:",
        choices: [],
        validate: function (usrInput) {
          if (!usrInput) {
            return "Not a valid option. Please select one of the options available.";
          }
          return true;
        }
      }
  };

module.exports = { menu, addPrompts, deletePrompts };
