const mysql = require("node-mysql-helper");
require("dotenv").config();

const mysqlOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

mysql.connect(mysqlOptions);

module.exports = mysql;
