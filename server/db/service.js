const connection = require('./connection');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: connection.host,
    user: connection.user,
    password: connection.password,
    port: connection.port,
    database: connection.database
});
conn.connect();

const getAllData = (callback) => {
    conn.query(`SELECT * FROM variables`, (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
}

module.exports = {
    getAllData
}