/**
 * set of utility functions 
 */
//getting menu position
 const getMenuPos = (strMenuVal) => {
    return strMenuVal.split(".")[0];
 };


 module.exports = { getMenuPos };