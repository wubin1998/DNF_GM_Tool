const config = require('./config')
const mysql = require("mysql");

let connection = mysql.createConnection(config)

connection.connect()

module.exports = connection;