const session = require('express-session') 

const MySQLStore = require('express-mysql-session')(session);

var options = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
};

var sessionStore = new MySQLStore(options);


module.exports = {session, sessionStore}
