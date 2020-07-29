/**
 * ------------
 * IMPORTS
 * ------------
 */
//MYSQL
const mysql = require("mysql");
const db_conn = require("../config/config.json")["DB_CONN"];

//DB Connection
const connection = mysql.createConnection(db_conn);
//Initiating connection
try {
    connection.connect( (err) => { if (err) throw err; } );   
} catch (error) {
    console.error("DB_ERR! " + error);
}

const dpt_insert = (dpt_name) => {
    //----------------
    //Inserting department if connected
    connection.query(
        "INSERT INTO department SET ?",
        {
            name: dpt_name,
        },
        (err, res) => {
            if (err) throw err;
            console.log(res.affectedRows + " department inserted!\n");
            connection.end();
        }
    );
}

module.exports = dpt_insert;