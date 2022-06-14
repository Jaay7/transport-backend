const mysql = require('mysql2');
require('dotenv').config();

// const connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

const connection = mysql.createConnection(process.env.MYSQL_DATABASE_URL);

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to database');
  }
});

module.exports = connection;