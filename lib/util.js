/**
 *
 * Model Objects
 */
const rleObj = {
  title: "",
  salary: 0,
  department_id: 0,
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

/**
 * Defines Role Object for DB insertion
 * @param {Object} answerObj
 */
const setRoleObj = (answerObj, prmtIndex) => {
  let propValue = answerObj.answer;
  if (answerObj.name === "rle-salary") {
    propValue = Number.parseInt(propValue);
  } else if (answerObj.name === "rle-department_id") {
    propValue = Number.parseInt(getDeptIDForRole(propValue));
  }
  rleObj[getPropName(answerObj.name)] = propValue;
  console.log("the role object so far", rleObj);
  return ++prmtIndex;
};

const getDeptArray = (arrQuery) => {
  return arrQuery.map((dept) => {
    return `${dept.id}. ${dept.name}`;
  });
};

const getDeptIDForRole = (dptVal) => {
  return dptVal.split(".")[0];
};

module.exports = {
  rleObj,
  getMenuPos,
  getPropName,
  setRoleObj,
  getDeptArray,
  getDeptIDForRole,
};
