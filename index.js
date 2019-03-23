const mysql = require('mysql')

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  charset: 'utf8'
})

connection.connect(err => {
  if (err) {
    console.error('Error while connecting to MySQL: ' + err.stack)
    return
  }
  console.log('Connection to DB established')
})