/**
 * ------------
 * IMPORTS
 * ------------
 */
//MYSQL
const mysql = require("mysql");
const db_conn = require("../config/config.json")["DB_CONN"];

const rle_insert = (rle_obj) => {
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
                    "INSERT INTO role SET ?",
                    rle_obj,
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

const rle_read_all = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Reading roles if connected
                connection.query(
                    "SELECT * FROM role",
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

const rle_read_all_view = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Reading roles if connected
                connection.query(
                    "SELECT role.title, role.salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id",
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


const rle_read_id_name = () => {
    return new Promise(resolve => {
        //DB Connection
        const connection = mysql.createConnection(db_conn);
        //Initiating connection
        try {
            connection.connect((err) => {
                if (err) throw err;
                //----------------
                //Reading roles if connected
                connection.query(
                    "SELECT concat(role.id, '. ', role.title) AS role, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id",
                    function (err, res) {
                        if (err) throw err;
                        //end connection
                        connection.end();
                        //returning new promise with role and department names
                        const rle_dpt_nameString = res.map(rle => { return `${rle.role} --> (dept.) ${rle.department}` });
                        resolve(rle_dpt_nameString);
                    }
                );
            });
        } catch (error) {
            console.error("DB_ERR! " + error);
        }
    });
};


const rle_delete_by_id = (rle_id) => {
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
                    "DELETE FROM role WHERE id = ?",
                    [rle_id],
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



module.exports = { rle_insert, rle_read_all, rle_read_all_view, rle_read_id_name, rle_delete_by_id };
