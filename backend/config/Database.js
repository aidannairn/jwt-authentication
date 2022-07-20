const mysql = require('mysql2')
const dotenv = require('dotenv')

dotenv.config()

const config = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
}

const connection = mysql.createPool(config)

module.exports = { connection }