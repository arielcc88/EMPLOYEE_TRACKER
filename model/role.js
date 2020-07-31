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




module.exports = { rle_insert };
