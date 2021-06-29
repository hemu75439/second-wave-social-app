const mysql = require('mysql')

const pool  = mysql.createPool({
    connectionLimit : 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    charset : process.env.CHARSET
});



module.exports = pool