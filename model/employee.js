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
//EMPLOYEE INSERT
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


module.exports = { emp_insert, emp_read_all };
