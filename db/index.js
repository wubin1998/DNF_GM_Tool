const config = require('./config')
const mysql = require("mysql");

let connection = mysql.createConnection(config)

connection.connect((err) => {
  if (err) throw new Error("数据库连接失败，检查数据库配置")
  
})

module.exports = connection;