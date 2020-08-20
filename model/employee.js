/**
 * ------------
 * IMPORTS
 * ------------
 */
//MYSQL
const mysql = require("mysql");
const db_conn = require("../config/config.json")["DB_CONN"];

//---------------
//EMPLOYEE INSERT
//---------------
const emp_insert = (emp_obj) => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "INSERT INTO employee SET ?",
                    emp_obj,
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning number of records affected (new PROMISE)
                        resolve(res.affectedRows);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};

//---------------
//EMPLOYEE SELECT
//---------------
const emp_read_all = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "SELECT * FROM employee",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning number of records affected (new PROMISE)
                        resolve(res);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};

//---------------
//EMPLOYEE SELECT (id and full name only)
//---------------
//---------------
//EMPLOYEE SELECT WITH MANAGER
//---------------
const emp_read_id_name = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "SELECT concat(emp.id, '. ', emp.first_name, ' ', emp.last_name) as employee " +
                    "FROM employee as emp",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning new promise with names and titles of current employees
                        const emp_idnameString = res.map(emp => { return `${emp.employee}` });
                        resolve(emp_idnameString);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};

//---------------
//EMPLOYEE SELECT FOR VIEW
//---------------
const emp_read_all_view = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                  //  select A.name as 'Employee', B.name as 'Manager' from employee as A Inner Join employee as B on A.manager_id = B.id;
                    "SELECT concat(emp.first_name, ' ', emp.last_name) as employee, rle.title, rle.salary, dpt.name as department, " +
                    "concat(mgm.first_name, ' ', mgm.last_name) as manager " +
                    "FROM employee as emp LEFT JOIN employee as mgm on emp.manager_id = mgm.id " +
                    "LEFT JOIN role as rle on emp.role_id = rle.id " +
                    "LEFT JOIN department as dpt on rle.department_id = dpt.id",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning number of records affected (new PROMISE)
                        resolve(res);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};

//---------------
//MANAGER SELECT FOR VIEW
//---------------
const emp_read_all_mgm = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "SELECT DISTINCT concat(mgm.id, '. ', mgm.first_name, ' ', mgm.last_name) as manager " +
                    "FROM employee as emp INNER JOIN employee as mgm on emp.manager_id = mgm.id ",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning new promise with names of Managers
                        const mgmString = res.map(name => { return name.manager });
                        resolve(mgmString);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};


//--------------- 
//SELECT EMPLOYEES BY MANAGER ID
//---------------
const emp_read_all_by_mgmid = (mgm_id) => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //querying for employees by manager
                connection.query(
                    "SELECT concat(emp.first_name, ' ', emp.last_name) as employee, rle.title, rle.salary, dpt.name as department, " +
                    "concat(mgm.first_name, ' ', mgm.last_name) as manager " +
                    "FROM employee as emp LEFT JOIN employee as mgm on emp.manager_id = mgm.id " +
                    "INNER JOIN role as rle on emp.role_id = rle.id " + 
                    "INNER JOIN department as dpt on rle.department_id = dpt.id " + 
                    "WHERE emp.manager_id = '" + mgm_id + "'",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning new promise with results
                        resolve(res);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};

//---------------
//EMPLOYEE SELECT WITH ROLE
//---------------
const emp_read_all_with_role = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "SELECT DISTINCT concat(emp.id, '. ', emp.first_name, ' ', emp.last_name) as employee, rle.title " +
                    "FROM employee as emp INNER JOIN role as rle on emp.role_id = rle.id ",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning new promise with names and titles of current employees
                        const emp_rleString = res.map(emp => { return `${emp.employee} --> ${emp.title} (current role)` });
                        resolve(emp_rleString);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};


//---------------
//EMPLOYEE SELECT WITH MANAGER
//---------------
const emp_read_all_with_manager = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "SELECT concat(emp.id, '. ', emp.first_name, ' ', emp.last_name) as employee, " +
                    "concat(mgm.first_name, ' ', mgm.last_name) as manager " +
                    "FROM employee as emp LEFT JOIN employee as mgm on emp.manager_id = mgm.id ",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning new promise with names and titles of current employees
                        const emp_mgmString = res.map(emp => { return `${emp.employee} --> ${emp.manager} (current manager)` });
                        resolve(emp_mgmString);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};

//---------------
//EMPLOYEE ROLE UPDATE
//---------------
const emp_role_upd = (empRoleUpd) => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "UPDATE employee " +
                    "SET role_id = '" + empRoleUpd.role_id + "'" +
                    "WHERE id = '" + empRoleUpd.id + "'",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        resolve(res.affectedRows);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};


//---------------
//EMPLOYEE MGM UPDATE
//---------------
const emp_manager_upd = (empMgmUpd) => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "UPDATE employee " +
                    "SET manager_id = '" + empMgmUpd.manager_id + "'" +
                    "WHERE id = '" + empMgmUpd.id + "'",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        resolve(res.affectedRows);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};


const emp_delete_by_id = (emp_id) => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Inserting department if connected
                connection.query(
                    "DELETE FROM employee WHERE id = ?",
                    [emp_id],
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning number of records affected (new PROMISE)
                        resolve(res.affectedRows);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};


module.exports = { 
    emp_insert, 
    emp_read_all, 
    emp_read_id_name,
    emp_read_all_view, 
    emp_read_all_mgm,
    emp_read_all_by_mgmid,
    emp_read_all_with_role,
    emp_role_upd,
    emp_read_all_with_manager,
    emp_manager_upd,
    emp_delete_by_id
};
