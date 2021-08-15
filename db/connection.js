const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Shenendoah1234',
    database: 'employeetracker'
  },
  console.log('Connected to the employeetracker database.')
  );

  module.exports = connection;