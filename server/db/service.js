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

const KEY = ['CHANGE_WIN', 'CHANGE_LOSE', 'UNCHANGE_WIN', 'UNCHANGE_LOSE'];

const getAllData = (callback) => {
    conn.query(`SELECT * FROM variables`, (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
}

const updateChangeWin = () => {
    conn.query(`UPDATE variables SET val = val + 1 WHERE name='${KEY[0]}'`);
}

const updateChangeLose = () => {
    conn.query(`UPDATE variables SET val = val + 1 WHERE name='${KEY[1]}'`);
}

const updateUnChangeWin = () => {
    conn.query(`UPDATE variables SET val = val + 1 WHERE name='${KEY[2]}'`);
}

const updateUnChangeLose = () => {
    conn.query(`UPDATE variables SET val = val + 1 WHERE name='${KEY[3]}'`);
}

module.exports = {
    getAllData,
    updateChangeWin,
    updateChangeLose,
    updateUnChangeWin,
    updateUnChangeLose
}