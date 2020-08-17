/**
 *
 * Model Objects
 */
const rleObj = {
  title: "",
  salary: 0,
  department_id: 0,
};

const empObj = {
  first_name: "",
  last_name: "",
  role_id: 0,
  manager_id: null
};

/**
 * set of utility functions
 */
//getting menu position
const getMenuPos = (strMenuVal) => {
  return strMenuVal.split(".")[0];
};

/**
 * getPropName of Role or Employee
 * from prompt answer
 */
const getPropName = (strPromptAns) => {
  return strPromptAns.split("-")[1];
};

const getDeptArray = (arrQuery) => {
  return arrQuery.map((dept) => {
    return `${dept.id}. ${dept.name}`;
  });
};

const getEntityID = (sel) => {
  return sel.split(".")[0];
};

const getRoleArray = (arrQuery) => {
  return arrQuery.map((role) => {
    return `${role.id}. ${role.title}`;
  });
};

const getEmpArray = (arrQuery) => {
  return arrQuery.map((emp) => {
    return `${emp.id}. ${emp.first_name} ${emp.last_name}`;
  });
};

/**
 * Defines Role Object for DB insertion
 * @param {Object} answerObj
 */
const setRoleObj = (answerObj, prmtIndex) => {
  let propValue = answerObj.answer;
  if (answerObj.name === "rle-salary") {
    propValue = Number.parseInt(propValue);
  } else if (answerObj.name === "rle-department_id") {
    propValue = Number.parseInt(getEntityID(propValue));
  }
  rleObj[getPropName(answerObj.name)] = propValue;
  return ++prmtIndex;
};

/**
 * Defines Employe Object for DB insertion
 * @param {Object} answerObj
 */
const setEmpObj = (answerObj, prmtIndex) => {
  let propValue = answerObj.answer;
  if (answerObj.name === "emp-role_id" || answerObj.name === "emp-manager_id") {
    if(getEntityID(propValue) !== "0"){
      propValue = Number.parseInt(getEntityID(propValue));
    }
    else{
      //if zero-> means no manager for this employee
      propValue = null;
    }
  }
  empObj[getPropName(answerObj.name)] = propValue;
  return ++prmtIndex;
};

module.exports = {
  rleObj,
  empObj,
  getMenuPos,
  getPropName,
  setRoleObj,
  setEmpObj,
  getDeptArray,
  getEntityID,
  getRoleArray,
  getEmpArray,
};
